<?php

declare(strict_types=1);

namespace TherapyWebsite\Contact;

final class EmailTemplates
{
    /**
     * @param array{senderName: string, infoEmail: string, replyWithin: string, siteUrl: string, siteLabel: string, practiceAddress: string} $settings
     * @return array{subject: string, html: string, text: string}
     */
    public static function internal(ContactSubmission $submission, array $settings): array
    {
        $phone = $submission->phone !== '' ? self::escape($submission->phone) : 'Nicht angegeben';
        $message = $submission->message !== ''
            ? nl2br(self::escape($submission->message), false)
            : '<span style="color:#8a7868">Keine Nachricht angegeben</span>';

        $content = '
          <p class="email-copy" style="margin:0 0 24px;color:#463b32;font-size:16px;line-height:1.7">Über das Kontaktformular ist eine neue Anfrage eingegangen.</p>
          ' . self::detail('Name', self::escape($submission->name)) . '
          ' . self::detail('E-Mail', self::escape($submission->email)) . '
          ' . self::detail('Telefon', $phone) . '
          ' . self::detail('Interesse', self::escape($submission->topicLabel())) . '
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e1d8ca">
            <p class="email-muted" style="margin:0 0 8px;color:#8a7868;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Nachricht</p>
            <div class="email-copy" style="color:#463b32;font-size:16px;line-height:1.7">' . $message . '</div>
          </div>';

        $textMessage = $submission->message !== '' ? $submission->message : 'Keine Nachricht angegeben';
        $siteLabel = $settings['siteLabel'];

        return [
            'subject' => "Neue Kontaktanfrage über {$siteLabel}",
            'html' => self::layout('Kontaktformular', 'Neue Kontaktanfrage', $content, $settings),
            'text' => "Neue Kontaktanfrage über {$siteLabel}\n\n"
                . "Name: {$submission->name}\n"
                . "E-Mail: {$submission->email}\n"
                . 'Telefon: ' . ($submission->phone !== '' ? $submission->phone : 'Nicht angegeben') . "\n"
                . "Interesse: {$submission->topicLabel()}\n\n"
                . "Nachricht:\n{$textMessage}\n",
        ];
    }

    /**
     * @param array{senderName: string, recipientName: string, infoEmail: string, replyWithin: string, siteUrl: string, siteLabel: string, practiceAddress: string} $settings
     * @return array{subject: string, html: string, text: string}
     */
    public static function confirmation(ContactSubmission $submission, array $settings): array
    {
        $name = self::escape($submission->name);
        $replyWithin = $settings['replyWithin'];
        $time = self::escape($replyWithin);
        $recipientName = self::escape($settings['recipientName']);
        $content = '
          <p class="email-copy" style="margin:0 0 18px;color:#463b32;font-size:16px;line-height:1.7">Guten Tag ' . $name . ',</p>
          <p class="email-copy" style="margin:0 0 18px;color:#463b32;font-size:16px;line-height:1.7">vielen Dank, dass Sie sich mit Ihrem Anliegen an mich gewandt haben. Ihre Nachricht ist bei mir angekommen.</p>
          <p class="email-copy" style="margin:0;color:#463b32;font-size:16px;line-height:1.7">Ich weiß, dass es manchmal Überwindung kosten kann, den ersten Schritt zu gehen und Unterstützung zu suchen. Umso wichtiger ist es mir, Ihre Anfrage aufmerksam und persönlich zu beantworten. In der Regel melde ich mich ' . $time . ' bei Ihnen zurück.</p>
          <div class="email-note" style="margin-top:28px;padding:18px 20px;background-color:#eef1e8;border:1px solid #dfe4d7;border-radius:8px;color:#3f5141;font-size:14px;line-height:1.6">
            Diese Eingangsbestätigung wurde automatisch versendet. Sollten Sie Ihrer Nachricht noch etwas hinzufügen wollen, können Sie gerne direkt auf diese E-Mail antworten.
          </div>
          <p class="email-copy" style="margin:24px 0 0;color:#463b32;font-size:16px;line-height:1.7">Liebe Grüße,<br>' . $recipientName . '</p>';

        return [
            'subject' => 'Vielen Dank für Ihre Nachricht',
            'html' => self::layout($settings['senderName'], 'Vielen Dank für Ihr Vertrauen', $content, $settings),
            'text' => "Guten Tag {$submission->name},\n\n"
                . "vielen Dank, dass Sie sich mit Ihrem Anliegen an mich gewandt haben. Ihre Nachricht ist bei mir angekommen.\n\n"
                . "Ich weiß, dass es manchmal Überwindung kosten kann, den ersten Schritt zu gehen und Unterstützung zu suchen. Umso wichtiger ist es mir, Ihre Anfrage aufmerksam und persönlich zu beantworten. In der Regel melde ich mich {$replyWithin} bei Ihnen zurück.\n\n"
                . "Diese Eingangsbestätigung wurde automatisch versendet. Sollten Sie Ihrer Nachricht noch etwas hinzufügen wollen, können Sie gerne direkt auf diese E-Mail antworten.\n\n"
                . "Liebe Grüße,\n"
                . "{$settings['recipientName']}\n\n"
                . "{$settings['senderName']}\n"
                . "{$settings['practiceAddress']}\n"
                . "{$settings['infoEmail']} · {$settings['siteUrl']}\n",
        ];
    }

