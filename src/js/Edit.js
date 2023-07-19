import DisplayCards from "./DisplayCards.js";

export default class Edit {
  constructor(card) {
    this.card = card;
    this.modalOverlay = document.querySelector(".modal-overlay");
  }

  render() {
    const doctorType = this.card.classList[1];

    const fullNameElement = this.card.querySelector(".full-name");
    const doctorElement = this.card.querySelector(".doctor");
    const visitPurposeElement = this.card.querySelector(".visit-purpose");
    const descriptionElement = this.card.querySelector(".description");

    const urgencyElement = this.card.querySelector(".urgency");
    const normalBloodPressureElement = this.card.querySelector(
      ".normal-blood-pressure"
    );
    const weightElement = this.card.querySelector(".weight");
    const prevDiagnoseElement = this.card.querySelector(".prev-diagnose");
    const ageElement = this.card.querySelector(".age");
    const lastVisitElement = this.card.querySelector(".last-visit");

    const deleteButton = this.card.querySelector(".delete-btn");
    const cardId = deleteButton.dataset.cardId;

    const fullName = fullNameElement.textContent.split(":")[1].trim();
    const doctor = doctorElement.textContent.split(":")[1].trim();
    const visitPurpose = visitPurposeElement.textContent.split(":")[1].trim();
    const description = descriptionElement.textContent.split(":")[1].trim();

    const urgency = urgencyElement.textContent.split(":")[1].trim();
    const normalBloodPressure = normalBloodPressureElement
      ? normalBloodPressureElement.textContent.split(":")[1].trim()
      : "";
    const weight = weightElement
      ? weightElement.textContent.split(":")[1].trim()
      : "";
    const prevDiagnose = prevDiagnoseElement
      ? prevDiagnoseElement.textContent.split(":")[1].trim()
      : "";
    const age = ageElement ? ageElement.textContent.split(":")[1].trim() : null;
    const lastVisit = lastVisitElement
      ? lastVisitElement.textContent.split(":")[1].trim()
      : "";

    if (doctorType === "dentist") {
      console.log("clicked");
      this.modalOverlay.innerHTML = `
      <div class="card dentist">
              <button class="close-btn" data-card-id="${cardId}">X</button>
              <p class="full-name">Full Name: <input name="full-name" value=${fullName} ${`required`} /></p>
              <p class="doctor">Doctor: <input name="doctor-type" value=${doctorType} ${`disabled`} /></p>
              
                <h2 class="visit-purpose">Visit Purpose: <input name="visit-purpose" value=${visitPurpose} ${`required`} /></h2>
                <p class="description">Description: <input name="description" value=${description}  /></p>
                <p class="urgency">Urgency: <input name="urgency" value=${urgency} ${`disabled`} /></p>
                <p class="last-visit">Last Visit Date: <input name="last-visit" value=${lastVisit}></p>
              
              <button class="save-btn">Save</button>
            </div>`;
    }

    if (doctorType === "cardiologist") {
      this.modalOverlay.innerHTML = `
      <div class="card cardiologist">
      <button class="close-btn" data-card-id="${cardId}">X</button>
      <p class="full-name">Full Name: <input name="full-name" value=${fullName} ${`required`} /></p>
      <p class="doctor">Doctor: <input name="doctor-type" value=${doctorType} ${`disabled`} /></p>
      
      
        <h2 class="visit-purpose">Visit Purpose: <input name="visit-purpose" value=${visitPurpose} ${`required`} /></h2>
        <p class="description">Description: <input name="description" value=${description}  /></p>
        <p class="urgency">Urgency: <input name="urgency" value=${urgency} ${`disabled`} /></p>
        <p class="normal-blood-pressure">Normal Blood Pressure: <input name="blood-pressure" value=${normalBloodPressure}></p>
        <p class="weight">Weight: <input name="weight" value=${weight} /></p>
        <p class="prev-diagnose">Previous Diagnose: <input name="prev-diagnose" value=${prevDiagnose} /></p>
        <p class="age"> Age: <input name="age" value=${age}  /></p>
      
      <button class="save-btn">Save</button>
    </div>`;
    }

    if (doctorType === "therapist") {
      this.modalOverlay.innerHTML = `<div class="card therapist">
      <button class="close-btn" data-card-id="${cardId}">X</button>
      <p class="full-name">Full Name: <input name="full-name" value=${fullName} ${`required`} /></p>
      <p class="doctor">Doctor: <input name="doctor-type" value=${doctorType} ${`disabled`} /></p>
      
      
        <h2 class="visit-purpose">Visit Purpose: <input name="visit-purpose" value=${visitPurpose} ${`required`} /></h2>
        <p class="description">Description: <input name="description" value=${description}  /></p>
        <p class="urgency">Urgency: <input name="urgency" value=${urgency} ${`disabled`} /></p>
        <p class="age"> Age: <input name="age" value=${age}  /></p>
      
      <button class="save-btn">Save</button>
    </div>`;
    }

    this.modalContent = this.modalOverlay.querySelector(".card");
    this.closeBtn = this.modalOverlay.querySelector(".close-btn");
    const saveBtn = this.modalOverlay.querySelector(".save-btn");

    this.closeBtn.addEventListener("click", () => {
      this.modalOverlay.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === this.modalOverlay) {
        this.modalOverlay.style.display = "none";
      }
    });

