<?php

declare(strict_types=1);

namespace TherapyWebsite\Contact;

final class RateLimiter
{
    public function __construct(
        private string $directory,
        private string $secret,
        private int $maximumAttempts,
        private int $windowSeconds,
    ) {
    }

    public function allows(string $remoteAddress): bool
    {
        if (!$this->ensureDirectory()) {
            error_log('[contact-form] rate_limit_directory_unavailable');
            return true;
        }

        $key = hash_hmac('sha256', $remoteAddress, $this->secret);
        $path = $this->directory . '/' . $key . '.json';
        $handle = @fopen($path, 'c+');

        if ($handle === false) {
            error_log('[contact-form] rate_limit_file_unavailable');
            return true;
        }

        $allowed = true;
        try {
            if (!flock($handle, LOCK_EX)) {
                return true;
            }

            $raw = stream_get_contents($handle);
            $stored = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
            $now = time();
            $resetAt = is_array($stored) && is_int($stored['resetAt'] ?? null)
                ? $stored['resetAt']
                : $now + $this->windowSeconds;
            $attempts = is_array($stored) && is_int($stored['attempts'] ?? null)
                ? $stored['attempts']
                : 0;

            if ($resetAt <= $now) {
                $attempts = 0;
                $resetAt = $now + $this->windowSeconds;
            }

            $attempts = min($attempts + 1, $this->maximumAttempts + 1);
            $allowed = $attempts <= $this->maximumAttempts;

            rewind($handle);
            ftruncate($handle, 0);
            fwrite($handle, json_encode([
                'attempts' => $attempts,
                'resetAt' => $resetAt,
            ], JSON_THROW_ON_ERROR));
            fflush($handle);
            @chmod($path, 0600);
            flock($handle, LOCK_UN);
        } finally {
            fclose($handle);
        }

        $this->removeExpiredFiles();

        return $allowed;
    }

    private function ensureDirectory(): bool
    {
        if (is_dir($this->directory)) {
            return true;
        }

        return @mkdir($this->directory, 0700, true) || is_dir($this->directory);
    }

    private function removeExpiredFiles(): void
    {
        $oldestAllowed = time() - $this->windowSeconds;
        foreach (glob($this->directory . '/*.json') ?: [] as $path) {
            $modified = @filemtime($path);
            if (is_int($modified) && $modified < $oldestAllowed) {
                @unlink($path);
            }
        }
    }
}
