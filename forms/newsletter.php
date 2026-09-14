<?php
  header('Content-Type: text/plain; charset=utf-8');

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
  }

  $email = trim($_POST['email'] ?? '');

  if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please enter a valid email address.';
    exit;
  }

  $to = 'muznea123@gmail.com';
  $subject = 'New Newsletter Subscription';
  $message = "A new subscriber joined the newsletter.\n\nEmail: $email\n";
  $headers = [
    'From: ' . $email,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
  ];

  $sent = mail($to, $subject, $message, implode("\r\n", $headers));

  if (!$sent) {
    http_response_code(500);
    echo 'Failed to subscribe. Please try again later.';
    exit;
  }

  echo 'OK';
?>
