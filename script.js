(function(){
    Player = function (name,move) {
        let Score = 0;
        const getScore = () => Score;
        const addScore = () => Score++;
        const resetScore = () => {
            Score = 0;
        };
        return {name,move, addScore, getScore, resetScore};
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
            this.customizePlayerDlg();
            this.appendtoScoreBoard();
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
            restartBtn.addEventListener('click', () => {
                this.player1 = Player(this.player1.name, 'O');
                this.player2 = Player(this.player2.name, 'X');
                this.restart();
                this.appendtoScoreBoard();
                this.uncheckRadioBtns();
            });
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
            try{
                this.playAgainBtn.remove();
                this.declaration.remove();
            }catch{console.log('no play again btn')};
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
        endGameDOMCreate: function(result) {
            const playAgaindiv = document.querySelector('.playAgain');
            this.declaration = document.createElement('h1');
            this.playAgainBtn = document.createElement('button');
            playAgaindiv.appendChild(this.declaration);
            playAgaindiv.appendChild(this.playAgainBtn);
            this.playAgainBtn.textContent = 'Play again';
            this.playAgainBtn.addEventListener('click', () => this.restart());
            if (result === 'won') {
                this.declaration.textContent =(this.player1_turn) ? this.player2.name + ' won!': this.player1.name + ' won!';
                (this.player1_turn) ? this.player2.addScore() : this.player1.addScore();
            }else if (result === 'draw'){
                this.declaration.textContent = "it's a draw!";
            }   
            this.appendtoScoreBoard();       
        },
        renderMove: function (button){
            if (button === undefined){ // restart called block
                for (let button of this.mybutton){
                    const insideButton = button.querySelector('div');
                    insideButton.textContent = '';
                    insideButton.style.backgroundImage = 'none';
                    insideButton.style.backgroundColor = 'transparent';
                } 
            }else {
                const insideButton = button.querySelector('div');
                if (this.player1_turn) {
                    (this.player1.move.length === 1) ? (insideButton.textContent = this.player1.move) : (insideButton.style.backgroundImage = `url(images/${this.player1.move}.webp`);                  
                    insideButton.style.backgroundColor = 'rgba(82, 127, 187, 0.4)';
                }else{
                    (this.player2.move.length === 1) ? (insideButton.textContent = this.player2.move) : (insideButton.style.backgroundImage = `url(images/${this.player2.move}.webp)`); 
                    insideButton.style.backgroundColor = 'rgba(154, 205, 50, 0.4)';
                }
            }
        },
        appendMove: function(move){
            if (this.player1_turn) {
                this.gameBoard[move] = this.player1.move + '1';
                this.player1_turn = false;
            }else{
                this.gameBoard[move] = this.player2.move + '2';
                this.player1_turn = true;
            }
            this.gameFlow();
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
        customizePlayerDlg: function(){ 
            const customizeBtn = document.querySelector('.customize');
            customizeBtn.addEventListener('click', () => {
                dialog = document.querySelector('dialog');
                dialog.showModal();
                const closeBtn = document.querySelector('#dlgCloseBtn');
                closeBtn.addEventListener('click', () => dialog.close());
                const confirmBtn = document.querySelector('#confirmBtn');
                confirmBtn.addEventListener('click', () => {
                   this.setCustomizeChanges();
                   this.appendtoScoreBoard();
                })
            });
        },
        setCustomizeChanges: function(){
            const name1 = document.querySelector('#name1');
            const name2 = document.querySelector('#name2');
            try {
                const selected = document.querySelector ('input[name="choice"]:checked');
                this.player1 = Player(name1.value,selected.value);
            }catch (error) {
                console.log('error');
                this.player1 = Player(name1.value,'O');                   
            }
            try {
                const selected2 = document.querySelector('input[name="choice2"]:checked');
                this.player2 = Player(name2.value, selected2.value);
            } catch (error) {
                this.player2 = Player(name2.value, 'X');
            }
            dialog.close();
            this.restart();
        },
        uncheckRadioBtns: function(){
            const radioBtns = document.querySelectorAll('input[type="radio"]');
            // console.log(radioBtns);
             for (let i=0; i< radioBtns.length; i++){
                radioBtns[i].checked = false;
            }
        },
        appendtoScoreBoard: function(){
            const player1Image = document.querySelector('.player1Image');
            const player1Name = document.querySelector('.player1Name');
            const player1Score = document.querySelector('.player1Score');
            const player2Image = document.querySelector('.player2Image');
            const player2Name = document.querySelector('.player2Name');
            const player2Score = document.querySelector('.player2Score');
            player1Image.style.backgroundImage = `url(images/${this.player1.move}.png)`
            player2Image.style.backgroundImage = `url(images/${this.player2.move}.png)`
            player1Name.textContent = this.player1.name;
            player2Name.textContent = this.player2.name;
            player1Score.textContent = this.player1.getScore();
            player2Score.textContent = this.player2.getScore();
        }
    }    
    gameBoard.init();

})();


