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
        this.board.on('counting',this.handleCounting.bind(this));
        this.board.on('timesUp',this.handleTimesUp.bind(this));
        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClick.bind(this));
        this.ModeToNumCard = [3,6,6];
        this.mode = 0;
    }

    handleCounting(firer,){
        
    }

    handleTimesUp(firer,){

    }
    handleChangeMode(firer, mode){
        // this.deck.reset(this.ModeToNumCard[mode]);
        this.mode = mode;
        this.deck.reset(this.ModeToNumCard[this.mode]);
        this.board.reset(this.deck.getPickedColor());
        this.root.style.backgroundColor = "#232323";
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleResetClick(firer) {
        this.root.style.backgroundColor = "#232323";

        this.deck.reset(this.ModeToNumCard[this.mode]);
        this.board.reset(this.deck.getPickedColor());
        firer.reset();
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
