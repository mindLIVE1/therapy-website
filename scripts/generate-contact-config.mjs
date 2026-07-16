import { randomBytes } from "node:crypto";
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const mailboxes = {
  form: "formular@elena-roehrborn.de",
  info: "info@elena-roehrborn.de",
};

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Required deployment value ${name} is missing.`);
  }
  return value;
}

const maintenanceValue = (process.env.SITE_IN_PROGRESS || "true").toLowerCase();
if (!new Set(["true", "false"]).has(maintenanceValue)) {
  throw new Error("SITE_IN_PROGRESS must be either true or false.");
}

const config = {
  enabled: maintenanceValue === "false",
  allowedOrigins: [
    "https://elena-roehrborn.de",
    "https://www.elena-roehrborn.de",
  ],
  senderName: "Elena Roehrborn Onlinetherapie",
  recipientName: "Elena Roehrborn",
  replyWithin: "innerhalb von zwei Werktagen",
  smtp: {
    host: process.env.SMTP_HOST?.trim() || "w021d308.kasserver.com",
    port: 465,
    form: {
      username: mailboxes.form,
      password: required("SMTP_FORM_PASSWORD"),
    },
    info: {
      username: mailboxes.info,
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
