import User from "./User.js";
import Modal from "./Modal.js";
import { Cardiologist } from "./Visit.js";
import { Dentist } from "./Visit.js";
import { Therapist } from "./Visit.js";
import DisplayCards from "./DisplayCards.js";
import FetchData from "./fetchData.js";
import { Visit } from "./Visit.js";

const Me = new User();
const displayCardInstance = new DisplayCards();
const fetchDataInstance = new FetchData();

// const res = await fetch("https://ajax.test-danit.com/api/v2/cards", {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem("token")}`
//   },
// })
// const process = await res.json();
// console.log(process)
//Login logic ---------------------------------------------------------
const loginContent = `<form class="login-form" " >
<input type="text" name="email" placeholder="Email">
<input type="password" name="password" placeholder="Password">
<button type="submit" class="login-button" >Login</button>
</form>`;
const login_modal = new Modal("Login", loginContent);

const handleLogin = (e) => {
  e.preventDefault();
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  Me.login(email, password);
};
//------------------------------------------------------------

//Create-visit-modal -----------------------------------------

const createVisitModaContent = `<div>
    <form class="visit-form">
    <p class="satus"></p>
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
    `;

const createVisitModal = new Modal("Create visit", createVisitModaContent);

//----------------------------

const navbar = document.querySelector(".navbar .container .button-container");

//create vist button
const createVisitButton = document.createElement("button");
createVisitButton.className = "create-visit";
createVisitButton.innerText = "Create Visit";

createVisitButton.addEventListener("click", () => {
  createVisitModal.render();

  const select_doctor = document.querySelector(".select-doctor");

  const visit_form = document.querySelector(".visit-form");
  visit_form.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const visitPurpose = document.querySelector("#visitPurpose").value;
      const visitDescription =
        document.querySelector("#visitDescription").value;
      const urgency = document.querySelector("#urgency").value;
      const fullName = document.querySelector("#fullName").value;
      const doctor = document.querySelector(".select-doctor").value;
      const lastVisitDate = document.querySelector("#lasrVisitDate")?.value;
      const normalBloodPresassure = document.querySelector(
        "#normalBloodPresassure"
      )?.value;
      const weight = document.querySelector("#weight")?.value;
      const prevDiagnosed = document.querySelector("#prevDiagnosed")?.value;
      const age = document.querySelector("#age")?.value;
      if (doctor === "dentist") {
        const newVisit = new Dentist(
          visitPurpose,
          visitDescription,
          urgency,
          fullName,
          doctor,
          lastVisitDate
        );
        const processedData = await newVisit.create();
        console.log("added", processedData);
      } else if (doctor === "cardiologist") {
        const newVisit = new Cardiologist(
          visitPurpose,
          visitDescription,
          urgency,
          fullName,
          doctor,
          normalBloodPresassure,
          weight,
          prevDiagnosed,
          age
        );
        const processedData = await newVisit.create();
        console.log("added", processedData);
      } else if (doctor === "therapist") {
        const newVisit = new Therapist(
          visitPurpose,
          visitDescription,
          urgency,
          fullName,
          doctor,
          age
        );
        const processedData = await newVisit.create();
        console.log("added", processedData);
      }
      const status = document.querySelector(".satus");
      status.style.color = "green";
      status.innerText = "Visit created successfully";
      //added by Ali
      const allData = await fetchDataInstance.fetchData();
      displayCardInstance.display(allData);
      createVisitModal.unrender();
      //added by Ali
    } catch (err) {
      console.log(err);
      const status = document.querySelector(".satus");
      status.style.color = "red";
      status.innerText = "Something went wrong";
    }
  });

  select_doctor.addEventListener("change", (e) => {
    const doctor = e.target.value;
    if (doctor === "dentist") {
      const dynamicInputs = document.querySelector(".dynamic-inputs");
      dynamicInputs.innerHTML = `<div class="mb-3">
    <label for="lasrVisitDate" class="form-label">Last visit date</label>
    <input type="text" class="form-control" id="lasrVisitDate" >

  </div>`;
    } else if (doctor === "cardiologist") {
      const dynamicInputs = document.querySelector(".dynamic-inputs");
      dynamicInputs.innerHTML = `<div class="mb-3">
    <label for="normalBloodPresassure" class="form-label">Normal blood preassure</label>
    <input type="text" class="form-control" id="normalBloodPresassure" >

  </div>
  <div class="mb-3">
    <label for="weight" class="form-label">Weight</label>
    <input type="text" class="form-control" id="weight" >

  </div>
  <div class="mb-3">
    <label for="prevDiagnosed" class="form-label">Previously diagnosed cardiovascular diseases</label>
    <input type="text" class="form-control" id="prevDiagnosed" >

  </div>
  <div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="text" class="form-control" id="age" >
            </div>
  `;
    } else if (doctor === "therapist") {
      const dynamicInputs = document.querySelector(".dynamic-inputs");
      dynamicInputs.innerHTML = `<div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="text" class="form-control" id="age" >
            </div>`;
    }
  });
});

//login button
const loginButton = document.createElement("button");
loginButton.className = "login-button";
loginButton.innerText = "Login";

loginButton.addEventListener("click", () => {
  login_modal.render();
  const form = document.querySelector(".login-form");
  form.addEventListener("submit", handleLogin);
});

//logout button

const logoutButton = document.createElement("button");
logoutButton.className = "logout-button";
logoutButton.innerText = "Logout";
logoutButton.addEventListener("click", () => {
  Me.logout();
});

if (Me.isAuth()) {
  navbar.appendChild(createVisitButton);
  navbar.appendChild(logoutButton);
} else {
  navbar.appendChild(loginButton);
}

const displayAllCards = new DisplayCards();
displayAllCards.attachEventListeners();
displayAllCards.display();
