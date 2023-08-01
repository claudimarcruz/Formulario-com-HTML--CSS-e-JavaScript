const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');

form.addEventListener("submit", (e) => {
    e.preventDefault(); //para evitar que a página recarregue quando clicar no botão de enviar 

    checkInputs();
});

//função para validar os inputs

function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    //verificando os inputs
    //nome do usuário
    if (usernameValue == "") {
        setErrorFor(username, "Nome de Usuário obrigatório.");
    } else {
        setSuccessFor(username);
    }

    //email
    if (emailValue == "") {
        setErrorFor(email, "O Email é obrigatório");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Por favor, insira um Email válido.");
    } else {
        setSuccessFor(email);
    }

    //senha
    if(passwordValue == "") {
        setErrorFor(password, "A Senha é obrigatória.");
    } else if (passwordValue.length < 8) {
        setErrorFor(password, "A Senha precisa ter 8 ou mais caracteres.")
    } else {
        setSuccessFor(password);
    }

    //confirmação da senha

    if(passwordConfirmationValue == "") {
        setErrorFor(passwordConfirmation, "A Confirmação de Senha é obrigatória.")
    } else if (passwordConfirmationValue != passwordValue) {
        setErrorFor(passwordConfirmation, "As senhas estão diferentes.");
    } else if (passwordConfirmationValue.length < 8) {
        setErrorFor(passwordConfirmation, "A Senha precisa ter 8 ou mais caracteres.")
    }else {
        setSuccessFor(passwordConfirmation);
    }

    //mensagem de confirmação se todos os campos estão preenchidos corretamente
    //verifica em cada form-control se ele tem a classe form-control success

    const formControls = form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return (formControl.className === "form-control success");
    });

    if (formIsValid) {
        console.log("Formulário enviado!!");
    }
}

//função que verifica os erros, ela pega o parent element do input (div form-control) e coloca nela 
//a classe de form-control-error, com isso exibindo os erros através dos form-control
 
function setErrorFor(input, message) {
    const formControl  = input.parentElement;
    const small = formControl.querySelector("small");

    //adiciona a mensagem de erro
    small.innerText = message;

    //adiciona a classe de erro
    formControl.className = "form-control error";
}

//função que exibe a mensagem de sucesso

function setSuccessFor(input) {
    const formControl = input.parentElement;

    //adiciona a classe de sucesso
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}