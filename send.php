<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "lina.pozolotina.03@mail.ru";
    $subject = "Заявка на экскурсию: " . htmlspecialchars($_POST["tour"]);

    $message = "ФИО: " . htmlspecialchars($_POST["name"]) . "\n" .
               "Количество человек: " . htmlspecialchars($_POST["people"]) . "\n" .
               "Дата: " . htmlspecialchars($_POST["date"]) . "\n" .
               "Время: " . htmlspecialchars($_POST["time"]) . "\n" .
               "Телефон: " . htmlspecialchars($_POST["phone"]);

    $headers = "From: no-reply@yourdomain.ru\r\n" .
               "Reply-To: " . htmlspecialchars($_POST["phone"]) . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "<h2>Спасибо! Ваша заявка отправлена.</h2>";
    } else {
        echo "<h2>Ошибка при отправке заявки. Попробуйте позже.</h2>";
    }
}
?>
