// Game Modele base on https://www.freecodecamp.com
// 1. Bassic Setup
// 2. Determine Winner
// 3. Implementation of Ai and Winner notification
// 4. Minimax Algorithm logic (hard part)


// 4. Minimax function composition description (fonction recurssive)
/* A Minimax algorithm can be best defined as 
a recursive function that does the following things:

1. Return a value if a terminal state is found (+10, 0, -10)
2. Go through available spots on the board
3. Call the minimax function on each available spot (recursion)
4. Evaluate returning values from function calls
5. And return the best value
*/

var origBoard;          // Variable pour la grille
const huPlayer = 'O';   // Player 1
const aiPlayer = 'X';   // Player 2
const winCombos = [     // tous les combos possible pour gagne
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

// les cellules seront selectionner avec la variable reference cells
const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
    // on vient s'assurer d'enlever l'affichage de fin du jeu
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys()); // pour creer un tableau de 9 elements pour avoir des cles de 0-9
    for(var i =0 ; i < cells.length; i++){   // Reset le jeu avant de commencer 
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false); // on place un listener pour gerer les evenements de click
    }
}

// fonction pour detecter les click et declancher l'evenement
function turnClick(square){
    // console.log(square.target.id); // pour afficher le numero de la case
    if (typeof origBoard[square.target.id] == 'number'){
        turn(square.target.id, huPlayer); // la fonction pour faire apparaitre le symbole du joueur
        if (!checkTie()) turn(bestSpot(),aiPlayer);
    }
}

// la fonction pour faire apparaitre le symbole du joueur
function turn(squareId, player){
    origBoard[squareId] = player; // on associe la case au joueur
    document.getElementById(squareId).innerText = player; // on affiche sur la case le symbole du joueur
    let gameWon = checkWin(origBoard, player);
    if (gameWon) // si la game est remporte par un jouer alors gameOver 
        gameOver(gameWon)
}

//**************************************************/
// On va verifier avec toute les combo si le jouer a une des combinaisons
// inputs : board and player
// outputs:  return gameWon if player win
// plays represente toutes les actions faites par le joueur
//**************************************************/
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

// va nous permettre darreter le jeu si le joueur gagne
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "Vous avez gagné!" : "Vous avez perdu!")
}

// affichage du message pour le gagnant, le perdant ou match nul.
function declareWinner(message){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = message;
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}
// AiPlayer sous forme de selection par defaut
function bestSpot(){
    return emptySquares()[0]; // joue sur le prochain espace libre
}
function checkTie(){
    if (emptySquares().length == 0) {
        for(var i = 0 ; i< cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click',turnClick,false); 
        }
        declareWinner("Match nul!");
        return true;
    }
    return false;
}
