import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';
export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }
    
    
    constructor(root) {
        super(root);
        
        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('changeMode', this.handleChangeMode.bind(this))
        this.deck = new Deck(root.querySelector('.deck'), 3);
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());
        // this.board.on('counting',this.handleCounting.bind(this));
        // this.board.on('timesUp',this.handleTimesUp.bind(this));
        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClick.bind(this));
        this.ModeToNumCard = [3,6,6];
        this.mode = 0;
        this.timer = null;
        this.time = 5;
    }

    handleCounting(firer,){
        this.reset.root.style.display = 'none';
        if(!this.timer){
            this.board.showTimeCounting(this.time.toString());

            this.timer = setInterval(() => {
                this.time--;
                this.board.showTimeCounting(this.time.toString());
                if(this.time === 0){
                    this.TimesUp();
                }
                let flash = setTimeout(() => {
                    this.root.style.backgroundColor = this.deck.gameOver?this.deck.getPickedColor():"#ffffff";
                }, 25);
                let flashMask = setTimeout( ()=>{
                    // this.root.style.backgroundColor = "#232323";
                    this.root.style.backgroundColor = this.deck.gameOver?this.deck.getPickedColor():"#232323";
                }, 50);

            }, "1000")
        }
    }

    TimesUp(){
        this.reset.showPlayAgain()
        this.deck.DecktimesUp();
        this.board.showTimesUpMessage();
        this.root.style.backgroundColor = this.deck.getPickedColor();
        this.timerReset();
    }
    timerReset(){
        this.board.timeDisplay.textContent = ""
        clearInterval(this.timer);
        this.timer = null;
        this.time = 5;
    }
    // handleTimesUp(firer,){
    //     // this.reset.root.style.display = 'block';
    //     this.reset.showPlayAgain();
    // }
    handleChangeMode(firer, mode){
        // this.deck.reset(this.ModeToNumCard[mode]);
        this.mode = mode;
        this.reset.showPlayAgain();
        this.deck.reset(this.ModeToNumCard[this.mode]);
        this.board.reset(this.deck.getPickedColor());
        this.root.style.backgroundColor = "#232323";
        if(this.mode === 2) this.handleCounting();
        else this.timerReset();
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.timerReset();
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
        this.reset.root.style.display = 'block';
    }

    handleResetClick(firer) {
        this.root.style.backgroundColor = "#232323";

        this.deck.reset(this.ModeToNumCard[this.mode]);
        this.board.reset(this.deck.getPickedColor());
        firer.reset();
        if(this.mode === 2) this.handleCounting();

    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
