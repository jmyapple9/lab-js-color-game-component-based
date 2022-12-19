import Component from './component.js';

import './navbutton.css';

/*
 * [Event name: params]
 * click: this
 */
export default class Navbutton extends Component {
    static getRootClass() {
        return '.navbutton';
    }

    constructor(root, i) {
        super(root);

        root.addEventListener("click", this.handleDomClick.bind(this));
        // root.addEventListener("click", this.handleDomClick.bind(this));
        // root.addEventListener("click", this.handleDomClick.bind(this));
        this.idx = i;
        // this.reset();
    }

    // reset() {
    //     // this.resetDisplay.textContent = "New Color";
    //     this.style.cssText = this.style.cssText =`
    //         background-color: white;
    //         font-weight: 100;
    //         color: #484848;
    //     `
    // }

    cancelColor(){
        this.root.style.cssText = `
            background-color: white;
            font-weight: 100;
            color: #484848;
        `;
    }

    setColor(){
        this.root.style.cssText = `
            background-color: steelblue;
            font-weight: 700;
            color: white;
        `;
    }

    addHover(){
        this.root.classList.remove('rmHover');
        this.root.classList.add('addHover');
    }

    unHover(){
        this.root.classList.remove('addHover');
        this.root.classList.add('rmHover');
    }

    handleDomClick(e) {
        this.setColor();
        this.fire('click', this.idx);
    }
}
