import { UniversityLibrarian } from './classes';

//kako bi mogao mergati UniversityLibrarian klasu, moras deklarirati module isti iz kog je i klasa UniversityLibrarian
//i unutar modula deklariras interfjes UniversityLibrarian sa dodatnim propertijima, metodama..
declare module './classes' {
    interface UniversityLibrarian {
        phone: string;
        hostSeminar(topic: string): void;
    }
}

UniversityLibrarian.prototype.hostSeminar = function (topic) {
    console.log('Hosting a seminar on ' + topic);
}