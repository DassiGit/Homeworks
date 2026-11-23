const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');

const SNAKE_SIZE = 64;

function sizeCanvas() {
    theCanvas.width = window.innerWidth - (window.innerWidth % SNAKE_SIZE);
    theCanvas.height = window.innerHeight - (window.innerHeight % SNAKE_SIZE);
}

sizeCanvas();

const snakeHead = document.createElement('img');
snakeHead.src = 'snakeHead.png';

// GAME VARIABLES

let snake = [
    { x: SNAKE_SIZE * 3, y: SNAKE_SIZE * 3 }
];

let direction = 'ArrowRight';
let score = 0;
let speed = 500;
let gameOver = false;
let gameInterval;


let apple = {};

function newApple() {
    const columns = theCanvas.width / SNAKE_SIZE;
    const rows = theCanvas.height / SNAKE_SIZE;

    let newX;
    let newY;
    let onSnake;

    do {
        newX = Math.floor(Math.random() * columns) * SNAKE_SIZE;
        newY = Math.floor(Math.random() * rows) * SNAKE_SIZE;

        onSnake = snake.some(segment =>
            segment.x === newX && segment.y === newY
        );

    } while (onSnake);

    apple = { x: newX, y: newY };
}



let audioContext;

function playSound(frequency, duration) {
    if (!audioContext) {
        audioContext = new AudioContext();
    }

    audioContext.resume();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.frequency.value = frequency;
    gain.gain.value = 0.1;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

function drawGame() {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    // Draw apple
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(
        apple.x + 32,
        apple.y + 34,
        22,
        0,
        Math.PI * 2
    );
    context.fill();

    // Apple stem
    context.fillStyle = 'brown';
    context.fillRect(apple.x + 31, apple.y + 7, 5, 12);

    // Apple leaf
    context.fillStyle = 'green';
    context.beginPath();
    context.ellipse(apple.x + 42, apple.y + 12, 8, 4, -0.5, 0, Math.PI * 2);
    context.fill();

   for (let i = 0; i < snake.length; i++) {
    context.drawImage(
        snakeHead,
        snake[i].x,
        snake[i].y
    );
}
    // Draw score
    context.fillStyle = 'green';
    context.font = '32px Cursive';

    const scoreText = `Score: ${score}`;
    const metrics = context.measureText(scoreText);

    context.fillText(
        scoreText,
        theCanvas.width - metrics.width - 10,
        36
    );
}



function endGame() {
    gameOver = true;
    clearInterval(gameInterval);

    playSound(150, 0.5);

    context.fillStyle = 'black';
    context.font = '48px Arial';
    context.textAlign = 'center';

    context.fillText(
        'GAME OVER!',
        theCanvas.width / 2,
        theCanvas.height / 2
    );
}



function moveSnake() {
    if (gameOver) return;

    const head = { ...snake[0] };

    switch (direction) {
        case 'ArrowUp':
            head.y -= SNAKE_SIZE;
            break;

        case 'ArrowDown':
            head.y += SNAKE_SIZE;
            break;

        case 'ArrowLeft':
            head.x -= SNAKE_SIZE;
            break;

        case 'ArrowRight':
            head.x += SNAKE_SIZE;
            break;
    }

    // Check wall collision
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= theCanvas.width ||
        head.y >= theCanvas.height
    ) {
        endGame();
        return;
    }

    const ateApple =
        head.x === apple.x && head.y === apple.y;

    const bodyToCheck = ateApple
        ? snake
        : snake.slice(0, -1);

    const hitSelf = bodyToCheck.some(segment =>
        segment.x === head.x && segment.y === head.y
    );

    if (hitSelf) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (ateApple) {
        score++;
        playSound(700, 0.15);

        newApple();

        // Make game faster
        speed = Math.max(100, speed - 30);

        clearInterval(gameInterval);
        gameInterval = setInterval(moveSnake, speed);

    } else {
        snake.pop();
    }

    drawGame();
}


window.addEventListener('keydown', e => {

    const oppositeDirections = {
        ArrowUp: 'ArrowDown',
        ArrowDown: 'ArrowUp',
        ArrowLeft: 'ArrowRight',
        ArrowRight: 'ArrowLeft'
    };

    if (oppositeDirections[e.key]) {
        e.preventDefault();

        if (e.key !== oppositeDirections[direction]) {
            direction = e.key;
        }
    }
});



snakeHead.onload = () => {
    newApple();
    drawGame();

    gameInterval = setInterval(moveSnake, speed);
};