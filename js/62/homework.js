let clicks = 2;

function createButton(){
    const newButton = document.createElement('button');
       document.querySelector('#div').appendChild(newButton);
       newButton.textContent = clicks;
       clicks++;
       let firstCLick = false;
       newButton.addEventListener('click', () =>
    {
        if(!firstCLick){
            firstCLick = true;
            createButton();
        }
    });

}
document.querySelector('#button').
addEventListener('click',  createButton);