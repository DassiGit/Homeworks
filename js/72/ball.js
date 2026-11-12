const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');
theCanvas.width = window.innerWidth;
theCanvas.height= window.innerHeight;

const balls = [];

function createBall (){
const color = document.querySelector('#color').value;
const radi = document.querySelector('#size');
const radius =  Number(radi.value);

const ball = {
 x: radius + 1,
  y : radius + 1,
 dx: 1,
dy: 2,
radius: radius,
color: color
};
balls.push(ball);
}


setInterval(() => {
context.clearRect(0,0, theCanvas.width, theCanvas.height);


balls.forEach(ball =>{
context.beginPath();
context.fillStyle = ball.color;
ball.x+= ball.dx;
ball.y+= ball.dy;
if (ball.x < (ball.radius + 1) || ball.x >= window.innerWidth - (ball.radius +1)){
 ball.dx = -ball.dx;
}
if (ball.y < (ball.radius + 1) || ball.y >= window.innerHeight - (ball.radius + 1)){
 ball.dy = -ball.dy;
}


context.arc(ball.x, ball.y, ball.radius, 0,  Math.PI * 2);

context.fill();
});
}, 1);


document.querySelector('#button').addEventListener(
    'click', () =>{
        createBall();
    }
);
