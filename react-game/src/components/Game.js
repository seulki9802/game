import { useRef, useEffect } from 'react';

function Game({ setPage, setScore }) {

  const canvasRef = useRef();

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    var x = canvas.width/2
    var y = canvas.height/2

    var mainFoodNumber = 10;
    var mainFoodSize = width * 40 / 480;
    var mainFoods = [];

    var junckFoodNumber = 0;
    var junckFoodSize = width * 30 / 480;
    var junckFoods = [];

    var dx, dy;
    var basicSpeed = 5;

    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    var smileSize = width * 20 / 480;
    var eat = 0;
    var eatMainFoodNumber = 0;
    var eatTime = new Date();

    var gameGauge;
    var gameGaugeSize = canvas.height/10;

    var start = 0;
    var over = 0;
    var stage = 0;

    var score = 0;

    document.addEventListener("keydown", keyDownHandler, false);

    function setup(speed) {
      dx = basicSpeed + speed
      dy = basicSpeed + speed
      eatMainFoodNumber = 0;
      gameGauge = 1;
      for (var i = 0; i < mainFoodNumber; i++) {
        var x = getRandomInt(canvas.width * 0.1, canvas.width * 0.9);
        var y = getRandomInt(canvas.height/8, canvas.height * 0.9);
        mainFoods[i] = { x : x, y : y, status : 1};
      }
      for (var i = 0; i < junckFoodNumber; i++) {
        var x = getRandomInt(canvas.width * 0.1, canvas.width * 0.9);
        var y = getRandomInt(canvas.height/8, canvas.height * 0.9);
        junckFoods[i] = { x : x, y : y, status : 1};
      }

    }

    function stageSet() {
      if (stage >= 3) {
        junckFoodNumber = Math.floor(stage * 1.5 );
      }
      setup(stage * 0.8)

    }

    function keyDownHandler(e) {
        if(e.keyCode === 39) {
          rightPressed = true;
          leftPressed = false;
          upPressed = false;
          downPressed = false;
        }
        if(e.keyCode === 37) {
          rightPressed = false
          leftPressed = true;
          upPressed = false;
          downPressed = false;
        }
        if(e.keyCode === 38) {
          rightPressed = false;
          leftPressed = false;
          upPressed = true;
          downPressed = false;
        }
        if(e.keyCode === 40) {
          rightPressed = false;
          leftPressed = false;
          upPressed = false;
          downPressed = true;
        }
        if(e.keyCode === 13) {
          if(eatMainFoodNumber === mainFoodNumber || start === 0 || over === 1) {
            if(over === 1) {
              setScore(score);
              setPage('ranking');
              stage = 0;
              start = 0;
              over = 0;
              score = 0;
            }else{
              stage += 1;
              start = 1;
            }
            stageSet()
          }
        }
    }

    function moveSmile() {
      if (rightPressed === true) {
        x += dx;
      }
      if (leftPressed === true) {
        x -= dx;
      }
      if (upPressed === true) {
        y -= dy;
      }
      if (downPressed === true) {
        y += dy;
      }
      if (x > canvas.width - smileSize) {
        rightPressed = false;
        leftPressed = true;
      }
      if (x < smileSize) {
        leftPressed = false;
        rightPressed = true;
      }
      if (y > canvas.height - smileSize) {
        downPressed = false;
        upPressed = true;
      }
      if (y < smileSize + gameGaugeSize) {
        upPressed = false;
        downPressed = true;
      }
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    function colli_mainFood() {
      for (var i = 0; i < mainFoodNumber; i++) {
        var fx = mainFoods[i].x + mainFoodSize/2; //figure x (main food x)
        var fy = mainFoods[i].y + mainFoodSize/2;
        var is = Math.sqrt(Math.pow(x - fx, 2) + Math.pow(y - fy, 2));
        if (is <= mainFoodSize/3 + smileSize && mainFoods[i].status === 1) {
          eat = 1;
          eatMainFoodNumber += 1;
          mainFoods[i].status = 0;
          eatTime = new Date();
          gameGauge += 30;
          score += 1;
          if (gameGauge >= 100) {
            gameGauge = 100;
          }
        }
      }
    }

    function colli_junckFood() {
      for (var i = 0; i < junckFoodNumber; i++) {
        var fx = junckFoods[i].x + junckFoodSize/2; //figure x (jucnk food x)
        var fy = junckFoods[i].y + junckFoodSize/2;
        var is = Math.sqrt(Math.pow(x - fx, 2) + Math.pow(y - fy, 2));
        if (is <= junckFoodSize/4 + smileSize && junckFoods[i].status === 1) {
          junckFoods[i].status = 0;
          gameGauge -= 30;
        }
      }
    }

    function drawMainFood() {
      for ( var i = 0; i < mainFoodNumber; i ++) {
        if (mainFoods[i].status === 1) {
          var mainFoodX = mainFoods[i].x;
          var mainFoodY = mainFoods[i].y;
          ctx.drawImage(document.getElementById("hamburger"),
                        mainFoodX, mainFoodY, mainFoodSize, mainFoodSize);
          // ctx.beginPath();
          // ctx.arc(mainFoodX + mainFoodSize/2 , mainFoodY + mainFoodSize/2, mainFoodSize/2, 0, Math.PI * 2, true); // head
          // ctx.stroke();
        }
      }
    }

    function drawJunckFood() {
      for ( var i = 0; i < junckFoodNumber; i ++) {
        if (junckFoods[i].status === 1) {
          var junckFoodX = junckFoods[i].x;
          var junckFoodY = junckFoods[i].y;
          ctx.drawImage(document.getElementById("lettuce"),
                        junckFoodX, junckFoodY, junckFoodSize, junckFoodSize);
          // ctx.beginPath();
          // ctx.arc(junckFoodX + junckFoodSize/2, junckFoodY + junckFoodSize/2, junckFoodSize/2, 0, Math.PI * 2, true); // head
          // ctx.stroke();
        }
      }
    }

    function drawSmile() {
      ctx.beginPath();
      ctx.arc(x, y, smileSize, 0, Math.PI * 2, true);
      ctx.save();
      for (var i = 0; i < gameGauge; i++) {
        ctx.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
        ctx.fill();
      }
      ctx.restore();
      ctx.moveTo(x - smileSize/2 + smileSize/4, y - smileSize/6)
      if (eat === 0) {
        ctx.arc(x - smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI * 2, true);
        ctx.moveTo(x + smileSize/2 + smileSize/4, y - smileSize/6)
        ctx.arc(x + smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI * 2, true);
      }
      else {
        ctx.arc(x - smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI, true);
        ctx.moveTo(x + smileSize/2 + smileSize/4, y - smileSize/6)
        ctx.arc(x + smileSize/2, y - smileSize/6, smileSize/4, 0, Math.PI, true);
      }
      ctx.moveTo(x + smileSize/3, y + smileSize/4)
      ctx.arc(x, y + smileSize/4, smileSize/3, 0, Math.PI, false);
      ctx.lineTo(x + smileSize/3, y + smileSize/4);
      ctx.stroke();
    }

    function drawGuage() {
      ctx.save();
      ctx.beginPath();
      for (var i = 0; i < gameGauge; i++) {
        // ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
        ctx.fillRect(i * canvas.width/100, 0, canvas.width/100, gameGaugeSize);
      }
      gameGauge -= 0.3;
      ctx.restore();
    }

    function drawScore() {
      ctx.font = "50px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(score, canvas.width/2, canvas.height/2)
    }

    function gameStart() {
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
      ctx.fillStyle = "gray";
      ctx.fill();
      ctx.closePath();

      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("START", canvas.width/2, canvas.height/2.2)
      ctx.fillText("Enter", canvas.width/2, canvas.height/1.8)
    }

    function gameOver() {
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();

      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("THE END", canvas.width/2, canvas.height/2.2)
      ctx.fillText("enter", canvas.width/2, canvas.height/1.8)
      over = 1;
      junckFoodNumber = 0;
    }

    function gameComplete() {
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Next Level", canvas.width/2, canvas.height/2.3)
      ctx.fillText(score, canvas.width/2, canvas.height/1.9);
      ctx.fillText("Enter", canvas.width/2, canvas.height/1.6)
    }

    function eat_mainFood() {
      if (new Date() - eatTime > 250) { //먹었는지 2.5초 지나가면
        eat = 0; //먹었는지 초기화
      }
    }

    function gaming() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScore();
      drawMainFood();
      drawJunckFood();
      drawSmile();
      drawGuage();
      moveSmile();
      colli_mainFood();
      colli_junckFood();
      eat_mainFood();
    }

    function draw() {
      if (start === 0) {
        gameStart()
      }
      else if (eatMainFoodNumber === mainFoodNumber) {
        gameComplete();
      }
      else if (gameGauge <= 0) {
        gameOver();
      }
      else {
        gaming();
      }
    }


    let requestId;
    function render() {
      draw();
      requestId = requestAnimationFrame(render)
    }

    render();

    return() => { cancelAnimationFrame(requestId) }

  }, []);

  return (
    <canvas ref={ canvasRef }></canvas>
  );
}

export default Game;
