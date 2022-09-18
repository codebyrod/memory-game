const form = document.querySelector('.login__form');
const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');

const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem('user', input.value);
    input.value = '';

    //redirecionando o usuário
    window.location = 'pages/game.html';
}

const validaInput = (e) => {
    if (e.target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');

}

form.addEventListener('submit', handleSubmit);
input.addEventListener('input', validaInput);
