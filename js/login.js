const form = document.querySelector('.form');
const formPlay = document.querySelector('.form__play');
const input = document.querySelector('.login__input');
const inputPlay = document.querySelector('.input__play');
const button = document.querySelector('.login__button');

const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem('user', input.value);
    input.value = '';

    //redirecionando o usuário
    window.location = 'pages/game.html';
}

const handleSubmitPlay = (e) => {
    e.preventDefault();
    
    localStorage.setItem('user', input.value);
    input.value = '';

    //redirecionando o usuário
    window.location = '/game.html';
}

const validaInput = (e) => {
    if (e.target.value.length > 2 && e.target.value.length < 15) {
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');
}

console.log(formPlay);
console.log(inputPlay);

form.addEventListener('submit', handleSubmit);
formPlay.addEventListener('submit', handleSubmitPlay);
input.addEventListener('input', validaInput);
inputPlay.addEventListener('input', validaInput);
