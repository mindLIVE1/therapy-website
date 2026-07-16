<?php

declare(strict_types=1);

use TherapyWebsite\Contact\ContactSubmission;
use TherapyWebsite\Contact\EmailTemplates;
use TherapyWebsite\Contact\RateLimiter;
use TherapyWebsite\Contact\ValidationException;

require dirname(__DIR__, 3) . '/vendor/autoload.php';

$tests = [];

$tests['valid submission is normalized'] = static function (): void {
    $submission = ContactSubmission::fromPayload([
        'name' => '  Erika Mustermann  ',
        'email' => 'ERIKA@example.com',
        'phone' => '',
        'topic' => 'paartherapie',
        'message' => " Kurze Nachricht.\r\nDanke. ",
        'consent' => true,
    ]);

    assertSame('Erika Mustermann', $submission->name);
    assertSame('ERIKA@example.com', $submission->email);
    assertSame('Paartherapie', $submission->topicLabel());
    assertSame("Kurze Nachricht.\nDanke.", $submission->message);
};

$tests['optional values may be empty'] = static function (): void {
    $submission = ContactSubmission::fromPayload([
        'name' => 'Erika Mustermann',
        'email' => 'erika@example.com',
        'phone' => '',
        'topic' => 'unsicher',
        'message' => '',
        'consent' => true,
    ]);

    assertSame('', $submission->phone);
    assertSame('', $submission->message);
};

$tests['invalid values are rejected'] = static function (): void {
    try {
        ContactSubmission::fromPayload([
            'name' => '',
            'email' => 'not-an-email',
            'topic' => 'invalid',
            'consent' => false,
        ]);
    } catch (ValidationException $exception) {
        $errors = $exception->errors();
        assertTrue(isset($errors['name'], $errors['email'], $errors['topic'], $errors['consent']));
        return;
    }

    throw new RuntimeException('Expected validation to fail.');
};

$tests['email templates escape content and keep confirmation neutral'] = static function (): void {
    $submission = ContactSubmission::fromPayload([
        'name' => '<Erika>',
        'email' => 'erika@example.com',
        'phone' => '',
        'topic' => 'sexualtherapie',
        'message' => '<script>alert(1)</script>',
        'consent' => true,
    ]);

    $internal = EmailTemplates::internal($submission);
    $confirmation = EmailTemplates::confirmation($submission, 'innerhalb von zwei Werktagen');

    assertTrue(str_contains($internal['html'], '&lt;script&gt;'));
    assertTrue(!str_contains($internal['html'], '<script>'));
    assertTrue(!str_contains($confirmation['html'], 'Sexualtherapie'));
    assertTrue(!str_contains($confirmation['html'], 'alert(1)'));
    assertTrue(str_contains($confirmation['text'], 'innerhalb von zwei Werktagen'));
    assertTrue(str_contains($confirmation['html'], 'info@elena-roehrborn.de'));
};

$tests['rate limiter blocks after configured threshold'] = static function (): void {
    $directory = sys_get_temp_dir() . '/contact-test-' . bin2hex(random_bytes(5));
    $limiter = new RateLimiter($directory, 'test-secret', 2, 60);

    assertTrue($limiter->allows('192.0.2.1'));
    assertTrue($limiter->allows('192.0.2.1'));
    assertTrue(!$limiter->allows('192.0.2.1'));

    foreach (glob($directory . '/*') ?: [] as $file) {
        unlink($file);
    }
    rmdir($directory);
};

function assertSame(mixed $expected, mixed $actual): void
{
    if ($expected !== $actual) {
        throw new RuntimeException('Assertion failed: values are not identical.');
    }
}

function assertTrue(bool $condition): void
{
    if (!$condition) {
        throw new RuntimeException('Assertion failed: condition is false.');
    }
}

$failures = 0;
foreach ($tests as $name => $test) {
    try {
        $test();
        echo "PASS {$name}\n";
    } catch (Throwable $exception) {
        $failures++;
        fwrite(STDERR, "FAIL {$name}: {$exception->getMessage()}\n");
    }
}

if ($failures > 0) {
    exit(1);
}

echo count($tests) . " tests passed.\n";
