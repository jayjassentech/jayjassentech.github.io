<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $to = "eflex9jamedia@gmail.com"; // Replace with your email address
    $headers = "From: $name <$email>";

    $body = "Subject: $subject\n\n";
    $body .= "From: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}
?>
