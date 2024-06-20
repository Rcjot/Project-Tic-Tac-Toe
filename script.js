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
        declaration: null,
        playAgainBtn: null,
        gameBoard: [0, 0, 0,
                    0, 0, 0,
                    0, 0, 0],

        init: function(){
            this.buttonEvent();
        },
        buttonEvent: function(){
            for (let button of this.mybutton) {
                button.addEventListener('click', () => {
                    this.renderMove(button);
                    this.appendMove(button.id);
                    button.disabled = true;
                })
            }
            const restartBtn = document.querySelector('.restart');
            restartBtn.addEventListener('click', () => this.restart());
            this.customizePlayer();
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
            this.playAgainBtn.remove();
            this.declaration.remove();
        },
        endGameDOMCreate: function(result) {
            const playAgaindiv = document.querySelector('.playAgain');
            this.declaration = document.createElement('div');
            this.playAgainBtn = document.createElement('button');
            playAgaindiv.appendChild(this.declaration);
            playAgaindiv.appendChild(this.playAgainBtn);
            this.playAgainBtn.textContent = 'Play again';
            this.playAgainBtn.addEventListener('click', () => this.restart());
            if (result === 'won') {
                this.declaration.textContent =(this.player1_turn) ? this.player2.name + ' won!': this.player1.name + ' won!';
            }else if (result === 'draw'){
                this.declaration.textContent = "it's a draw!";
            }          
        },
        renderMove: function (button){
            if (button === undefined){
                for (let button of this.mybutton) button.textContent = '';
            }else {
                if (this.player1_turn) {
                    (this.player1.move.length === 1) ? (button.textContent = this.player1.move) : (button.style.backgroundImage = this.player1.move);                  
                }else{
                    (this.player2.move.length === 1) ? (button.textContent = this.player2.move) : (button.style.backgroundImage = this.player2.move);
                    
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
            this.gameFlow();
        },
        gameFlow: function(){
            let result = this.checkGameEnd();
            if (this.gameEnd) {
                for (let button of this.mybutton) {
                    button.disabled = true;
                }
                this.endGameDOMCreate(result);
            }
        },
        checkGameEnd: function(){
            if (this.checkRows() || this.checkColumns() || this.checkDiagonals()){
                this.gameEnd = true;
                return 'won';
            } else if (!this.gameBoard.includes(0)){
                console.log('Draw!!');
                this.gameEnd = true;
                return 'draw';
            }
        },
        checkRows: function(){ // what the heck is some every function, these checks can be shortened??
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
        customizePlayer: function(){
            const customizeBtn = document.querySelector('.customize');
            customizeBtn.addEventListener('click', () => {
                let p1move = "url(images/aya.webp)";
                let p2move = "url(images/yukina.webp)";
                this.player1 = Player('aya', p1move);
                this.player2 = Player('yukina', p2move);
                this.restart();
            });
        }
    }

    gameBoard.init();

})();


