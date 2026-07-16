<?php

declare(strict_types=1);

namespace TherapyWebsite\Contact;

use PHPMailer\PHPMailer\PHPMailer;

final class ContactMailer
{
    /** @param array<string, mixed> $config */
    public function __construct(private array $config)
    {
    }

    public function sendInternal(ContactSubmission $submission): void
    {
        $content = EmailTemplates::internal($submission);
        $mail = $this->mailer('form');
        $mail->setFrom($this->username('form'), $this->senderName());
        $mail->addAddress($this->username('info'), (string) $this->config['recipientName']);
        $mail->addReplyTo($submission->email, $submission->name);
        $this->applyContent($mail, $content);
        $mail->send();
    }

    public function sendConfirmation(ContactSubmission $submission): void
    {
        $content = EmailTemplates::confirmation($submission, (string) $this->config['replyWithin']);
        $mail = $this->mailer('info');
        $mail->setFrom($this->username('info'), $this->senderName());
        $mail->addAddress($submission->email, $submission->name);
        $mail->addReplyTo($this->username('info'), (string) $this->config['recipientName']);
        $this->applyContent($mail, $content);
        $mail->send();
    }

    private function mailer(string $account): PHPMailer
    {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = (string) $this->config['smtp']['host'];
        $mail->Port = (int) $this->config['smtp']['port'];
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Username = $this->username($account);
        $mail->Password = (string) $this->config['smtp'][$account]['password'];
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->Encoding = PHPMailer::ENCODING_BASE64;
        $mail->Timeout = 20;
        $mail->SMTPDebug = 0;

        return $mail;
    }

    /** @param array{subject: string, html: string, text: string} $content */
    private function applyContent(PHPMailer $mail, array $content): void
    {
        $mail->isHTML(true);
        $mail->Subject = $content['subject'];
        $mail->Body = $content['html'];
        $mail->AltBody = $content['text'];
    }

    private function username(string $account): string
    {
        return (string) $this->config['smtp'][$account]['username'];
    }

    private function senderName(): string
    {
        return (string) $this->config['senderName'];
    }
}
