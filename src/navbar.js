import Component from './component.js';
import Navbutton from './navbutton.js';

import './navbar.css';

/*
 * [Event name: params]
 * none
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.brand = root.querySelector('.brand');
        // this.navbutton = Array.apply(null, root.querySelectorAll(".navbutton"));
        this.mode = 0;
        this.buttons = [];
        const els = root.querySelectorAll(Navbutton.getRootClass());

        for (let i=0 ;i<els.length; i++) {
            const btn = new Navbutton(els[i], i);
            btn.on('click', this.handleBtnClick.bind(this));
            
            this.buttons.push(btn);
        }
        
        this.reset();
    }
    
    handleBtnClick(firer, idx){
        
        for(let btn of this.buttons){
            if(btn!==this.buttons[idx]){
                btn.cancelColor();
            }
        }
        
        if(idx!==this.mode){
            this.mode = idx;
            this.reset();
            console.log('mode: ',this.mode);
            this.fire('changeMode',this.mode);
        }
    }


    reset() {
        // do nothing
        this.buttons[this.mode].setColor();
        for(let btn of this.buttons){
            // console.log('this.buttons.indexOf(btn):',this.buttons.indexOf(btn),', mode: ', this.mode);
            if(this.buttons.indexOf(btn) !== this.mode){
                btn.addHover();
            }
            else{
                btn.unHover();
            }
        }
    }
}
