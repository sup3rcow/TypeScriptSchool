import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, ReferenceItem, Employee, Researcher, PublicLibrarian, CLASS_INFO } from './classes';
import * as util from './lib/utilityFunctions';
import './LibrarianExtension';//tu ti se nalazi deklaration merging UniversityLibrarian klase


function PrintBookInfo(item: Book): void {
    console.log(`${item.title} was authored by ${item.author}`);
}
function LogFavoriteBooks([book1, book2, ...others]: Book[]){
    PrintBookInfo(book1);//1.knjiga
    PrintBookInfo(book2);//2.knjiga
    others.forEach(book => PrintBookInfo(book));//ostale knjige
}

//DESTRUCT
//destruct ARRAY
//prvi nacin
let [book1, book2] = util.GetAllBooks();
/*
PrintBookInfo(book1);
PrintBookInfo(book2);
//drugi nacin
LogFavoriteBooks(util.GetAllBooks());

//destruct OBJECT
//prvi nacin, nazivi varijabla isti kao nazivi u objektu
let {title, author} = book1;
console.log(`${title} - ${author}`);
//drugi nacin, nazivi varijabla nisu isti kao nazivi propertija u objektu
let {title: bookTitle, author: bookAuthor} = book1;
console.log(`${bookTitle} - ${bookAuthor}`);
*/

/*
//SPRED OPERATOR
let schoolBooks: Book[] = [
    {id:10, title:'The Great Gatsby1', author: 'A. Scott Fitzgerald', available:true, category: Category.Fiction},
    {id:11, title:'The Great Gatsby2', author: 'B. Scott Fitzgerald', available:true, category: Category.Fiction},
    {id:12, title:'The Great Gatsby3', author: 'C. Scott Fitzgerald', available:true, category: Category.Fiction}
];
let bookRead: Book[] = util.GetAllBooks();
bookRead.push(...schoolBooks);//rest parametar, spread
//console.log(bookRead);

let poets: string[] = ['Shelly', 'Collin', 'Hughes'];
let authors: string[] = ['Tolstoy', 'Fitzgerald', ...poets];//spread poets array u authors array
console.log(authors);//[ 'Tolstoy', 'Fitzgerald', 'Shelly', 'Collin', 'Hughes' ]
*/

/*
//TUPLE TYPES
//1. nacin
let catalogLocation: [string, Book] = ['A 123.456', book1];
catalogLocation[2] = 'neki string';//moze pridruziti samo string ili Book
//console.log(catalogLocation);
//2. nacin
interface KeyValuePair<K, V> extends Array<K | V> {//array sadrzi tipove K ili V, interface takodjer definira da mora sadrzati K ili V
    0: K;
    1: V;
};
let catalogLocationNew: KeyValuePair<string, Book> = ['A 123.456', book1];
catalogLocationNew[2] = 'some string';
console.log(catalogLocationNew);//dobijes isto kao i u 1. nacinu, samo sto si tu koristio interface
*/

/*
//Combining types
let allBooks = util.GetAllBooks();
let allMagazines: Magazine[] = util.GetAllMagazines();
let readingMaterial: Magazine | Book = allMagazines[0];
function PrintTitle(item: Magazine | Book){
    console.log(item.title);//title je zajednicki property obadva tipa podatka
}
PrintTitle(readingMaterial);
//treci objekt kao kombinacija dva objekta
let serialNovel: Book & Magazine = { 
    id: 100,                          //property od Book
    title: 'opa bato',                //zajednicki property od Book i Magazine
    author: 'neki baja',              //property od Book
    available:true,                   //property od Book
    category: Category.Fiction,       //property od Book
    publisher: 'pero iz donje dubrave'//property od Magazine
}
*/

/*
//Mixins, ovo je primjer kako se implementira mixins
function applyMixins(derivedCtor: any, baseCtors: any[]){
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
applyMixins(UniversityLibrarian, [Employee, Researcher]);

let newLibrarian = new UniversityLibrarian();

//vidis da je gore navedena funkcija applyMixins, pridruzila implementaacija funkcija derived klasi iz base klasa
newLibrarian.doResearch('Economics');
*/

/*
//String Literal Types and type aliases
let frequency: 'monthly' | 'annually' = 'annually'

type Frequency = 'monthly' | 'annually';

function GetMagazineByFrequency(preferredFrequeny: Frequency) {
    //do something
}

type PrintMaterial = Book | Magazine;
type Serial = Book & Magazine;

//primjena string literal-a na primjer od gore: Combining types
let serialNovel: Serial = { 
    id: 100,                          //property od Book
    title: 'opa bato',                //zajednicki property od Book i Magazine
    author: 'neki baja',              //property od Book
    available:true,                   //property od Book
    category: Category.Fiction,       //property od Book
    publisher: 'pero iz donje dubrave'//property od Magazine
}
let firstreadingMaterial: PrintMaterial = util.GetAllMagazines()[0];
*/

