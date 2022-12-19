// import Component from './component.js';
// import Card from './card.js';

// import './deck.css';

// /*
//  * [Event name: params]
//  * wrongClick: this
//  * rightClick: this, pickedColor
//  */
// export default class Deck extends Component {
//     static getRootClass() {
//         return '.deck';
//     }

//     constructor(root, num) {
//         super(root);
//         this.numCards = num;
//         this.gameOver = false;
//         this.cards = [];
//         const els = root.querySelectorAll(Card.getRootClass());
//         for (let i = 0; i<els.length;i++) {
//             if(i<this.numCards){
//                 const card = new Card(els[i]);
//                 card.on('click', this.handleCardClick.bind(this));
//                 this.cards.push(card);
//             }
//             else{

//             }
//         }
//         this.pickedColor = this.pickColor();
//     }

//     reset() {
//         this.gameOver = false;
//         for (let i = 0;i<this.cards.length;i++)
//             this.cards[i].reset();
//         this.pickedColor = this.pickColor();
//     }

//     getPickedColor() {
//         return this.pickedColor;
//     }

//     handleCardClick(firer, color) {
//         if (this.gameOver)
//             return;

//         if (color === this.pickedColor) {
//             for (let i = 0;i<this.cards.length;i++)
//                 this.cards[i].fadeIn("#FFF");
//             this.gameOver = true;
//             this.fire('rightClick', this.pickedColor);
//         } else {
//             firer.fadeOut();
//             this.fire('wrongClick');
//         }
//     }

//     pickColor() {
//         const random = Math.floor(Math.random() * this.numCards);
//         return this.cards[random].getColor();
//     }
// }
import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root, num) {
        super(root);
        this.gameOver = false;
        this.cards = [];
        const els = root.querySelectorAll(Card.getRootClass());
        // for (let el of els) {
        //     const card = new Card(el,'hide');
        for(let i=0; i<els.length;i++){
            const card = new Card(els[i]);
            card.on('click', this.handleCardClick.bind(this));
            if(i>=num)
                card.root.style.display = 'none';
            this.cards.push(card);
        }
        // this.cards.length = num;
        // for(let card of this.cards){console.log('-')}
        this.pickedColor = this.pickColor(num);
        // this.reset(6)
    }

    reset(num) {
        for(let i=0;i<this.cards.length;i++){
            if(i<num)
                this.cards[i].root.style.display = 'block';
            else
                this.cards[i].root.style.display = 'none';
        }
        this.gameOver = false;
        for (let card of this.cards)
            card.reset();
        this.pickedColor = this.pickColor(num);
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            for (let card of this.cards)
                card.fadeIn("#FFF");
            this.gameOver = true;
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }

    pickColor(num) {
        const random = Math.floor(Math.random() * num);
        return this.cards[random].getColor();
    }
}
