import {ReferenceItem} from './classes';

export default class Encyclopedia extends ReferenceItem {
    constructor(title: string, year: number, public edition: number){
        super(title, year);
    }
    printItem(): void {
        super.printItem();//prinatas iz super kalse
        console.log(`Pritanje iz scublase ${this.edition}, ${this.year}`)
    }
    printCitation(){
        //iplementacija abstaktne metode
    }
}