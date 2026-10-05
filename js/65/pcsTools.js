function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function getCss(element, property) {
  // return element.style[property];
  return getComputedStyle(element)[property];
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

function hide(element){
  element.style.display = 'none';
}

function show(element){
  element.style.display = 'inline-block';
}

function sparkle(element, time, speed){

    let interval;

    interval = setInterval(() => {

        element.style.color = getRandomColor(); 
        element.style.backgroundColor = getRandomColor();

    }, speed);

    setTimeout(() => {
        clearInterval(interval);
    }, time);


function getRandomColor(){
    const r = getColorPart();
    const g = getColorPart();
    const b = getColorPart();
    return `rgb(${r}, ${g}, ${b}) `;
}

function getColorPart(){
    return Math.floor(Math.random() * 256);
}}
/*
const pcsTools = {
  getElement,
  /*setCss,
  getCss,* /
  css: function (element, property, value) {
    console.log(arguments);

    if (arguments.length < 3) {
      return getCss(element, property);
    } else {
      setCss(element, property, value);
    }
  },
  on,
  click
};

export default pcsTools;
*/

export default function (selector) {
  const element = getElement(selector);

  return {
    css: function (property, value) {
      console.log(arguments);

      if (arguments.length < 2) {
        return getCss(element, property);
      } else {
        setCss(element, property, value);
      }
    },
    on: (eventType, callback) => on(element, eventType, callback),
    click: callback => click(element, callback),
     hide: () => hide(element),
    show: () => show(element),
    sparkle: (time, speed) => sparkle(element, time, speed),
  text: function(string){
return text(element, string);

  },
  addClass: classType => addClass(element, classType),

  };
}

function text(element, string){
 if(string === undefined){
  return element.innerHTML;
 }
 else{
  element.innerHTML = string;
 }
}

function addClass(element, class1){
element.classList.add(class1);

}