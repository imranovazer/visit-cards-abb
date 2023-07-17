import User from './User.js'
import Modal from './Modal.js';

const Me = new User();


//Login logic ---------------------------------------------------------
const loginContent = `<form class="login-form" " >
<input type="text" name="email" placeholder="Email">
<input type="password" name="password" placeholder="Password">
<button type="submit" class="login-button" >Login</button>
</form>`
const login_modal = new Modal('Login', loginContent);

const handleLogin = (e) => {
    e.preventDefault();
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    Me.login(email, password);
}
//------------------------------------------------------------

//Create-visit-modal -----------------------------------------

const createVisitModaContent = `<div>
    <form>
     <select class="select-doctor form-select">
        <option selected>Choose doctor</option>
        <option value="cardiologist">Cardiologist</option>
        <option value="dentist">Dentist</option>
         <option value="therapist">Therapist</option>
    </select>
  <div class="mb-3">
    <label for="visitPurpose" class="form-label">Visit purpose</label>
    <input type="text" class="form-control" id="visitPurpose" >
   
  </div>
  <div class="mb-3">
    <label for="visitDescription" class="form-label">Brief visit description</label>
    <input type="text" class="form-control" id="visitDescription">
  </div>
   <div class="mb-3">
    <label for="urgency" class="form-label">Urgency</label>
    <select class="form-select" id="urgency">
        <option value="normal">normal</option>
        <option value="priority">priority</option>
         <option value="priority">urgent</option>
    </select>
  </div>
   <div class="mb-3">
    <label for="fullName" class="form-label">Full name</label>
    <input type="text" class="form-control" id="fullName" >

  </div>
   <div class="dynamic-inputs">
   
   </div>
   
   <button type="submit" class="btn btn-primary">Submit</button>
 
</form>
    </div>
    `

const createVisitModal = new Modal('Create visit', createVisitModaContent);

createVisitModal.render();





//----------------------------






const navbar = document.querySelector('.navbar .container .button-container');

//create vist button 
const createVisitButton = document.createElement('button');
createVisitButton.className = "create-visit"
createVisitButton.innerText = 'Create Visit';

createVisitButton.addEventListener('click', () => {
    createVisitModal.render();

    const select_doctor = document.querySelector('.select-doctor');
    select_doctor.addEventListener('change', (e) => {
        const doctor = e.target.value;
        if (doctor === 'dentist') {
            const dynamicInputs = document.querySelector('.dynamic-inputs');
            dynamicInputs.innerHTML = `<div class="mb-3">
    <label for="lasrVisitDate" class="form-label">Last visit date</label>
    <input type="text" class="form-control" id="lasrVisitDate" >

  </div>`
        }
        else if (doctor === 'cardiologist') {
            const dynamicInputs = document.querySelector('.dynamic-inputs');
            dynamicInputs.innerHTML = `<div class="mb-3">
    <label for="normalBloodPresassure" class="form-label">Normal blood preassure</label>
    <input type="text" class="form-control" id="normalBloodPresassure" >

  </div>
  <div class="mb-3">
    <label for="bmi" class="form-label">Body Mass Index</label>
    <input type="text" class="form-control" id="bmi" >

  </div>
  <div class="mb-3">
    <label for="prevDiagnosed" class="form-label">Previously diagnosed cardiovascular diseases</label>
    <input type="text" class="form-control" id="prevDiagnosed" >

  </div>
  <div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="text" class="form-control" id="age" >
            </div>
  ` }

        else if (doctor === 'therapist') {
            const dynamicInputs = document.querySelector('.dynamic-inputs');
            dynamicInputs.innerHTML = `<div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="text" class="form-control" id="age" >
            </div>` }







    })


})

//login button 
const loginButton = document.createElement('button');
loginButton.className = "login-button"
loginButton.innerText = 'Login';

loginButton.addEventListener('click', () => {
    login_modal.render();
    const form = document.querySelector('.login-form')
    form.addEventListener('submit', handleLogin);

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




