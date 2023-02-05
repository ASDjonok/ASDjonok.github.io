window.onload = function(){
    var canvas = document.getElementById("stampCanvas");
    var context = canvas.getContext("2d");
    drawIcon(canvas, context);
    drawText(canvas, context);
}


function drawIcon(canvas, context){
    var FICTicon = new Image();
    FICTicon.src = "/OOP-SITE/images/stamp1.png";
    FICTicon.onload = function(){
        context.drawImage(FICTicon, 0, 0, 141, 141);
    }
}

function drawText(canvas, context){
    date = new Date();
    year = date.getFullYear();
    context.fillStyle = "#38b2ff";
    context.font = "bold 1em sans-serif";
    context.textAlign = "";
    context.rotate(degreesToRadians(32));
  
    context.fillText(year, 80, -10);
    context.setTransform(1, 0, 0, 1, 0, 0);
}
function degreesToRadians(degrees) {
return (degrees * Math.PI)/180;
}