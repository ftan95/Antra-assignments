// Reduce
const array = [15, 16, 17, 18, 19];
const initialValue = 0;
const sumWithInitial = array.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
console.log(sumWithInitial);

Array.prototype.MyReduce = function (callbackFn, initial=0) {
    let result = initial;
    for (let i = 0; i < this.length; i++) {
        result = callbackFn(result, this[i]);
    }
    return result;
};

let newReduce = array.MyReduce((prev, curr) => {
    return prev + curr;
})
console.log(newReduce);  

// Filter
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);

Array.prototype.myFilter = function (callbackFn) {
    let result = []
    for (let i = 0; i < this.length; i++) {
        if (callbackFn(this[i]))
            result.push(this[i]);
    }
    return result;
}

let newFilter = words.myFilter(word => {
    if (word.length > 6)
        return true;
    else
        return false;
})
console.log(newFilter);

// Some
const someArray = [1, 2, 3, 4, 5];
const even = (element) => element % 2 === 0;
console.log(someArray.some(even));

Array.prototype.mySome = function (callbackFn) {
    for (let i = 0; i < this.length; i++) {
        if (callbackFn(this[i]))
            return true;
    }
}
console.log(someArray.mySome(even));