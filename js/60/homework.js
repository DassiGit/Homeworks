'use strict';

function medDosage(m, d){
    let med = m;
    let dose = d;
     if(d < 1){
            throw new Error('Invalid Entry');
        }
    return{
    getMed(){
        return med;
    },
    setMed(m){
         med = m;
    },
    getDose(){
        return dose;
    },
    setDose(d){
       
            dose = d;
    }, 
     print(){
        console.log(`The current medication is ${m}, the current dose is ${d} mg`);
    }
    };
}
const pat1 = medDosage('amox', 500 );
pat1.print();
//pat1.m = foo;
//pat1.med = foo;

//const pat2 = medDosage('penicillin', 0);
//pat2.print();


/////////////////
function trackDosage(medName, InitDos){
    let dosage = InitDos;
    let medtn = medName;

    function getInstructions(){
            return (`${dosage} mg of ${medtn}`);
                  
    };

    function adjustDosage(pin, newDos){
        let p = 9940;
        if( pin === p && newDos > 0){
                  dosage = newDos;
        }
        else{
            console.log('Caught in the act!!');
        }
    };
    return {
    getInstructions,
    adjustDosage
};
}

const pat3 = trackDosage('Aspirin', 50);
console.log(pat3.medName);

console.log(pat3.getInstructions());

pat3.adjustDosage(9940, 75);
console.log(pat3.getInstructions());

pat3.adjustDosage(1234, 100);
console.log(pat3.getInstructions());

pat3.adjustDosage(9940, 0);
console.log(pat3.getInstructions());