    private static function detail(string $label, string $value): string
    {
        return '<div style="padding:12px 0;border-bottom:1px solid #e1d8ca">'
            . '<p class="email-muted" style="margin:0 0 3px;color:#8a7868;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">' . self::escape($label) . '</p>'
            . '<p class="email-strong" style="margin:0;color:#322a24;font-size:16px;line-height:1.5">' . $value . '</p>'
            . '</div>';
    }

    /** @param array{senderName: string, infoEmail: string, replyWithin: string, siteUrl: string, siteLabel: string, practiceAddress: string} $settings */
    private static function layout(string $eyebrow, string $title, string $content, array $settings): string
    {
        $senderName = self::escape($settings['senderName']);
        $practiceAddress = self::escape($settings['practiceAddress']);
        $infoEmail = self::escape($settings['infoEmail']);
        $siteUrl = self::escape($settings['siteUrl']);
        $siteLabel = self::escape($settings['siteLabel']);

        return '<!doctype html>
<html lang="de" style="color-scheme:light;supported-color-schemes:light">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <style>
      :root { color-scheme: light; supported-color-schemes: light; }
      @media (prefers-color-scheme: dark) {
        .email-canvas { background-color:#f6f1e9 !important; }
        .email-card, .email-main { background-color:#fffdf8 !important; }
        .email-header { background-color:#e9ede3 !important; }
        .email-footer { background-color:#f1e9dc !important; }
        .email-note { background-color:#eef1e8 !important; border-color:#dfe4d7 !important; color:#3f5141 !important; }
        .email-title, .email-strong { color:#322a24 !important; }
        .email-copy { color:#463b32 !important; }
        .email-muted { color:#8a7868 !important; }
        .email-link { color:#3f5141 !important; }
      }
      [data-ogsc] .email-canvas { background-color:#f6f1e9 !important; }
      [data-ogsc] .email-card, [data-ogsc] .email-main { background-color:#fffdf8 !important; }
      [data-ogsc] .email-header { background-color:#e9ede3 !important; }
      [data-ogsc] .email-footer { background-color:#f1e9dc !important; }
      [data-ogsc] .email-note { background-color:#eef1e8 !important; color:#3f5141 !important; }
      [data-ogsc] .email-title, [data-ogsc] .email-strong { color:#322a24 !important; }
      [data-ogsc] .email-copy { color:#463b32 !important; }
      [data-ogsc] .email-muted { color:#8a7868 !important; }
      [data-ogsc] .email-link { color:#3f5141 !important; }
    </style>
  </head>
  <body class="email-canvas" bgcolor="#f6f1e9" style="margin:0;padding:0;background-color:#f6f1e9;font-family:Arial,sans-serif;color:#463b32;color-scheme:light">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">' . self::escape($title) . '</div>
    <table class="email-canvas" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f1e9" style="width:100%;background-color:#f6f1e9">
      <tr>
        <td align="center" style="padding:36px 14px">
          <table class="email-card" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#fffdf8" style="width:100%;max-width:620px;background-color:#fffdf8;border:1px solid #e6dbc8;border-radius:8px;overflow:hidden">
            <tr>
              <td height="5" bgcolor="#bd7850" style="height:5px;background-color:#bd7850;font-size:0;line-height:0">&nbsp;</td>
            </tr>
            <tr>
              <td class="email-header" bgcolor="#e9ede3" style="padding:30px 34px 28px;background-color:#e9ede3">
                <p class="email-muted" style="margin:0 0 10px;color:#8a7868;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">' . self::escape($eyebrow) . '</p>
                <h1 class="email-title" style="margin:0;color:#322a24;font-size:28px;line-height:1.25;font-weight:600">' . self::escape($title) . '</h1>
              </td>
            </tr>
            <tr>
              <td class="email-main" bgcolor="#fffdf8" style="padding:32px 34px 34px;background-color:#fffdf8">' . $content . '</td>
            </tr>
            <tr>
              <td class="email-footer email-muted" bgcolor="#f1e9dc" style="padding:22px 34px;background-color:#f1e9dc;color:#6b5b4d;font-size:12px;line-height:1.7">
                ' . $senderName . '<br>
                ' . $practiceAddress . '<br>
                <a class="email-link" href="mailto:' . $infoEmail . '" style="color:#3f5141;text-decoration:underline">' . $infoEmail . '</a>
                · <a class="email-link" href="' . $siteUrl . '" style="color:#3f5141;text-decoration:underline">' . $siteLabel . '</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>';
    }

    private static function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
