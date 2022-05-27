import { useRef, useEffect } from 'react';

function Game({ setPage, setScore, name }) {

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

    var junkFoodNumber = 0;
    var junkFoodSize = width * 30 / 480;
    var junkFoods = [];

    var dx, dy;
    var standardWidth = 580;
    var standardSpeed = 5;
    var rate = width / standardWidth;

    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;

    var smileSize = width * 20 / 480;
    var eat;
    var eatMainFoodNumber = 0;
    var eatTime = new Date();
    var eatJunkTime = new Date();

    var gameGauge;
    var gameGaugeSize = canvas.height/10;

    var start = 0;
    var over = 0;
    var stage = 0;

    var score = 0;
    
    document.addEventListener("keydown", keyDownHandler, false);

    function setup(speed) {
      dx = (standardSpeed + speed) * rate
      dy = (standardSpeed + speed) * rate

      eatMainFoodNumber = 0;
      gameGauge = 100;
      for (var i = 0; i < mainFoodNumber; i++) {
        var x = getRandomInt(canvas.width * 0.1, canvas.width * 0.9);
        var y = getRandomInt(canvas.height/8, canvas.height * 0.9);
        mainFoods[i] = { x : x, y : y, status : 1};
      }
      for (var i = 0; i < junkFoodNumber; i++) {
        var x = getRandomInt(canvas.width * 0.1, canvas.width * 0.9);
        var y = getRandomInt(canvas.height/8, canvas.height * 0.9);
        junkFoods[i] = { x : x, y : y, status : 1};
      }

    }

    function stageSet() {
      if (stage >= 3) {
        junkFoodNumber = Math.floor(stage * 1.5 );
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
              junkFoodNumber = 0;
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
          eatTime = new Date();
          eatMainFoodNumber += 1;
          mainFoods[i].status = 0;
          changeGauge(+30)
          score += 1;
          if (gameGauge >= 100) {
            gameGauge = 100;
          }
        }
      }
    }

    function colli_junkFood() {
      for (var i = 0; i < junkFoodNumber; i++) {
        var fx = junkFoods[i].x + junkFoodSize/2; //figure x (jucnk food x)
        var fy = junkFoods[i].y + junkFoodSize/2;
        var is = Math.sqrt(Math.pow(x - fx, 2) + Math.pow(y - fy, 2));
        if (is <= junkFoodSize/4 + smileSize && junkFoods[i].status === 1) {
          eat = -1;
          eatJunkTime = new Date();
          junkFoods[i].status = 0;
          changeGauge(-30);
        }
      }
    }

    function drawMainFood() {
      for ( var i = 0; i < mainFoodNumber; i ++) {
        if (mainFoods[i].status === 1) {
          var mainFoodX = mainFoods[i].x;
          var mainFoodY = mainFoods[i].y;
          ctx.drawImage(document.getElementById("donut"),
                        mainFoodX, mainFoodY, mainFoodSize, mainFoodSize);
          // ctx.beginPath();
          // ctx.arc(mainFoodX + mainFoodSize/2 , mainFoodY + mainFoodSize/2, mainFoodSize/2, 0, Math.PI * 2, true); // head
          // ctx.stroke();
        }
      }
    }

    function drawjunkFood() {
      for ( var i = 0; i < junkFoodNumber; i ++) {
        if (junkFoods[i].status === 1) {
          var junkFoodX = junkFoods[i].x;
          var junkFoodY = junkFoods[i].y;
          ctx.drawImage(document.getElementById("vegetable"),
                        junkFoodX, junkFoodY, junkFoodSize, junkFoodSize);
          // ctx.beginPath();
          // ctx.arc(junkFoodX + junkFoodSize/2, junkFoodY + junkFoodSize/2, junkFoodSize/2, 0, Math.PI * 2, true); // head
          // ctx.stroke();
        }
      }
    }

    function drawSmile() {
      ctx.save();

      ctx.beginPath();

      ctx.moveTo(x - smileSize/2 + smileSize/4, y - smileSize/6)
      if (eat === 1) {
        ctx.drawImage(document.getElementById("me_good"),
                      x - smileSize, y - smileSize, smileSize * 2, smileSize * 2);
      }
      else if (eat === -1) {
        ctx.drawImage(document.getElementById("me_bad"),
                      x - smileSize, y - smileSize, smileSize * 2, smileSize * 2);
      } else {
        ctx.drawImage(document.getElementById("me_normal"),
                      x - smileSize, y - smileSize, smileSize * 2, smileSize * 2);
      }


      ctx.restore();
    }

    function drawGauge() {
      ctx.save();
      // ctx.beginPath();
      // for (var i = 0; i < gameGauge; i++) {
      //   ctx.fillStyle = 'rgb(255,' + Math.floor(2.55 * i) + ', 0)';
      //   ctx.fillRect(i * canvas.width/100, 0, canvas.width/100, gameGaugeSize);
      // }
      // ctx.restore();

      var grd = ctx.createLinearGradient(0, 0, 500, 0);
      grd.addColorStop(0, "#AA96DA");
      grd.addColorStop(1, "#FCBAD3");

      ctx.fillStyle = grd
      ctx.fillRect(0, 0, canvas.width, gameGaugeSize)

      ctx.fillStyle = "#A8D8EA"
      ctx.fillRect(gameGauge * canvas.width/100, 0, canvas.width, gameGaugeSize)

      ctx.beginPath();
      ctx.moveTo(0, gameGaugeSize);
      ctx.lineTo(width, gameGaugeSize)
      ctx.strokeStyle = "#FFFFD2"
      ctx.lineWidth = '5'
      ctx.stroke()

      ctx.restore();
    }

    function changeGauge(change) {
      if (!change) return gameGauge -= 0.3;

      gameGauge += change
      if (gameGauge < 0 ) gameGauge = 0;
    }

    function drawScore() {
      ctx.font = "10vw Arial";
      ctx.fillStyle = "#FFFFD2";
      ctx.textAlign = "center";
      ctx.fillText(score, canvas.width/2, canvas.height/2 + gameGaugeSize/1.38)
    }

    function gameStart() {
      ctx.save();

      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, canvas.height/3, 0, Math.PI * 2);
      ctx.fillStyle = "#FCBAD3";
      ctx.strokeStyle = "#FFFFD2";
      ctx.lineWidth = '2'
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.font = "4.5vw Arial";
      ctx.fillStyle = "#FFFFD2";
      ctx.textAlign = "center";
      ctx.fillText("Hi, " + name + "!", canvas.width/2, canvas.height/2.3)
      ctx.fillText("START", canvas.width/2, canvas.height/1.8)
      ctx.fillText("enter", canvas.width/2, canvas.height/1.5)
      
      ctx.restore();
    }

    function gameOver() {
      ctx.save();

      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, canvas.height/3, 0, Math.PI * 2);
      ctx.fillStyle = "#AA96DA";
      ctx.strokeStyle = "#FFFFD2";
      ctx.lineWidth = '2'
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.font = "4.5vw Arial";
      ctx.fillStyle = "#FFFFD2";
      ctx.textAlign = "center";
      ctx.fillText("THE END", canvas.width/2, canvas.height/2.3)
      ctx.fillText("Your score: " + score, canvas.width/2, canvas.height/1.8)
      ctx.fillText("enter", canvas.width/2, canvas.height/1.5)
      over = 1;

      ctx.restore();
    }

    function gameComplete() {
      ctx.save();

      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, canvas.height/3, 0, Math.PI * 2);
      ctx.fillStyle = "#FCBAD3";
      ctx.strokeStyle = "#FFFFD2";
      ctx.lineWidth = '2'
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      ctx.font = "4.5vw Arial";
      ctx.fillStyle = "#FFFFD2";
      ctx.textAlign = "center";
      ctx.fillText("Next Level", canvas.width/2, canvas.height/2.3)
      ctx.fillText("Your score: "+ score, canvas.width/2, canvas.height/1.8);
      ctx.fillText("Enter", canvas.width/2, canvas.height/1.5)

      ctx.restore();
    }

    function eatSomething() {
      if (eat === 1 && new Date() - eatTime > 250) { //먹었는지 2.5초 지나가면
        eat = 0; //먹었는지 초기화
      }

      if (eat === -1 &&new Date() - eatJunkTime > 250) {
        eat = 0;
      }
    }

    function drawing() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScore();
      drawMainFood();
      drawjunkFood();
      drawSmile();
      drawGauge();
    }

    function moving() {
      moveSmile();
      changeGauge();
      eatSomething();
      colli_mainFood();
      colli_junkFood();
    }

    let requestId;
    function render() {
      if (start === 0) {
        gameStart()
      }
      else if (eatMainFoodNumber === mainFoodNumber) {
        drawing();
        gameComplete();
      }
      else if (gameGauge <= 0) {
        drawing();
        gameOver();
      }
      else {
        drawing();
        moving();
      }
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
