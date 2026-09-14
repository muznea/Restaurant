<?php
  header('Content-Type: text/plain; charset=utf-8');

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
  }

  $to = 'muznea123@gmail.com';
  $name = trim($_POST['name'] ?? '');
  $email = trim($_POST['email'] ?? '');
  $subject = trim($_POST['subject'] ?? '');
  $message = trim($_POST['message'] ?? '');

  if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo 'Please complete all required fields.';
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please enter a valid email address.';
    exit;
  }

  $email_message = "New contact message from the website\n\n";
  $email_message .= "Name: $name\n";
  $email_message .= "Email: $email\n";
  $email_message .= "Subject: $subject\n\n";
  $email_message .= "Message:\n$message\n";

  $headers = [
    'From: ' . $name . ' <' . $email . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
  ];

  $sent = mail($to, 'Website Contact: ' . $subject, $email_message, implode("\r\n", $headers));

  if (!$sent) {
    http_response_code(500);
    echo 'Failed to send message. Please try again later.';
    exit;
  }

  echo 'OK';
?>
