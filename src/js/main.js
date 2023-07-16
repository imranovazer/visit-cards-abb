import User from './User.js'
import Modal from './Modal.js';

const Me = new User();

const loginContent = `<form class="login-form" " >
<input type="text" name="email" placeholder="Email">
<input type="password" name="password" placeholder="Password">
<button type="submit" class="login-button" >Login</button>
</form>`

const login_modal = new Modal('Hello', loginContent);

const handleLogin = (e) => {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    Me.login(email, password);
}

// modal.render();
const navbar = document.querySelector('.navbar .container .button-container');

//create vist button 
const createVisitButton = document.createElement('button');
createVisitButton.className = "create-visit"
createVisitButton.innerText = 'Create Visit';

//login button 
const loginButton = document.createElement('button');
loginButton.className = "login-button"
loginButton.innerText = 'Login';

loginButton.addEventListener('click', () => {

    login_modal.render();
    const form = document.querySelector('.login-form')
    form.addEventListener('submit', handleLogin);
    console.log(form)
    //.addEventListener('submit', handleLogin);

    // Me.login("imranovazer@gmail.com", "Azer2002")
})

//logout button

const logoutButton = document.createElement('button');
logoutButton.className = "logout-button"
logoutButton.innerText = 'Logout';
logoutButton.addEventListener('click', () => {
    Me.logout();
})






if (Me.isAuth()) {
    navbar.appendChild(createVisitButton);
    navbar.appendChild(logoutButton)

} else {

    navbar.appendChild(loginButton);
}




