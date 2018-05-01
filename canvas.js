var leftStickerShow = document.getElementById("leftStickerShow");
var leftStickerHide = document.getElementById("leftStickerHide");
var leftPanel = document.getElementById("leftPanel");
var canvas = document.getElementById("canvas");

function start() 
{
	leftStickerShow.addEventListener("click", function(){
		showLeftPanel();
	});
	leftStickerHide.addEventListener("click", function(){
		hideLeftPanel();
	});
}

function showLeftPanel()
{
	leftPanel.style.display = "block";
	leftStickerHide.style.display = "block";
	leftStickerShow.style.display = "none";
	canvas.style.marginLeft = "1%";

}

function hideLeftPanel()
{
	leftPanel.style.display = "none";
	leftStickerHide.style.display = "none";
	leftStickerShow.style.display = "block";
	canvas.style.marginLeft = "2%";
}








/*
var leftC = document.getElementById("left_column").innerHTML = "hello";
var rightC = document.getElementById("footer");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var wrapper = document.getElementById("canvas");
var point = [];
var line = [];
var drawnPoint = [];


function init() {
	
	canvas.width = wrapper.offsetWidth;
	canvas.height = wrapper.offsetHeight;

	canvas.addEventListener("click", function(){
		drawPoint();
	});
	canvas.addEventListener("mousemove", function(){
		mouseCoords();
	});
}

function mouseCoords() {
	var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (drawnPoint.length != 0) {
    	for (var i = 0; i < drawnPoint.length -1; i++) {
    		if (drawnPoint[i] == x) {
    			ctx.fillStyle = "rgb(255,0,0)";
    			ctx.fillRect(x -2, y -2, 4, 4);
    		}
    	}
    	
    }

}

function drawPoint() {
	var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fillRect(x -2, y -2, 4, 4);

    savePoint(x, y);
}

function savePoint(x, y) {
	point.push(x);
	point.push(y);
	drawnPoint.push(x);
	drawnPoint.push(y);

	if(point.length == 4) {
		drawLine();
		point = [];
	}
}

function drawLine() {
	ctx.beginPath();
	ctx.moveTo(point[0],point[1]);
	ctx.lineTo(point[2],point[3]);
	ctx.stroke();
	rightC.innerHTML = point.toString();
}
*/

function webGLStart() {
    init();
}