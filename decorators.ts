
//class decorator, prepoznas jer prima 1 parametar, koje je Function object, 
//i return type je void, sto znaci da konstruktor nece biti zamjenjen sa dekoratorom.. primjer kada ce biti zamjenjen pogledaj pod:
//seal oznacava isto kao i u C#.. jednom seal-ana metoda, se ne moze override-ati


function sealed(name: string) {

    return function (target: Function): void {
        console.log(`Sealing only 'Object.seal(target);'. ${name}`);
        Object.seal(target);
        //Object.seal(target.prototype);//ako seal-am prototype, onda nemozes raditi 'Declaration Merging'--kao partial classes u c#
    }
}

function logger<TFunction extends Function>(target: TFunction): TFunction {
    let newConstructor: Function = function() {
        console.log(`Creating new instance.`);
        console.log(target);
    }
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;
    return <TFunction>newConstructor;
}

export {sealed , logger};