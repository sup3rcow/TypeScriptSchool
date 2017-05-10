export function CalculateLateFee(daysLate: number): number {
    return daysLate * 0.25;
}

export function MaxBookAllowed(age: number): number {
    if (age < 12) {
        return 3;
    } else {
        return 10;
    }
}

function privateFunc(): void {
    console.log('This is private...');
}

export function Purge<T>(inventory: Array<T>): Array<T> {
    //return inventory.slice(2, inventory.length);
    return inventory
}