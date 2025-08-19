// Tetris Game JavaScript Code

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(30, 30);

let makeMatrix = (w, h) => {
    const matrix = [];
    while (h--) {
        matrix.push(Array(w).fill(0));
    }
    return matrix;
};

let makePiece = (type) => {
    if (type === 't') {
        return [
            [0, 5, 0],
            [5, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'o') {
        return [
            [6, 6],
            [6, 6],
        ];
    } else if (type === 'l') {
        return [
            [0, 7, 0],
            [0, 7, 0],
            [0, 7, 7],
        ];
    } else if (type === 'j') {
        return [
            [0, 8, 0],
            [0, 8, 0],
            [8, 8, 0],
        ];
    } else if (type === 'i') {
        return [
            [0, 9, 0, 0],
            [0, 9, 0, 0],
            [0, 9, 0, 0],
            [0, 9, 0, 0],
        ];
    } else if (type === 's') {
        return [
            [0, 10, 10],
            [10, 10, 0],
            [0, 0, 0],
        ];
    } else if (type === 'z') {
        return [
            [11, 11, 0],
            [0, 11, 11],
            [0, 0, 0],
        ];
    }
};

let drawMatrix = (matrix, offset) => {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
};

let draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMatrix(player.matrix, player.pos);
};

let update = () => {
    draw();
    // Additional game logic goes here
};

let colors = [
    null,
    'cyan', // I
    'blue', // J
    'orange', // L
    'yellow', // O
    'green', // S
    'purple', // T
    'red', // Z
];

let playerReset = () => {
    player.matrix = makePiece('t');
    player.pos.y = 0;
    player.pos.x = (Math.floor(Math.random() * (canvas.width / 30)) - 1);
};

let player = {
    pos: { x: 0, y: 0 },
    matrix: null,
};

playerReset();
setInterval(update, 1000 / 2); // Update the game at 2 frames per second