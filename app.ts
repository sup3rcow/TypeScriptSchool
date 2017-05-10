/// <reference path="lodash.d.ts" />


import { Category} from './enums';
import { Book, DamageLogger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, ReferenceItem } from './classes';

import { CalculateLateFee as CalcFee, MaxBookAllowed, Purge} from './lib/utilityfunctions';

//import default exporta
import refBook from './encyclopedia';
import Shelf from './shelf';

import * as _ from 'lodash';//ovo je malo drugacije, jer importas kroz rederencce path?

function GetAllBooks(): Book[] {
    let books: Book[] = [
        {id: 1, title: 'Ulysses1', author:'James mr', available: true, category: Category.Fiction},
        {id: 2, title: 'Ulysses2', author:'James jr', available: false, category: Category.Fiction},
        {id: 3, title: 'Ulysses3', author:'James ms', available: true, category: Category.Poetry},
        {id: 4, title: 'Ulysses4', author:'James js', available: true, category: Category.Fiction}
    ];
    return books;
}

function LogFirstAvailable(books = GetAllBooks()): void{
    let numberOfBooks: number = books.length;
    let firstAvailable: string = '';    
    for(let currentBook of books){
        if(currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log('Total Books: ' + numberOfBooks);
    console.log('First Available: ' + firstAvailable);
}

//enum Category {Biography, Poetry, Fiction, History, Children}

function getBookTitlesByyCategory(categoryFilter: Category = Category.Fiction, books): Array<string> {
    console.log('Traže se knjige kategorije: ' + categoryFilter + ':' + Category[categoryFilter]);
    let filteredTitles: Array<string> = [];
    for(let currentBook of books){
            if(currentBook.category === categoryFilter) {
                filteredTitles.push(currentBook.title);
            }
    }
    return filteredTitles;
}

function LogBookTitles(): void{
    const allBooks = GetAllBooks();
    const fictionBooks: Array<string> = getBookTitlesByyCategory(Category.Fiction, allBooks);
    // for(let title of fictionBooks){
    //     console.log('Knjiga for: ' + title);
    //}
    fictionBooks.forEach(title => { console.log('Knjiga foreach: ' + title)});   
}

function GetBookById(id: number): Book {
    const allBooks: Book[] = GetAllBooks();
    return allBooks.filter((book) => book.id === id && 1===1)[0];//[0] posto se ocekuje da funkcija nadje samo jednu knjigu po id-u, odmah izvuces
    //jedinog clana iz array-a i imas objekt book koji je inace annonymus jer jos nismo dosli do klasa sa učenjem
}

function CreateCustommerID(name: string, id: number): string {
    return name + id;
}

function CreateCustomer(name: string, age?: number, city?: string){
    console.log('Creating customer ' + name);
    if(age) {
        console.log('Age: ' + age);
    }
    if(city) {
        console.log('City: ' + city);
    }
    console.log('\n');
}

function CheckoutBooks(customer: string, ...bookIDs: number[]): Array<string>{
    console.log('Checking out books for ' + customer);
    let booksCheckedOut: string[] = [];
    for(let bookID of bookIDs) {
        let book = GetBookById(bookID);
        if(book.available){
            booksCheckedOut.push(book.title);
        }
    }
    return booksCheckedOut;
}

function GetTitles(author: string): string[];//prvo definiras function overload
function GetTitles(available: boolean): string[];//prvo definiras function overload
function GetTitles(bookProperty: any): string[] {//sa if-ovima glumi function overload
    const allBooks = GetAllBooks();
    const foundTitles: string[] = [];

    if(typeof bookProperty === 'string'){
        for(let book of allBooks){
            if(book.author === bookProperty){
                foundTitles.push(book.title);
            }
        }
    }
    else if(typeof bookProperty === 'boolean'){
        for(let book of allBooks){
            if(book.available === bookProperty){
                foundTitles.push(book.title);
            }
        }
    }
    return foundTitles;
}

function PrintBook (book: Book): void{
    console.log(book.title + ' by ' + book.author);
}


//********************************************************************************//
//const allBooks = GetAllBooks();
//LogFirstAvailable(allBooks);

//LogBookTitles();

//const fictionBooks: Array<string> = getBookTitlesByyCategory(Category.Fiction, allBooks);
//fictionBooks.forEach((val, idx, arr) => console.log(arr[idx] + ' === ' + ++idx + ' - ' + val));
/*value, index, array --ulazni paramtri
stim da idx nije id od array-a, nego je to ko neki brojač koliko puta se proslo kroz foreach*/

// var idKnjige: number = 4;
// var bookById = GetBookById(idKnjige);
// console.log('Knjiga po Id-u' + idKnjige + ' je: ' + bookById.title);

// let x:number;
// x=5;



/////////
// let IdGenerator: (chars: string, nums: number) => string;//definicija funkcije
// //IdGenerator = CreateCustommerID;
// //ili
// IdGenerator = (x,y) => y+x;

// let myID: string = CreateCustommerID('daniel', 10);
// let myID2: string = IdGenerator('daniel', 15);
// console.log(myID);
// console.log(myID2);
////////////////

// CreateCustomer('Joey');
// CreateCustomer('Ross', 12);
// CreateCustomer('Hee', 17, 'New York');

//LogFirstAvailable();

// let myBooks: string[] = CheckoutBooks('Pere', 1,3,4);
// myBooks.forEach(book => console.log(book));

// let hemansBooks = GetTitles('James jr');
// hemansBooks.forEach(title => console.log(title));
// let availableBooks = GetTitles(false);
// availableBooks.forEach(title => console.log(title));

// let myBook: Book = {
//     id:5,
//     title: 'Peta knjiga',
//     author:'Petko',
//     available: true,
//     category: Category.Fiction,
//     pages: 250,
//     markDemaged: (reason: string) => console.log('Demaged: ' + reason)
// };
// var logDamage: DamageLogger;
// logDamage = (damage: string) => console.log('Demage reported: ' + damage);
// logDamage('coffee staints');
// PrintBook(myBook);
// myBook.markDemaged('torn pages');

// let favoriteLibratian: Librarian = new UniversityLibrarian('Sharon','emailAdresa','LA');
// favoriteLibratian.name = 'Sharon je na GO, zamjena je Steve';
// favoriteLibratian.assistCustomer('korisnik Pero');

// var ref: ReferenceItem = new ReferenceItem('Facts and Figures', 2017);
// ref.printItem();
// ref.publisher = 'Random data publishing';//preko setera
// console.log(ref.publisher);//preko getera

// let refBook = new Encyclopedia('zz',1,2);//vise ne ovako jer si Enyclopedia importao kroz refBook
//let referenceBook = new refBook('zz',1,2);
// refBook.printItem();
//refBook.year;//nije dostupno jer jer u base klasi protected

//ovo se zove class expression
//blesavi nacin koristenja klase, ne das joj ime nego je spremis u varijablu
//i dalje koristis ko ime da joj to ime..
// let NewsPaper = class extends ReferenceItem{
//     printCitation(){
//         //implementacija abstraktne metode
//     }
// }
// let myPaper = new NewsPaper('fadfsd',1);


//klasa extenda annonymus object {title: string}
// class Novel extends class {title: string} {
//     mainCharacter: string;
// }

//generics
// let genericsItem = Purge([1,2,3,4,5,6,7,8,'9ewe',true]);//funkcija makne prva dva elementa iz arraya
// genericsItem.forEach(item => console.log(item));

//genrics array
// let inventory: Array<Book> = [
//     {id:11,title:'title book10',author:'unknown autor11',available:true,category:Category.Fiction},
//     {id:12,title:'title book14',author:'unknown autor12',available:true,category:Category.Fiction}
//     ];
// let bookShelf: Shelf<Book> = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));//cool!!!
// console.log(bookShelf.getById(1).title);


//lodash
// let snakeCaseTitle = _.snakeCase('Teskt za testiranje');
// console.log(snakeCaseTitle);    //teskt_za_testiranje