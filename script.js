(function(){
    Player = function (name,move) {
        return {name,move};
    };

    const gameBoard = {
        player1_turn: true,
        player1: Player('player1', 'O'),
        player2: Player('player2', 'X'),
        gameBoard: [0, 0, 0,
                    0, 0, 0,
                    0, 0, 0],
        printGame: function() {
            let index=0;
            let indexee = index+3;
            for (let row = 1; row<=3; row++){
                let rowString = '';                
                for(index; index<indexee; index++){
                    rowString += this.gameBoard[index];
                }
                indexee += 3;
                console.log(rowString);
            }
        },
        promptMove: function(){
            
            let move = prompt('your move');
            if (this.player1_turn) {
                this.gameBoard[move] = this.player1.move;
                this.player1_turn = false;
            }else{
                this.gameBoard[move] = this.player2.move;
                this.player1_turn = true;
            }
            this.printGame();
            if (this.gameBoard.includes(0)) this.promptMove();
        },
        checkGame: function(){
            
        }

    }
    gameBoard.printGame();
    gameBoard.promptMove();
})();


