let currentplayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

const turnindicator = document.querySelector('.turn-indicator span');
const marks = document.querySelectorAll('.mark');
const restartButton = document.getElementById('restartButton');
const gamecontainer = document.querySelector('.game-container');
const difficultySelect = document.getElementById('difficulty');

marks.forEach((mark, index) => {
    mark.addEventListener('click', () => handleMove(index));
});

restartButton.addEventListener('click', restartgame);
difficultySelect.addEventListener('change', resetGame); 

function handleMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentplayer;
        marks[index].textContent = currentplayer;
        marks[index].style.color = currentplayer === 'X' ? 'black' : 'white';

        checkwinner();

        if (gameActive && difficultySelect.value === 'Computer') { 
            switchplayer();
            setTimeout(computerMove, 1000);
        } else {
            switchplayer(); 
        }
    }
}

function switchplayer() {
    currentplayer = currentplayer === 'O' ? 'X' : 'O';
    turnindicator.textContent = `${currentplayer} Turn`;
}

function computerMove() {
    if (gameActive) {
        let moveMade = false;

        
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameBoard[a] === 'O' && gameBoard[b] === 'O' && gameBoard[c] === '') {
                gameBoard[c] = 'O'; 
                marks[c].textContent = 'O';
                marks[c].style.color = 'white';
                moveMade = true;
                break;
            }
            if (gameBoard[a] === 'O' && gameBoard[c] === 'O' && gameBoard[b] === '') {
                gameBoard[b] = 'O'; 
                marks[b].textContent = 'O';
                marks[b].style.color = 'white';
                moveMade = true;
                break;
            }
            if (gameBoard[b] === 'O' && gameBoard[c] === 'O' && gameBoard[a] === '') {
                gameBoard[a] = 'O'; 
                marks[a].textContent = 'O';
                marks[a].style.color = 'white';
                moveMade = true;
                break;
            }
        }

        
        if (!moveMade) {
            for (let i = 0; i < winningCombinations.length; i++) {
                const [a, b, c] = winningCombinations[i];
                if (gameBoard[a] === 'X' && gameBoard[b] === 'X' && gameBoard[c] === '') {
                    gameBoard[c] = 'O'; 
                    marks[c].textContent = 'O';
                    marks[c].style.color = 'white';
                    moveMade = true;
                    break;
                }
                if (gameBoard[a] === 'X' && gameBoard[c] === 'X' && gameBoard[b] === '') {
                    gameBoard[b] = 'O'; // Block
                    marks[b].textContent = 'O';
                    marks[b].style.color = 'white';
                    moveMade = true;
                    break;
                }
                if (gameBoard[b] === 'X' && gameBoard[c] === 'X' && gameBoard[a] === '') {
                    gameBoard[a] = 'O'; // Block
                    marks[a].textContent = 'O';
                    marks[a].style.color = 'white';
                    moveMade = true;
                    break;
                }
            }
        }

       
        if (!moveMade) {
            let emptyCells = gameBoard.map((value, index) => value === '' ? index : null).filter(index => index !== null);
            if (emptyCells.length > 0) {
                const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                gameBoard[randomIndex] = 'O';
                marks[randomIndex].textContent = 'O';
                marks[randomIndex].style.color = 'white';
            }
        }

        checkwinner();
        if (gameActive) {
            switchplayer();
        }
    }
}


function checkwinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            displayWinner(currentplayer);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        showDrawMessage();
        gameActive = false;
    }
}

function displayWinner(winner) {
    clearMessages();

    const winnerMessage = document.createElement('div');
    winnerMessage.classList.add('popup-message');

    const winnerSymbol = document.createElement('div');
    winnerSymbol.classList.add('winner-symbol');
    winnerSymbol.textContent = winner;
    winnerSymbol.style.color = winner === 'X' ? 'black' : 'white';

    const winnerText = document.createElement('div');
    winnerText.classList.add('winner-text');
    winnerText.textContent = 'WINNER!';

    winnerMessage.appendChild(winnerSymbol);
    winnerMessage.appendChild(winnerText);
    document.body.appendChild(winnerMessage);

    hideGameElements();
}

function showDrawMessage() {
    clearMessages();

    const drawMessage = document.createElement('div');
    drawMessage.classList.add('popup-message');

    const drawSymbol = document.createElement('div');
    drawSymbol.classList.add('draw-symbol');
    drawSymbol.textContent = 'X O';
    drawSymbol.style.color = 'black';

    const drawText = document.createElement('div');
    drawText.classList.add('draw-text');
    drawText.textContent = "It's a Draw!";

    drawMessage.appendChild(drawSymbol);
    drawMessage.appendChild(drawText);
    document.body.appendChild(drawMessage);

    hideGameElements();
}

function hideGameElements() {
    const gridLines = document.querySelectorAll('.grid-line');
    gridLines.forEach(line => line.style.visibility = 'hidden');

    marks.forEach(mark => mark.style.visibility = 'hidden');
    turnindicator.style.visibility = 'hidden';
}

function restartgame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    marks.forEach(mark => {
        mark.textContent = '';
        mark.style.visibility = 'visible';
    });
    currentplayer = 'X';
    gameActive = true;
    turnindicator.textContent = `${currentplayer} Turn`;
    turnindicator.style.visibility = 'visible';
    clearMessages();
    const gridLines = document.querySelectorAll('.grid-line');
    gridLines.forEach(line => line.style.visibility = 'visible');
}

function clearMessages() {
    const popupmessage = document.querySelector('.popup-message');
    if (popupmessage) {
        popupmessage.remove();
    }
}

function resetGame() {
    restartgame(); 
}