/*
//Polymorphic this type, omogucava ulancavanje metoda, koje za rezultat daje čitljiviji kood
//sto se postize ako metoda vrati objekt nad kojim je pozvana metoda, odnosno return this
class LibraryBook {
    Checkout(): this {
        console.log('Checking out a book.\n');
        return this;
    }
    Checkin(): this {
        //console.log('Checking in a book.');
        if (this instanceof ChildrensBook) {
            console.log('Checking in a ChildrensBook.');
        }
        if (this instanceof ElectronicBook) {
            console.log('Checking in a ElectronicBook.');
        }
        return this;      
    }
}

class ChildrensBook extends LibraryBook {
    Clean(): this{
        console.log('Cleaning a book.');
        return this;
    }
}

class ElectronicBook extends LibraryBook {
    RemoveFromCustomerDevice(): this {
        console.log('Removing book from device.');
        return this;
    }
}
//primjer 1
let kidbook = new ChildrensBook();
kidbook.Checkin()//primjer ulancavanja vise metoda iz base i derive klase
    .Clean()
    .Checkout();
//primjer 2
let ebook = new ElectronicBook();
ebook.Checkin().RemoveFromCustomerDevice().Checkout();
*/


/*
//Declaration merging, napravio si LibrarianExtension.ts, gdje si definirao Declaration Merging za kalsu UniversityLibrarian
let mergedBook: Book = book1;
mergedBook.publisher = 'neki publisher';

//primjer extendanja postotjecih modula sa novim clanovima,npr postojeci classes.ts fajl extendas sa novim LibrarianExtension.ts fajlom
//ako hoces da ti radi ovo, za sad ovo važi:
//klasu UniversityLibrarian iz classes.ts moraš exportati sa keywordom export, a ne na dnu fajla sa svim ostalim exportima, neznam zasto!!!
let newLibrarian = new UniversityLibrarian();
newLibrarian.hostSeminar('learn module augnebtation');
newLibrarian.name = 'pero';
newLibrarian.assistCustomer('marko');
*/

/*
//typeof type guards
//tipovi koji se mogu provjeravati su samo: string, number, boolean, symobl
function logVisitor(param: number | string) {
    if(typeof param === 'number'){console.log(`${param} new visitors arrived.`)}
    else {console.log(`${param.toUpperCase()} is our new visitor.`)}
}
logVisitor(5);
logVisitor('Pero');

//instanceof type guards
//u classes si pripremio 2 kalse koje implementiraju interfejs Librarian
let lib: Librarian = new PublicLibrarian();
if (lib instanceof UniversityLibrarian) {
    lib.assistFaculty();//kompajler prepozna lib kao UniversityLibrarian, hoveraj na lib da se uvjeris
}
if (lib instanceof PublicLibrarian) {
    lib.teachCommunity();//kompajler prepozna lib kao PublicLibrarian, hoveraj na lib da se uvjeris
}

//custom type guards
//kosristis kad ne mozes korsititi, typeof ili instanceof
function isBook(text: Book | Magazine): text is Book {
    return (<Book>text).author !== undefined;//author properti postoji samo u intefrejsu Book a ne i u Magazine
}
class MyMagazine implements Magazine {
    title: string;
    publisher: string;
}
let readItem: Book | Magazine = new MyMagazine();
readItem.publisher = 'pero photo copy';
if(isBook(readItem)){console.log(`it's a book. ${readItem.author}`);} 
if(!isBook(readItem)){console.log(`it's a magazine. ${readItem.publisher}`);} 
*/

/*
//experimenting with Symbols
//Symbols are new primitive data type
//symbols are unique and immutable, jednom kad ga kreiras ne moze se mijenjati
//priprema.. u tsconfig.json si prebacio compilerOptions:target:es5 -> ES2015, valja jer es5 ne podrzava symbols..
//nesto prica kako browseri prelaze na ES2015 pa ce podrzavati symbols..
let mySymbol = Symbol('first_symbol');
let anotherSymbol = Symbol('first_symbol');
//console.log(mySymbol === anotherSymbol);//false
//console.log(typeof mySymbol);//symbol
let myObject = {
    [mySymbol]: 'value for my symbol key.'
}
console.log(myObject[mySymbol]);//value for my symbol key.

let librarian = new UniversityLibrarian();
librarian[CLASS_INFO]();//ovako pozivas metodu kreiranu sa symbols

let libraryCustomer = {//napravis objekt koji sadrzi dva propertija, a u UniversityLibrarian klasi si sa symbols overridao metodu instanceof
    name: 'Pero',
    assistCustomer: (customer: string) => console.log(customer)
}
//u launcher.json si morao dodati --harmony-instanceof, jer koristis Symbol.hasInstance

//i sada ce se ispisati da je custom kreirani obajekt instanca od klase librarian LOL
if(libraryCustomer instanceof UniversityLibrarian) {
    console.log('it is librarian');
} else {
    console.log('not a librarian');
}
*/


//Decorators --POGLEDAJ OPET COURSE: advaced typesript\decorators

//kako bi ih koristio.. u tsconfig.json si dodao "experimentalDecorators": true

//class decorators
let lib1 = new UniversityLibrarian();

//class decorators with return constructor
let lib2 = new PublicLibrarian();

//property decorators
