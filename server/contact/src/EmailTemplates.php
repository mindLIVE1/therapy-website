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
          <p style="margin:0 0 24px;color:#463b32;font-size:16px;line-height:1.7">Über das Kontaktformular ist eine neue Anfrage eingegangen.</p>
          ' . self::detail('Name', self::escape($submission->name)) . '
          ' . self::detail('E-Mail', self::escape($submission->email)) . '
          ' . self::detail('Telefon', $phone) . '
          ' . self::detail('Interesse', self::escape($submission->topicLabel())) . '
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e1d8ca">
            <p style="margin:0 0 8px;color:#8a7868;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Nachricht</p>
            <div style="color:#463b32;font-size:16px;line-height:1.7">' . $message . '</div>
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
     * @param array{senderName: string, infoEmail: string, replyWithin: string, siteUrl: string, siteLabel: string, practiceAddress: string} $settings
     * @return array{subject: string, html: string, text: string}
     */
    public static function confirmation(ContactSubmission $submission, array $settings): array
    {
        $name = self::escape($submission->name);
        $replyWithin = $settings['replyWithin'];
        $time = self::escape($replyWithin);
        $content = '
          <p style="margin:0 0 18px;color:#463b32;font-size:16px;line-height:1.7">Guten Tag ' . $name . ',</p>
          <p style="margin:0 0 18px;color:#463b32;font-size:16px;line-height:1.7">vielen Dank für Ihre Nachricht. Ihre Anfrage ist bei mir eingegangen.</p>
          <p style="margin:0;color:#463b32;font-size:16px;line-height:1.7">Ich melde mich in der Regel ' . $time . ' persönlich bei Ihnen.</p>
          <div style="margin-top:28px;padding:18px 20px;background:#e4e8da;border-radius:8px;color:#3f5141;font-size:14px;line-height:1.6">
            Diese Eingangsbestätigung wurde automatisch versendet. Bei Rückfragen können Sie direkt auf diese E-Mail antworten.
          </div>';

        return [
            'subject' => 'Ihre Anfrage ist bei mir eingegangen',
            'html' => self::layout($settings['senderName'], 'Vielen Dank für Ihre Nachricht', $content, $settings),
            'text' => "Guten Tag {$submission->name},\n\n"
                . "vielen Dank für Ihre Nachricht. Ihre Anfrage ist bei mir eingegangen.\n\n"
                . "Ich melde mich in der Regel {$replyWithin} persönlich bei Ihnen.\n\n"
                . "Diese Eingangsbestätigung wurde automatisch versendet. Bei Rückfragen können Sie direkt auf diese E-Mail antworten.\n\n"
                . "{$settings['senderName']}\n"
                . "{$settings['practiceAddress']}\n"
                . "{$settings['infoEmail']} · {$settings['siteUrl']}\n",
        ];
    }

    private static function detail(string $label, string $value): string
    {
        return '<div style="padding:12px 0;border-bottom:1px solid #e1d8ca">'
            . '<p style="margin:0 0 3px;color:#8a7868;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">' . self::escape($label) . '</p>'
            . '<p style="margin:0;color:#322a24;font-size:16px;line-height:1.5">' . $value . '</p>'
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
<html lang="de">
  <body style="margin:0;padding:0;background:#f6f1e9;font-family:Arial,sans-serif;color:#463b32">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f1e9">
      <tr>
        <td align="center" style="padding:32px 16px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fffaf3;border:1px solid #e6dbc8;border-radius:8px;overflow:hidden">
            <tr>
              <td style="padding:30px 34px 24px;background:#3f5141;color:#f6f1e9">
                <p style="margin:0 0 8px;color:#c6cfb8;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">' . self::escape($eyebrow) . '</p>
                <h1 style="margin:0;color:#f6f1e9;font-size:26px;line-height:1.25;font-weight:600">' . self::escape($title) . '</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px">' . $content . '</td>
            </tr>
            <tr>
              <td style="padding:20px 34px;background:#efe7d8;color:#6b5b4d;font-size:12px;line-height:1.7">
                ' . $senderName . '<br>
                ' . $practiceAddress . '<br>
                <a href="mailto:' . $infoEmail . '" style="color:#3f5141;text-decoration:underline">' . $infoEmail . '</a>
                · <a href="' . $siteUrl . '" style="color:#3f5141;text-decoration:underline">' . $siteLabel . '</a>
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
