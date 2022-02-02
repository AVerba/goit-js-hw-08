import throttle from 'lodash.throttle';

const formMessageRef = document.querySelector('.feedback-form'),
      inputEl = document.querySelector('.feedback-form input'),
      commentEl = document.querySelector('.feedback-form textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';

const fomrSubmitHandler =(e)=>{
    e.preventDefault();
    const enteredData =new FormData (e.currentTarget);
    enteredData.forEach((value, name)=>{
        console.log(`${name}: ${value}`);
    })
    e.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    
}
const formInputHandler=()=>{
    const enteredFormData = {
        email: inputEl.value,
        message: commentEl.value,
      };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(enteredFormData));   
}

function showPreviosDataForm() {
    const messageObj = localStorage.getItem(LOCALSTORAGE_KEY)
    const message = JSON.parse(messageObj);
    if(message) {
        inputEl.value = message.email || '';
        commentEl.value = message.message || '';
    }
};


formMessageRef.addEventListener('submit',fomrSubmitHandler);
formMessageRef.addEventListener('input', throttle(formInputHandler, 500));

showPreviosDataForm();

