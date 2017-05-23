"use strict";
//class decorator, prepoznas jer prima 1 parametar, koje je Function object, 
//i return type je void, sto znaci da konstruktor nece biti zamjenjen sa dekoratorom.. primjer kada ce biti zamjenjen pogledaj pod:
//seal oznacava isto kao i u C#.. jednom seal-ana metoda, se ne moze override-ati
Object.defineProperty(exports, "__esModule", { value: true });
function sealed(name) {
    return function (target) {
        console.log(`Sealing only 'Object.seal(target);'. ${name}`);
        Object.seal(target);
        //Object.seal(target.prototype);//ako seal-am prototype, onda nemozes raditi 'Declaration Merging'--kao partial classes u c#
    };
}
exports.sealed = sealed;
function logger(target) {
    let newConstructor = function () {
        console.log(`Creating new instance.`);
        console.log(target);
    };
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;
    return newConstructor;
}
exports.logger = logger;
function readonly(target, propertyKey, descriptor) {
    console.log(`Setting ${propertyKey} to be read-only.`);
    descriptor.writable = false;
}
exports.readonly = readonly;
//slicno kao readonly
function writable(isWritable) {
    return function readonly(target, propertyKey, descriptor) {
        console.log(`Setting ${propertyKey} to writable=${isWritable}`);
        descriptor.writable = isWritable;
    };
}
exports.writable = writable;
//# sourceMappingURL=decorators.js.map