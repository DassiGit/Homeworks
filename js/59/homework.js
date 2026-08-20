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