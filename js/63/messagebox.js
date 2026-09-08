const height = 170;
const width = 240;
let topoffset = -height / 2;
let leftoffset = -width / 2;

let nextzIndex = 1;

export default function(msg, optButn, callback ){
    console.log(msg);

    const div = document.createElement('div');
    const msgDiv = document.createElement('div');
    msgDiv.innerText = msg;
    msgDiv.style.overflow = 'auto';
    msgDiv.style.height = '6.5em'; 
    div.appendChild(msgDiv);

            div.style.backgroundColor = 'aqua';
            div.style.border = '1px solid black';
            div.style.padding = '1em';
            div.style.boxSizing = 'border-box';
            div.style.height = `${height}px`;
            div.style.width = `${width}px`;


            div.style.position = 'absolute';
            div.style.top = '50%';
            div.style.left = '50%';
            div.style.marginTop = `${topoffset}px`;
            div.style.marginLeft = `${leftoffset}px`;

            const buttonDiv = document.createElement('div');
            buttonDiv.style.position = 'absolute';
            buttonDiv.style.width = '100%';
            buttonDiv.style.bottom = '1em';
            buttonDiv.style.textAlign = 'center';
            buttonDiv.style.left = '0';
            div.appendChild(buttonDiv);


    document.body.appendChild(div);

    topoffset += 10;
    leftoffset += 10;

    if(topoffset + height + (window.innerHeight / 2) > window.innerHeight){
        topoffset -= window.innerHeight - height;
    }
        if(leftoffset + width + (window.innerWidth / 2) > window.innerWidth){
        leftoffset -= window.innerWidth - width;
    }


    div.addEventListener('click', () =>{
        div.style.zIndex = nextzIndex++;
})

if (optButn) {
    optButn.forEach(buttonText => {
        const btn = document.createElement('button');
        btn.innerText = buttonText;

        btn.addEventListener('click', () => {
            div.remove();

            if(callback){
                callback(buttonText);
            }
        });

        buttonDiv.appendChild(btn);
    });
} else {
    const okButton = document.createElement('button');
    okButton.innerText = 'OK';

    okButton.addEventListener('click', () => {
        div.remove();
    });

    buttonDiv.appendChild(okButton);
}
}

