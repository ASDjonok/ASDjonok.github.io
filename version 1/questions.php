<html>
	
	<head>
		<link rel="stylesheet" href="http://s3.amazonaws.com/codecademy-content/courses/ltp/css/bootstrap.css">
		<link href="http://s3.amazonaws.com/codecademy-content/courses/ltp/css/shift.css" rel="stylesheet">
		<link rel="stylesheet" href="questions.css">
		<link href='https://fonts.googleapis.com/css?family=PT+Serif|Bad+Script&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
		
		<meta charset="utf-8">
		<title>Запитання викладачеві</title>
		
	</head>
	
	<body>
<div>
<?php
	
	

/*$header .= "Content-Transfer-Encoding: base64".PHP_EOL;
 $header .= "Content-Disposition: attachment; filename=\"".$file_name."\"".PHP_EOL.PHP_EOL;
 $header .= $content.PHP_EOL;
 $header .= "--".$boundary."--";*/

/*$from  = "From: $name <$mail> \r\n Reply-To: $mail \r\n";  //автоматически отобразит e-mail пользователя в нужной строке, когда вы будете писать ответ
$result = mail ("alexeya10@ukr.net", "Новый вопрос на сайте", "Алексей Вадимович, Вам на сайте задали вопрос: \nАвтор: $_POST[name] \nЭлектронный адрес: $_POST[mail] \nВопрос: $_POST[msg]", $header);



if ($result) {
		echo "<p><span>С</span>ообщение отправлено успешно!</p> <p><img src=\"images\send.png\"/></p>";
} 
else {
	echo "<p><span>С</span>ообщение <span>НЕ</span> отправлено</p>";
}*/

$fp = fopen("messages.txt", "a"); // Открываем файл в режиме записи 
$mytext = "\r\nАвтор: $_POST[name] \r\nЭлектронный адрес: $_POST[mail] \r\nВопрос: $_POST[msg]\r\n"; // Исходная строка
$test = fwrite($fp, $mytext); // Запись в файл
$test = fwrite($fp, date('l jS \of F Y h:i:s A')); // Запись в файл
if ($test) echo "<div id='result'><p><span>З</span>апитання відправлено успішно!</p></div>
<div><img src=\"images\send_ukr.png\"/></div>";
else echo 'Помилка при записуванні в файл';
fclose($fp); //Закрытие файла


$path = 'upload/';

 

// Обработка запроса

if ($_SERVER['REQUEST_METHOD'] == 'POST')

{

// Загрузка файла и вывод сообщения
//setlocale(LC_ALL, 'ru_RU.UTF-8');

$filenameFileLocal = iconv("UTF-8","WINDOWS-1251",$_FILES['attach']['name']);

if (@copy($_FILES['attach']['tmp_name'], $path . $filenameFileLocal))

//echo "<div class='file_info'><p>(без прикріпленого файлу)</p></div>";

//else

echo "<div class='file_info'><p>(з прикріпленим файлом)</p></div>";

}
$file_name = "<attachment>";
 $path = 'upload/';
 
?>
</div>

<div>
<p><a href="index.html" class="gohome">Повернутися на головну сторінку</a></p>
</div>

	
	</body>
</html>