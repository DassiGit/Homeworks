import showMessage from "./messagebox.js"

showMessage('it works!');

const msgInput = document.querySelector('#msg');
document.querySelector('#addMsg').addEventListener(
    'submit', (e) =>{
e.preventDefault();
showMessage(msgInput.value);
    }
);

showMessage(
    'Is this enough homework?',
    ['Yes', 'No', 'Maybe'],
    usersChoice => console.log('You picked ' + usersChoice)
);