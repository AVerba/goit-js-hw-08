import throttle from 'lodash.throttle';

const formMessageRef = document.querySelector('.feedback-form'),
      inputEl = document.querySelector('.feedback-form input'),
      commentEl = document.querySelector('.feedback-form textarea');

const LOCALSTORAGE_KEY = 'feedback-form-state';

const formDataStorage = {};

const fomrSubmitHandler =(e)=>{
    e.preventDefault();
    e.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log(`E-mail: ${formDataStorage.email}`)
    console.log(`Message: ${formDataStorage.message}`)
    
}
const formInputHandler=(e)=>{
    formDataStorage[e.target.name] = e.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formDataStorage));   
}

function showPreviosDataForm() {
    const messageObj = localStorage.getItem(LOCALSTORAGE_KEY)
    const message = JSON.parse(messageObj);
    if (message) {
        inputEl.value = message.email;
        commentEl.value = message.message;
    }
};


formMessageRef.addEventListener('submit',fomrSubmitHandler);
formMessageRef.addEventListener('input', throttle(formInputHandler, 500));
showPreviosDataForm();

