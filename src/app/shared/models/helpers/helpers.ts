export function generateRandomBetween(min: number, max: number, exclude?: number): number {
    let ranNum = Math.floor(Math.random() * (max - min)) + min;

    if (exclude && ranNum === exclude) {
        ranNum = generateRandomBetween(min, max, exclude);
    }

    return ranNum;  
} 
