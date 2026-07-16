import { randomBytes } from "node:crypto";
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Required deployment value ${name} is missing.`);
  }
  return value;
}

function setting(name, fallback, maximumLength = 160) {
  const value = process.env[name]?.trim() || fallback;
  if (value.length > maximumLength || /[\r\n]/.test(value)) {
    throw new Error(`Deployment value ${name} is invalid.`);
  }
  return value;
}

function emailSetting(name, fallback) {
  const value = setting(name, fallback, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error(`Deployment value ${name} must be an email address.`);
  }
  return value;
}

const maintenanceValue = (process.env.SITE_IN_PROGRESS || "true").toLowerCase();
if (!new Set(["true", "false"]).has(maintenanceValue)) {
  throw new Error("SITE_IN_PROGRESS must be either true or false.");
}

const formEnabledValue = (
  process.env.CONTACT_FORM_ENABLED?.trim() ||
  (maintenanceValue === "false" ? "true" : "false")
).toLowerCase();
if (!new Set(["true", "false"]).has(formEnabledValue)) {
  throw new Error("CONTACT_FORM_ENABLED must be either true or false.");
}

const formEmail = emailSetting(
  "SMTP_FORM_USERNAME",
  "formular@elena-roehrborn.de",
);
const infoEmail = emailSetting(
  "SMTP_INFO_USERNAME",
  "info@elena-roehrborn.de",
);

const config = {
  enabled: formEnabledValue === "true",
  allowedOrigins: [
    "https://elena-roehrborn.de",
    "https://www.elena-roehrborn.de",
  ],
  senderName: setting(
    "CONTACT_SENDER_NAME",
    "Elena Roehrborn Onlinetherapie",
  ),
  recipientName: setting("CONTACT_RECIPIENT_NAME", "Elena Roehrborn"),
  replyWithin: setting(
    "CONTACT_REPLY_WITHIN",
    "innerhalb von zwei Werktagen",
  ),
  siteUrl: "https://elena-roehrborn.de",
  siteLabel: "elena-roehrborn.de",
  practiceAddress: "Wilmersdorfer Straße 95, 10629 Berlin",
  smtp: {
    host: process.env.SMTP_HOST?.trim() || "w021d308.kasserver.com",
    port: 465,
    form: {
      username: formEmail,
      password: required("SMTP_FORM_PASSWORD"),
    },
    info: {
      username: infoEmail,
      password: required("SMTP_INFO_PASSWORD"),
    },
  },
  rateLimit: {
    secret: randomBytes(32).toString("hex"),
    maximumAttempts: 5,
    windowSeconds: 15 * 60,
  },
};

const encoded = Buffer.from(JSON.stringify(config), "utf8").toString("base64");
const outputPath = resolve(".deploy/contact-config.php");
const contents = `<?php

declare(strict_types=1);

return json_decode(
    base64_decode('${encoded}', true),
    true,
    512,
    JSON_THROW_ON_ERROR
);
`;

mkdirSync(dirname(outputPath), { recursive: true, mode: 0o700 });
writeFileSync(outputPath, contents, { encoding: "utf8", mode: 0o600 });
chmodSync(outputPath, 0o600);

process.stdout.write("Private contact configuration generated.\n");
