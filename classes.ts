import * as Interfaces from './interfaces';
import { sealed, logger, readonly, writable } from './decorators';

class Employee {
    title: string;

    addToSchedule(): void{
        console.log('Employee added to schedule.');
    }

    logTitle(): void{
        console.log(`Employee has the title ${this.title}`);
    }
}

class Researcher {
    doResearch(topic: string): void {
        console.log(`Doing research on ${topic}.`);
    }
}

const CLASS_INFO = Symbol();//pises velikim slovim kako bi znao da je to konstanta

//Mixins, Declaration Merging
@logger
@sealed('UniversityLibrarian !!!')
export class UniversityLibrarian implements Interfaces.Librarian, Employee, Researcher {
    
    name: string;
    email: string;
    department: string;
    
    //pisanje metoda koriseci symbols, ali ovaj nacin garantira da ce moetoda biti unique ?! 
    [CLASS_INFO](): void {
        console.log('This class represents a UniversityLibrarian.');
    }

    //sa ovim overridas provjeru instanceof
    static [Symbol.hasInstance](obj: Object) {
        return obj.hasOwnProperty('name') && obj.hasOwnProperty('assistCustomer');//metoda mora vratiti boolean
    }

    //@readonly//svi potrebni parametri za ovaj dekorator se automatski prododaju
    assistCustomer(custName: string) {
        console.log(this.name + ' is assisting ' + custName);
    }

    @writable(true)
    assistFaculty() {
        console.log('Assisting faculty.');
    }

    //klasa moze extendati samo jednu base klasu, ali moze implementirati vise interfejsa od jednom, posto si naveo da zelis implemetirati
    //klase Employee, Researcher(da to nisu interfejsi, ali kompajler gleda na njih kao da su interfejsi),moras samonavesti metode i propertije
    //koje vec postoje u tim klasama:
    //ps. tamo gdje ces koristiti UniversityLibrarian klasu, ces kopirati implementacije iz klasa Employee, Researcher!!!!
    title: string;
    addToSchedule: () => void;
    logTitle: () => void;
    doResearch: (x: string) => void;
}
@logger
class PublicLibrarian implements Interfaces.Librarian{
    name: string;
    email: string;
    department: string;

    assistCustomer(custName: string){
        console.log('Assisting customer.');
    }
    @writable(false)
    teachCommunity(){
        console.log('Teaching community.');
    }
}



abstract class ReferenceItem {
    
    private _publisher: string;
    static department: string = 'Research';

    constructor(public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
    }
    
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}.`);
        console.log(`Department: ${ReferenceItem.department}`);
    }
    
    get publisher(): string {
        return this._publisher.toUpperCase();
    }
    
    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }
    
    abstract printCitation(): void;
}

export { /*UniversityLibrarian,*/ ReferenceItem, Employee, Researcher, PublicLibrarian, CLASS_INFO };