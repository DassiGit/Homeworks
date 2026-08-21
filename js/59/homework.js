'use strict';

function IMultiply(n, m){
        return m*n;
}

const ans = IMultiply(3, 4);
console.log(ans);

console.log(IMultiply(2, 7));

console.log(IMultiply(9,3));

//////
function getMultiply(){
    return IMultiply;
}

const trygM = getMultiply();
console.log(trygM(4,3));

console.log(trygM(2,8));

console.log(trygM(6,7));

//////

function getBMultiply(num){
    return function(val){
        return num * val;
    };
}

const tryBy3 = getBMultiply(3);
console.log(tryBy3(2));

const multiplyByFive = getBMultiply(5);
console.log(multiplyByFive(2));

const multiplyBySix = getBMultiply(6);
console.log(multiplyBySix(2));

//////////

const letters= ['a', 'b', 'C', 'D', 'e'];

function isEvery(array, callback){

    for(let i = 0; i < array.length; i++){
        if(!callback(array[i])){
            return false;
        }
    }
    return true;
}



console.log(isEvery(letters, function(letr){
    if(letr === letr.toUpperCase());
}));

console.log(isEvery(letters, function(letr){
    if(letr !== letr.toUpperCase());
}));

function upper(letr){
    return letr === letr.toUpperCase();
};

function lower(letr){
    return letr !== letr.toUpperCase();
};

console.log(letters.every(upper));
console.log(letters.every(lower));


/////////////

function isSome(array, callback){

    for(let i = 0; i < array.length; i++){
        if(callback(array[i])){
            return true;
        }
    }
    return false;
}

console.log(isSome(letters, function(letr){
    return letr === letr.toUpperCase();
}));

console.log(isSome(letters, function(letr){
    return letr !== letr.toUpperCase();
}));

console.log(letters.some(upper));
console.log(letters.some(lower));
