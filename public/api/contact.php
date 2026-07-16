<?php

declare(strict_types=1);

use TherapyWebsite\Contact\ContactEndpoint;

ini_set('display_errors', '0');
header_remove('X-Powered-By');

try {
    $privateRoot = dirname(__DIR__, 2) . '/private/form-backend';
    $autoloadPath = $privateRoot . '/vendor/autoload.php';
    $configPath = $privateRoot . '/config.php';

    if (!is_file($autoloadPath) || !is_file($configPath)) {
        throw new RuntimeException('Contact backend is not configured.');
    }

    require $autoloadPath;
    $config = require $configPath;

    if (!is_array($config)) {
        throw new RuntimeException('Contact configuration is invalid.');
    }

    (new ContactEndpoint($config))->handle();
} catch (Throwable $exception) {
    error_log('[contact-form] bootstrap_failure');
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    echo json_encode([
        'success' => false,
        'message' => 'Das Formular ist vorübergehend nicht erreichbar.',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
