//import { Book, Logger as DamageLogger, Author, Librarian } from './interfaces';
import * as Interfaces from './interfaces';

class UniversityLibrarian implements Interfaces.Librarian {
    constructor(public name: string, public email: string, public department: string){}
    assistCustomer(custName: string){
        console.log(this.name + ' is assisting ' + custName);
    }
}

abstract class ReferenceItem {
    private _publisher: string;
    static department: string = 'Research';

    constructor(public title: string, protected year: number) {
        console.log('Creating new ReferenceItem');
    }
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}.`);
        console.log(ReferenceItem.department);//dostupno preko klase a ne instance
    }
    get publisher(): string {
        return this._publisher.toUpperCase();
    }
    set publisher(value: string){
        this._publisher = value;
    }

    abstract printCitation(): void;
}

export { UniversityLibrarian, ReferenceItem};