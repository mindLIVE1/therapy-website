<?php

declare(strict_types=1);

namespace TherapyWebsite\Contact;

final class ContactSubmission
{
    /** @var array<string, string> */
    private const TOPICS = [
        'einzeltherapie' => 'Einzeltherapie',
        'paartherapie' => 'Paartherapie',
        'sexualtherapie' => 'Sexualtherapie',
        'unsicher' => 'Noch nicht sicher',
    ];

    public function __construct(
        public string $name,
        public string $email,
        public string $phone,
        public string $topic,
        public string $message,
    ) {
    }

    /** @param array<string, mixed> $payload */
    public static function fromPayload(array $payload): self
    {
        $name = self::text($payload, 'name');
        $email = self::text($payload, 'email');
        $phone = self::text($payload, 'phone');
        $topic = self::text($payload, 'topic');
        $message = self::text($payload, 'message', true);
        $errors = [];

        if ($name === '' || self::length($name) > 120 || self::hasHeaderBreak($name)) {
            $errors['name'] = 'Bitte geben Sie einen gültigen Namen ein.';
        }

        if (
            $email === ''
            || self::length($email) > 254
            || self::hasHeaderBreak($email)
            || filter_var($email, FILTER_VALIDATE_EMAIL) === false
        ) {
            $errors['email'] = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        }

        if ($phone !== '' && (self::length($phone) > 50 || self::hasHeaderBreak($phone))) {
            $errors['phone'] = 'Bitte prüfen Sie die Telefonnummer.';
        }

        if (!array_key_exists($topic, self::TOPICS)) {
            $errors['topic'] = 'Bitte wählen Sie ein Angebot aus.';
        }

        if (self::length($message) > 2_000) {
            $errors['message'] = 'Die Nachricht darf höchstens 2.000 Zeichen lang sein.';
        }

        if (($payload['consent'] ?? null) !== true) {
            $errors['consent'] = 'Bitte bestätigen Sie die Datenschutzeinwilligung.';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        return new self($name, $email, $phone, $topic, $message);
    }

    public function topicLabel(): string
    {
        return self::TOPICS[$this->topic];
    }

    /** @param array<string, mixed> $payload */
    private static function text(array $payload, string $key, bool $multiline = false): string
    {
        $value = $payload[$key] ?? '';
        if (!is_string($value)) {
            return '';
        }

        $value = str_replace("\0", '', $value);
        if ($multiline) {
            $value = preg_replace("/\r\n?|\n/", "\n", $value) ?? $value;
        }

        return trim($value);
    }

    private static function hasHeaderBreak(string $value): bool
    {
        return str_contains($value, "\r") || str_contains($value, "\n");
    }

    private static function length(string $value): int
    {
        return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
    }
}
