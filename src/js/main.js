import User from './User.js'
import Modal from './Modal.js';

const Me = new User();

const modal = new Modal('Hello', 'World');


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
    Me.login("imranovazer@gmail.com", "Azer2002")
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




