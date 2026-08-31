'use strict';

function createAcnt(balance){
return{
    balance,
    performTransaction(num){
      this.balance = num + this.balance;
      console.log(this.balance);
        }
    };
}

const accnt1 = createAcnt(140);
const accnt2 = createAcnt(55);

accnt1.performTransaction(-13);
accnt2.performTransaction(90);

/////////////////

/*function createAcnt2(balance){
return{
    balance,
    };
}*/

function transaction(num){
        this.balance = this.balance + num;
        console.log(this.balance);
}

transaction.call(accnt1, 23);
transaction.apply(accnt2, [400]);

//////////////////
function performTransaction(num){
      this.balance = num + this.balance;
      console.log(this.balance);
}

const takeSomeMaaser = performTransaction.bind(accnt2,-20);

takeSomeMaaser();
takeSomeMaaser();