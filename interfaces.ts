import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}

interface Book {//declaration merging, kompajler ce spojiti dvije deklaracije interfejsa Book u jednu
    publisher?: string;//dodao si da nebudeo obavezno ..da ti radi stari kod
    hasIndex?: boolean;//dodao si da nebudeo obavezno ..da ti radi stari kod
}

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface Magazine {
    title: string;
    publisher: string;
}

export { Book, DamageLogger as Logger, Author, Librarian, Magazine };