import { UniversityLibrarian } from './classes';

//UniversityLibrarian kalsa, mora biti exportana sa keywrdom export a ne na dnu classes.ts fajla

//kako bi mogao mergati UniversityLibrarian klasu, moras deklarirati module istog naziva iz kog je i originala klasa UniversityLibrarian
//i unutar modula deklariras interfjes UniversityLibrarian sa dodatnim propertijima, metodama..
declare module './classes' {
    interface UniversityLibrarian {//ovaj interfejs ce se mergati sa definicijom klase UniversityLibrarian
        phone: string;
        hostSeminar(topic: string): void;
    }
}

UniversityLibrarian.prototype.hostSeminar = function (topic) {
    console.log('Hosting a seminar on ' + topic);
}

