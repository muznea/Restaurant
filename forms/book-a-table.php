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
  $phone = trim($_POST['phone'] ?? '');
  $date = trim($_POST['date'] ?? '');
  $time = trim($_POST['time'] ?? '');
  $people = trim($_POST['people'] ?? '');
  $message = trim($_POST['message'] ?? '');

  if ($name === '' || $email === '' || $phone === '' || $date === '' || $time === '' || $people === '') {
    http_response_code(400);
    echo 'Please complete all required booking fields.';
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please enter a valid email address.';
    exit;
  }

  $email_message = "New table booking request from the website\n\n";
  $email_message .= "Name: $name\n";
  $email_message .= "Email: $email\n";
  $email_message .= "Phone: $phone\n";
  $email_message .= "Date: $date\n";
  $email_message .= "Time: $time\n";
  $email_message .= "Number of people: $people\n\n";
  $email_message .= "Message:\n" . ($message !== '' ? $message : 'No additional message') . "\n";

  $headers = [
    'From: ' . $name . ' <' . $email . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
  ];

  $sent = mail($to, 'New Table Booking Request', $email_message, implode("\r\n", $headers));

  if (!$sent) {
    http_response_code(500);
    echo 'Failed to send booking request. Please try again later.';
    exit;
  }

  echo 'OK';
?>
