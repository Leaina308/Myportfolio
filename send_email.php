<?php
// Configuration de base
header('Content-Type: text/plain; charset=utf-8');

// Vérifier si la requête est de type POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo "Méthode non autorisée. Utilisez POST.";
    exit;
}

// Récupérer et nettoyer les données du formulaire
$name = strip_tags(trim($_POST["name"] ?? ''));
$email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = strip_tags(trim($_POST["subject"] ?? ''));
$message = trim($_POST["message"] ?? '');

// Validation des données
$errors = [];

if (empty($name)) {
    $errors[] = "Le nom est obligatoire.";
}

if (empty($email)) {
    $errors[] = "L'email est obligatoire.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "L'email n'est pas valide.";
}

if (empty($subject)) {
    $errors[] = "Le sujet est obligatoire.";
}

if (empty($message)) {
    $errors[] = "Le message est obligatoire.";
} elseif (strlen($message) < 10) {
    $errors[] = "Le message doit contenir au moins 10 caractères.";
}

// Si des erreurs existent, les retourner
if (!empty($errors)) {
    http_response_code(400);
    echo implode("\n", $errors);
    exit;
}

// Configuration de l'email
$to = "leaina683@gmail.com"; // Remplacez par votre adresse email
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Construction du message
$email_subject = "Nouveau message de contact: $subject";
$email_body = "Vous avez reçu un nouveau message de contact depuis votre portfolio.\n\n";
$email_body .= "Nom: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Sujet: $subject\n\n";
$email_body .= "Message:\n$message\n\n";
$email_body .= "---\nCe message a été envoyé depuis le formulaire de contact du portfolio.\n";

// Envoi de l'email
$mailSent = mail($to, $email_subject, $email_body, $headers);

// Réponse
if ($mailSent) {
    http_response_code(200);
    echo "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais!";
} else {
    http_response_code(500);
    echo "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.";
}

// Optionnel: Journalisation (pour le débogage)
error_log("Tentative d'envoi d'email - Nom: $name, Email: $email, Sujet: $subject");
?>