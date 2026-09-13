<?php
/**
 * Contact form mailer for the static Next.js site (world4you: Apache + PHP).
 *
 * The form (src/components/main/contact-me/ContactMeForm.tsx) posts JSON as
 * text/plain to /sendMail.php on the same origin. Validation rules mirror
 * src/helpers/contact-validation.ts. Replaces the Angular-era sendMail.php:
 * - only POST, JSON responses with proper status codes
 * - honeypot ("website") and server-side validation
 * - fixed headers (From on our own domain, Reply-To sender), escaped HTML body
 * - removed the undefined `$school` variable
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, bool $ok, ?string $error = null): void
{
    http_response_code($status);
    echo json_encode($error === null ? ['ok' => $ok] : ['ok' => $ok, 'error' => $error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'method_not_allowed');
}

$raw = file_get_contents('php://input');
$data = json_decode($raw === false ? '' : $raw, true);
if (!is_array($data)) {
    respond(400, false, 'invalid_json');
}

// Honeypot: real users never fill the hidden "website" field. Pretend success.
if (isset($data['website']) && (string) $data['website'] !== '') {
    respond(200, true);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$privacy = ($data['privacy'] ?? false) === true;

$rules = [
    'name' => ['max' => 50, 'pattern' => "/^[a-zA-ZäöüÄÖÜß0-9\\-'\\s]+$/u"],
    'email' => ['max' => 254, 'pattern' => '/^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/'],
    'message' => ['max' => 300, 'pattern' => "/^[a-zA-ZäöüÄÖÜß0-9\\-'\\s.,!?;:]+$/u"],
];

function isValid(string $value, array $rule): bool
{
    $length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
    return $value !== '' && $length <= $rule['max'] && preg_match($rule['pattern'], $value) === 1;
}

if (!isValid($name, $rules['name']) || !isValid($email, $rules['email']) || !isValid($message, $rules['message']) || !$privacy) {
    respond(422, false, 'validation');
}

$recipient = 'contact@puercherjoachim.com';
$esc = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

// Subject without raw user input in the header line (RFC 2047 encoded, no CR/LF possible).
$subject = '=?UTF-8?B?' . base64_encode('Kontaktformular: ' . $name) . '?=';

$body = '<p><strong>Name:</strong> ' . $esc($name) . '</p>'
    . '<p><strong>E-Mail:</strong> ' . $esc($email) . '</p>'
    . '<p><strong>Nachricht:</strong><br>' . nl2br($esc($message)) . '</p>'
    . '<p><strong>Datenschutzerklärung akzeptiert:</strong> ja</p>';

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Portfolio Kontaktformular <noreply@puercherjoachim.com>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));
respond($sent ? 200 : 500, $sent, $sent ? null : 'mail_failed');