    saveBtn.addEventListener("click", () => {
      if (doctorType === "cardiologist") {
        const fullNameInput = this.modalOverlay.querySelector(
          'input[name="full-name"]'
        );
        const doctorInput = this.modalOverlay.querySelector(
          'input[name="doctor-type"]'
        );
        const visitPurposeInput = this.modalOverlay.querySelector(
          'input[name="visit-purpose"]'
        );
        const descriptionInput = this.modalOverlay.querySelector(
          'input[name="description"]'
        );
        const urgencyInput = this.modalOverlay.querySelector(
          'input[name="urgency"]'
        );
        const normalBloodPressureInput = this.modalOverlay.querySelector(
          'input[name="blood-pressure"]'
        );
        const weightInput = this.modalOverlay.querySelector(
          'input[name="weight"]'
        );
        const prevDiagnoseInput = this.modalOverlay.querySelector(
          'input[name="prev-diagnose"]'
        );
        const ageInput = this.modalOverlay.querySelector('input[name="age"]');

        // Retrieve input values
        const fullName = fullNameInput.value;
        const visitPurpose = visitPurposeInput.value;
        const description = descriptionInput.value;
        const urgency = urgencyInput.value;
        const normalBloodPressure = normalBloodPressureInput.value;
        const weight = weightInput.value;
        const prevDiagnose = prevDiagnoseInput.value;
        const age = ageInput.value;
        const doctor = doctorInput.value;

        fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            visitPurpose: visitPurpose,
            description: description,
            urgency: urgency,
            fullName: fullName,
            doctor: doctor,
            normalBloodPreassure: normalBloodPressure,
            weight: weight,
            prevDiagnose: prevDiagnose,
            age: age,
          }),
        }).then(() => {
          const displayAllCards = new DisplayCards();

          // displayAllCards.attachEventListeners();
          displayAllCards.display();
        });
      }

      if (doctorType === "therapist") {
        const fullNameInput = this.modalOverlay.querySelector(
          'input[name="full-name"]'
        );
        const doctorInput = this.modalOverlay.querySelector(
          'input[name="doctor-type"]'
        );
        const visitPurposeInput = this.modalOverlay.querySelector(
          'input[name="visit-purpose"]'
        );
        const descriptionInput = this.modalOverlay.querySelector(
          'input[name="description"]'
        );
        const urgencyInput = this.modalOverlay.querySelector(
          'input[name="urgency"]'
        );

        const ageInput = this.modalOverlay.querySelector('input[name="age"]');
        const fullName = fullNameInput.value;
        const visitPurpose = visitPurposeInput.value;
        const description = descriptionInput.value;
        const urgency = urgencyInput.value;
        const age = ageInput.value;
        const doctor = doctorInput.value;

        fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            visitPurpose: visitPurpose,
            description: description,
            urgency: urgency,
            fullName: fullName,
            doctor: doctor,
            age: age,
          }),
        }).then(() => {
          const displayAllCards = new DisplayCards();

          // displayAllCards.attachEventListeners();
          displayAllCards.display();
        });
      }

      if (doctorType === "dentist") {
        const fullNameInput = this.modalOverlay.querySelector(
          'input[name="full-name"]'
        );
        const doctorInput = this.modalOverlay.querySelector(
          'input[name="doctor-type"]'
        );
        const visitPurposeInput = this.modalOverlay.querySelector(
          'input[name="visit-purpose"]'
        );
        const descriptionInput = this.modalOverlay.querySelector(
          'input[name="description"]'
        );
        const urgencyInput = this.modalOverlay.querySelector(
          'input[name="urgency"]'
        );
        const lastVisitInput = this.modalOverlay.querySelector(
          'input[name="last-visit"]'
        );

        const fullName = fullNameInput.value;
        const visitPurpose = visitPurposeInput.value;
        const description = descriptionInput.value;
        const urgency = urgencyInput.value;
        const doctor = doctorInput.value;
        const lastVisit = lastVisitInput.value;

        fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            visitPurpose: visitPurpose,
            description: description,
            urgency: urgency,
            fullName: fullName,
            doctor: doctor,
            lastVisitDate: lastVisit,
          }),
        }).then(() => {
          const displayAllCards = new DisplayCards();

          // displayAllCards.attachEventListeners();
          displayAllCards.display();
        });
      }

      this.modalOverlay.style.display = "none";
    });

    this.modalOverlay.style.display = "flex";
  }
}
