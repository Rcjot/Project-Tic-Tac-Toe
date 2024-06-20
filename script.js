(function(){
    Player = function (name,move) {
        return {name,move};
    };

    const gameBoard = {
        player1_turn: true,
        player1: Player('player1', 'O'),
        player2: Player('player2', 'X'),
        gameEnd: false,
        mybutton: document.querySelectorAll('.square'),
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
        restart: function(){
            this.player1_turn = true;
            this.gameBoard = [0, 0, 0,
                              0, 0, 0,
                              0, 0, 0];
            this.gameEnd = false;
            this.renderMove();
            for (let button of this.mybutton) {
                button.disabled = false;
            }
        },
        init: function(){
            this.buttonEvent();
        },
        buttonEvent: function(){
            for (let button of this.mybutton) {
                button.addEventListener('click', () => {
                    // console.log(button.textContent);
                    this.renderMove(button);
                    this.appendMove(button.textContent);
                    button.disabled = true;
                })
            }
            const restartBtn = document.querySelector('.restart');
            restartBtn.addEventListener('click', () => this.restart());
        },
        renderMove: function (button){
            if (button === undefined){
                for (let button of this.mybutton) button.setAttribute('style', 'background-color: white');
            }else {
                if (this.player1_turn) {
                    button.setAttribute('style', 'background-color: blue');
                }else{
                    button.setAttribute('style', 'background-color: black');
                }
            }

        },
        appendMove: function(move){
            if (this.player1_turn) {
                this.gameBoard[move] = this.player1.move;
                this.player1_turn = false;
            }else{
                this.gameBoard[move] = this.player2.move;
                this.player1_turn = true;
            }
            this.printGame();
            this.gameFlow();
        },
        gameFlow: function(){
            this.gameEnd = this.checkGameEnd();
            if (this.gameEnd) {
                for (let button of this.mybutton) {
                    button.disabled = true;
                }
                const playAgaindiv = document.querySelector('.playAgain');
                const playAgainBtn = document.createElement('button');
                playAgaindiv.appendChild(playAgainBtn);
                playAgainBtn.textContent = 'Play again';
                playAgainBtn.addEventListener('click', () => {
                    this.restart();
                    playAgainBtn.remove();
                });
            }
        },
        checkGameEnd: function(){
            if (this.checkRows() || this.checkColumns() || this.checkDiagonals()){
                if(this.player1_turn) {
                    console.log(this.player2.name + ' won!');
                }else{
                    console.log(this.player1.name + ' won!');
                }
                return true;
            } else if (!this.gameBoard.includes(0)){
                console.log('Draw!!');
                return true;
            }
        },
        checkRows: function(){
            for (let rowIndex = 0; rowIndex<9; rowIndex+=3){
                if (this.gameBoard[rowIndex] != 0 
                    && this.gameBoard[rowIndex] === this.gameBoard[rowIndex+1] 
                    && this.gameBoard[rowIndex+1] === this.gameBoard[rowIndex+2]) return true;
            }
        },
        checkColumns: function(){
            for (let columnIndex = 0; columnIndex<3; columnIndex++){
                if (this.gameBoard[columnIndex] != 0 
                    && this.gameBoard[columnIndex] == this.gameBoard[columnIndex+3]
                    && this.gameBoard[columnIndex+3] == this.gameBoard[columnIndex+6]) return true;
            }
        },
        checkDiagonals: function(){
            if(this.gameBoard[0] != 0 
                && this.gameBoard[0] === this.gameBoard[4] 
                && this.gameBoard[4] == this.gameBoard[8]) return true;
            if(this.gameBoard[2] != 0 
                && this.gameBoard[2] == this.gameBoard[4]
                && this.gameBoard[4] == this.gameBoard[6]) return true;
        },  
    }
    gameBoard.init();

})();


