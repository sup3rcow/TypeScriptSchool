"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CalculateLateFee(daysLate) {
    return daysLate * 0.25;
}
exports.CalculateLateFee = CalculateLateFee;
function MaxBookAllowed(age) {
    if (age < 12) {
        return 3;
    }
    else {
        return 10;
    }
}
exports.MaxBookAllowed = MaxBookAllowed;
function privateFunc() {
    console.log('This is private...');
}
function Purge(inventory) {
    //return inventory.slice(2, inventory.length);
    return inventory;
}
exports.Purge = Purge;
//# sourceMappingURL=utilityfunctions.js.map