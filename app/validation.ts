let notValid: string = ' is not a valid input!';
let range = {
    min: 3,
    max: 12
};

export const isInt = (n: number) => {
    let isValid: boolean = false;
    if (n == Math.round(n)) {
        isValid = true;
    }
    return isValid;
};

export const inRange = (n: number, min: number, max: number) => {
    let isValid: boolean = false;
    if (n >= min && n <= max) {
        isValid = true;
    }
    return isValid;
};



export const validInput = (n) => {
    let isValid: boolean = false;
    if (isInt(n) == true && inRange(n, range.min, range.max) == true) {
        isValid = true;
    } else {
        console.warn(n + notValid)
    }
    return isValid;
    
};
