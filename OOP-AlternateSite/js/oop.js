$(document).ready (function () {

	$('img[src*="fiot_ukr.png"]').fadeIn(6000);

}); //Конец ready



	$(document).ready(function(){
		$('#my_button').click(function(){
		var answer = confirm("Відповідь буде надіслана на вказаний Вами E-mail. Перевірте, будь ласка, чи правильно Ви його написали. Дякуємо!");
		if (!answer) {
			return false;
			};
				});
});//конец ready

$(document).ready( function() {
    $(".file-upload input[type=file]").change(function(){
         var filename = $(this).val().replace(/.*\\/, "");
         $("#filename").val(filename);
    });
});
