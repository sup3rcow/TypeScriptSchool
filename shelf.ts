import { Book } from './interfaces';

export default class Shelf<T extends Book> {//constraints !!!!!!!!!!
    private _items: Array<T> = new Array<T>();

    add(item: T): void {
        this._items.push(item);
    }
    getFirst(): T{
        return this._items[0];
    }
    getById(id: number): T {
        return this._items[id];
    }
}