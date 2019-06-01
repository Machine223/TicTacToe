## TIC TAC TOE Unbeatable AI

### I developed a web game with JavaScript .
I used an algorithm that allows the AIPlayer to always win the game or at least make lose the human player. This algorithm is based on recursion in mathematics and allows the AI to choose each time the best move option to beat the opponent.

You did not believe me, so try it maybe you could win!

#### Game Modele base on https://www.freecodecamp.com
1. Bassic Setup
2. Determine Winner
3. Implementation of Ai and Winner notification
4. Minimax Algorithm logic (hard part)


### 4. Minimax function composition description
A Minimax algorithm can be best defined as 
a recursive function that does the following things:

1. Return a value if a terminal state is found (+10, 0, -10)
2. Go through available spots on the board
3. Call the minimax function on each available spot (recursion)
4. Evaluate returning values from function calls
5. And return the best value

![alt text](https://github.com/Machine223/TicTacToe/blob/master/minimaxAlgo.png)

![alt text](https://github.com/Machine223/TicTacToe/blob/master/WinOnly.PNG)
![alt text](https://github.com/Machine223/TicTacToe/blob/master/LoseOnly.PNG)
