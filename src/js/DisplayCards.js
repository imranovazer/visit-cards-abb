import Edit from "./Edit.js";
import FetchData from "./fetchData.js";
let fetchDataInstance = new FetchData();

export default class DisplayCards {
  constructor() {
    this.fetAllData();
    this.cardsSection = document.querySelector(".cards-section");
  }

  renderCard(cardHTML) {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = cardHTML.trim();
    const cardElement = tempContainer.firstChild;
    this.cardsSection.appendChild(cardElement);
  }

  showAdditionalInfo(buttonElement) {
    const card = buttonElement.closest(".card");
    const additionalInfo = card.querySelector(".additional-info");
    additionalInfo.classList.add("show");
    buttonElement.textContent = "Show Less";
  }

  hideAdditionalInfo(buttonElement) {
    const card = buttonElement.closest(".card");
    const additionalInfo = card.querySelector(".additional-info");
    additionalInfo.classList.remove("show");
    buttonElement.textContent = "Show More";
  }

  attachEventListeners() {
    this.cardsSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const cardElement = event.target.closest(".card");
        if (cardElement) {
          const cardId = event.target.dataset.cardId;
          this.deleteCard(cardId, cardElement);
        }
      }
    });

    this.cardsSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("show-more")) {
        const card = event.target.closest(".card");

        const additionalInfo = card.querySelector(".additional-info");
        if (additionalInfo.classList.contains("show")) {
          this.hideAdditionalInfo(event.target);
        } else {
          this.showAdditionalInfo(event.target);
        }
      }
    });

    this.cardsSection.addEventListener("click", (event) => {
      if (event.target.classList.contains("edit-btn")) {
        try {
          const card = event.target.closest(".card");
          const newEdit = new Edit(card);
          newEdit.render();
        } catch (error) {
          console.error("Error in DisplayCards:", error);
        }
      }
    });
  }

  async fetAllData() {
    const data = await fetchDataInstance.fetchData();
    this.display(data);
  }

  async display(processedData) {
    try {
      if (processedData == undefined) {
        this.cardsSection.innerHTML = '<p class="info">Add cards</p>';
        return;
      }

      this.cardsSection.innerHTML = "";
      processedData.forEach((e) => {
        if (e.doctor === "cardiologist") {
          this.renderCard(`
            <div class="card cardiologist">
              <button class="delete-btn" data-card-id="${e.id}">X</button>
              <p class="full-name">Full Name: ${e.fullName}</p>
              <p class="doctor">Doctor: ${e.doctor}</p>
              <button class="show-more">Show More</button>
              <div class="additional-info">
                <h2 class="visit-purpose">Visit Purpose: ${e.visitPurpose}</h2>
                <p class="description">Description: ${e.description}</p>
                <p class="urgency">Urgency: ${e.urgency}</p>
                <p class="normal-blood-pressure">Normal Blood Pressure: ${e.normalBloodPreassure}</p>
                <p class="weight">Weight: ${e.weight}</p>
                <p class="prev-diagnose">Previous Diagnose: ${e.prevDiagnose}</p>
                <p class="age"> Age: ${e.age}</p>
              </div>
              <button class="edit-btn">Edit</button>
            </div>
          `);
        } else if (e.doctor === "dentist") {
          this.renderCard(`
            <div class="card dentist">
              <button class="delete-btn" data-card-id="${e.id}">X</button>
              <p class="full-name">Full Name: ${e.fullName}</p>
              <p class="doctor">Doctor: ${e.doctor}</p>
              <button class="show-more">Show More</button>
              <div class="additional-info">
                <h2 class="visit-purpose">Visit Purpose: ${e.visitPurpose}</h2>
                <p class="description">Description: ${e.description}</p>
                <p class="urgency">Urgency: ${e.urgency}</p>
                <p class="last-visit">Last Visit Date: ${
                  e.lastVisitDate || ""
                }</p>
              </div>
              <button class="edit-btn">Edit</button>
            </div>
          `);
        } else if (e.doctor === "therapist") {
          this.renderCard(`
            <div class="card therapist">
              <button class="delete-btn" data-card-id="${e.id}">X</button>
              <p class="full-name">Full Name: ${e.fullName}</p>
              <p class="doctor">Doctor: ${e.doctor}</p>
              <button class="show-more">Show More</button>
              <div class="additional-info">
                <h2 class="visit-purpose">Visit Purpose: ${e.visitPurpose}</h2>
                <p class="description">Description: ${e.description}</p>
                <p class="urgency">Urgency: ${e.urgency}</p>
                <p class="age"> Age: ${e.age || ""}</p>
              </div>
              <button class="edit-btn">Edit</button>
            </div>
          `);
        }
      });
    } catch (error) {
      console.error("Error displaying cards:", error);
    }
  }

  async deleteCard(cardId, cardElement) {
    try {
      const response = await fetch(
        `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        console.log("Card deleted successfully.");
        cardElement.remove();
      } else {
        console.error("Failed to delete the card.");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  }
}
