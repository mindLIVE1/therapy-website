<?php

declare(strict_types=1);

namespace TherapyWebsite\Contact;

use JsonException;
use Throwable;

final class ContactEndpoint
{
    private const MAXIMUM_BODY_BYTES = 16_384;

    /** @param array<string, mixed> $config */
    public function __construct(private array $config)
    {
    }

    public function handle(): void
    {
        $this->sendSecurityHeaders();

        if (($this->config['enabled'] ?? false) !== true) {
            $this->respond(503, [
                'success' => false,
                'message' => 'Das Formular ist während der Bearbeitung der Website deaktiviert.',
            ]);
        }

        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
            header('Allow: POST');
            $this->respond(405, [
                'success' => false,
                'message' => 'Diese Anfrageart wird nicht unterstützt.',
            ]);
        }

        if (!$this->hasAllowedOrigin()) {
            $this->respond(403, [
                'success' => false,
                'message' => 'Die Anfrage konnte nicht bestätigt werden.',
            ]);
        }

        $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
        if (!str_starts_with($contentType, 'application/json')) {
            $this->respond(415, [
                'success' => false,
                'message' => 'Das Anfrageformat wird nicht unterstützt.',
            ]);
        }

        $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
        if ($contentLength > self::MAXIMUM_BODY_BYTES) {
            $this->respond(413, [
                'success' => false,
                'message' => 'Die Anfrage ist zu groß.',
            ]);
        }

        try {
            $rawBody = file_get_contents('php://input');
            if (!is_string($rawBody) || strlen($rawBody) > self::MAXIMUM_BODY_BYTES) {
                $this->respond(413, [
                    'success' => false,
                    'message' => 'Die Anfrage ist zu groß.',
                ]);
            }

            $payload = json_decode($rawBody, true, 32, JSON_THROW_ON_ERROR);
            if (!is_array($payload)) {
                throw new JsonException('Payload must be an object.');
            }
        } catch (JsonException $exception) {
            $this->respond(400, [
                'success' => false,
                'message' => 'Die Formulardaten konnten nicht gelesen werden.',
            ]);
        }

        if ($this->text($payload, 'website') !== '') {
            $this->respond(200, [
                'success' => true,
                'confirmationSent' => true,
            ]);
        }

        if (!$this->rateLimiter()->allows((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'))) {
            header('Retry-After: 900');
            $this->respond(429, [
                'success' => false,
                'message' => 'Bitte warten Sie etwas, bevor Sie das Formular erneut absenden.',
            ]);
        }

        try {
            $submission = ContactSubmission::fromPayload($payload);
        } catch (ValidationException $exception) {
            $this->respond(422, [
                'success' => false,
                'message' => 'Bitte prüfen Sie die markierten Angaben.',
                'errors' => $exception->errors(),
            ]);
        }

        $mailer = new ContactMailer($this->config);
        try {
            $mailer->sendInternal($submission);
        } catch (Throwable $exception) {
            error_log('[contact-form] internal_delivery_failed');
            $this->respond(502, [
                'success' => false,
                'message' => 'Die Anfrage konnte gerade nicht übermittelt werden. Bitte versuchen Sie es später erneut.',
            ]);
        }

        $confirmationSent = true;
        try {
            $mailer->sendConfirmation($submission);
        } catch (Throwable $exception) {
            $confirmationSent = false;
            error_log('[contact-form] confirmation_delivery_failed');
        }

        $this->respond(200, [
            'success' => true,
            'confirmationSent' => $confirmationSent,
        ]);
    }

    private function sendSecurityHeaders(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store, max-age=0');
        header('Pragma: no-cache');
        header('X-Content-Type-Options: nosniff');
        header('X-Robots-Tag: noindex, nofollow');
        header('Referrer-Policy: no-referrer');
    }

    private function hasAllowedOrigin(): bool
    {
        $candidate = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
        if ($candidate === '') {
            $referer = (string) ($_SERVER['HTTP_REFERER'] ?? '');
            $parts = parse_url($referer);
            if (is_array($parts) && isset($parts['scheme'], $parts['host'])) {
                $candidate = $parts['scheme'] . '://' . $parts['host'];
                if (isset($parts['port'])) {
                    $candidate .= ':' . $parts['port'];
                }
            }
        }

        return in_array($candidate, (array) ($this->config['allowedOrigins'] ?? []), true);
    }

    private function rateLimiter(): RateLimiter
    {
        $rateLimit = (array) $this->config['rateLimit'];

        return new RateLimiter(
            sys_get_temp_dir() . '/elena-contact-form',
            (string) $rateLimit['secret'],
            (int) $rateLimit['maximumAttempts'],
            (int) $rateLimit['windowSeconds'],
        );
    }

    /** @param array<string, mixed> $payload */
    private function text(array $payload, string $key): string
    {
        $value = $payload[$key] ?? '';
        return is_string($value) ? trim($value) : '';
    }

    /**
     * @param array<string, mixed> $payload
     * @return never
     */
    private function respond(int $status, array $payload): never
    {
        http_response_code($status);
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
