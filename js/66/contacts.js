function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

const contactsTable = getElement('#contactsTable tbody');
const addContactForm = getElement('#addContact');
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactButton = getElement('#add');
let contacts = [];

function hideAddContactForm() {
  setCss(addContactForm, 'display', 'none');
  addContactForm.reset();
  setCss(addContactButton, 'visibility', 'visible');
}

  function addContact(contact){
    const newRow = contactsTable.insertRow();

    newRow.innerHTML = `
    <td>${contact.first}</td>
    <td>${contact.last}</td>
    <td>${contact.email}</td>
    <td>${contact.phone}</td>
    <td><button>delete</button></td>
  `;
  contacts.push(contact);

    newRow.querySelector('button').addEventListener('click', () => {
    newRow.remove();

    contacts = contacts.filter(c => c !== contact);
        if (!contacts.length) {
      contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
    }
  });
}

on(addContactForm, 'submit', e => {
  e.preventDefault();

  if (!contacts.length) {
    contactsTable.innerHTML = '';
  }

  const newContact = {
    first: firstInput.value,
    last: lastInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  };


  addContact(newContact);
  hideAddContactForm();
});

click(addContactButton, () => {
  setCss(addContactForm, 'display', 'block');
  setCss(addContactButton, 'visibility', 'hidden');
});

click(getElement('#cancel'), hideAddContactForm);

fetch('contacts.json')
  .then(response => response.json()) 
  .then(data => {
    contactsTable.innerHTML = '';

    data.forEach(element => {
      
  
      addContact(element);
    });
  });