<?php

declare(strict_types=1);

use TherapyWebsite\Contact\ContactSubmission;
use TherapyWebsite\Contact\EmailTemplates;

require dirname(__DIR__, 3) . '/vendor/autoload.php';

$submission = ContactSubmission::fromPayload([
    'name' => 'Technischer Test',
    'email' => 'testperson@example.com',
    'phone' => '',
    'topic' => 'unsicher',
    'message' => 'Test des Kontaktformulars',
    'consent' => true,
]);

$settings = [
    'senderName' => 'Elena Roehrborn Onlinetherapie',
    'infoEmail' => 'info@elena-roehrborn.de',
    'replyWithin' => 'innerhalb von zwei Werktagen',
    'siteUrl' => 'https://elena-roehrborn.de',
    'siteLabel' => 'elena-roehrborn.de',
    'practiceAddress' => 'Wilmersdorfer Straße 95, 10629 Berlin',
];

$template = ($_GET['type'] ?? 'confirmation') === 'internal'
    ? EmailTemplates::internal($submission, $settings)
    : EmailTemplates::confirmation($submission, $settings);

header('Content-Type: text/html; charset=utf-8');
echo $template['html'];
