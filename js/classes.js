"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UniversityLibrarian = (function () {
    function UniversityLibrarian(name, email, department) {
        this.name = name;
        this.email = email;
        this.department = department;
    }
    UniversityLibrarian.prototype.assistCustomer = function (custName) {
        console.log(this.name + ' is assisting ' + custName);
    };
    return UniversityLibrarian;
}());
exports.UniversityLibrarian = UniversityLibrarian;
var ReferenceItem = (function () {
    function ReferenceItem(title, year) {
        this.title = title;
        this.year = year;
        console.log('Creating new ReferenceItem');
    }
    ReferenceItem.prototype.printItem = function () {
        console.log(this.title + " was published in " + this.year + ".");
        console.log(ReferenceItem.department); //dostupno preko klase a ne instance
    };
    Object.defineProperty(ReferenceItem.prototype, "publisher", {
        get: function () {
            return this._publisher.toUpperCase();
        },
        set: function (value) {
            this._publisher = value;
        },
        enumerable: true,
        configurable: true
    });
    return ReferenceItem;
}());
ReferenceItem.department = 'Research';
exports.ReferenceItem = ReferenceItem;
//# sourceMappingURL=classes.js.map