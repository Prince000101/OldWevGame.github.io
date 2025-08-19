// Space Shooter Game JavaScript

// Set up the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let spaceship;
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

// Load images
const spaceshipImg = new Image();
spaceshipImg.src = 'assets/images/space.png';

// Spaceship class
class Spaceship {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = 5;
    }

    draw() {
        ctx.drawImage(spaceshipImg, this.x, this.y, this.width, this.height);
    }

    move(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x -= this.speed;
        } else if (direction === 'right' && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
    }
}

// Bullet class
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 20;
        this.speed = 7;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y -= this.speed;
    }
}

// Enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += 2; // Move downwards
    }
}

// Initialize game
function init() {
    spaceship = new Spaceship();
    spawnEnemies();
    gameLoop();
}

// Spawn enemies
function spawnEnemies() {
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * (canvas.width - 50);
        enemies.push(new Enemy(x, -50));
    }
}

// Game loop
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spaceship.draw();

    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw();
        if (enemy.y > canvas.height) {
            gameOver = true;
        }
    });

    checkCollisions();
    requestAnimationFrame(gameLoop);
}

// Check collisions
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score++;
            }
        });
    });
}

// Handle key events
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        spaceship.move('left');
    } else if (e.key === 'ArrowRight') {
        spaceship.move('right');
    } else if (e.key === ' ') {
        bullets.push(new Bullet(spaceship.x + spaceship.width / 2 - 2.5, spaceship.y));
    }
});

// Start the game
init();