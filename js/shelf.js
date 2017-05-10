"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shelf = (function () {
    function Shelf() {
        this._items = new Array();
    }
    Shelf.prototype.add = function (item) {
        this._items.push(item);
    };
    Shelf.prototype.getFirst = function () {
        return this._items[0];
    };
    Shelf.prototype.getById = function (id) {
        return this._items[id];
    };
    return Shelf;
}());
exports.default = Shelf;
//# sourceMappingURL=shelf.js.map