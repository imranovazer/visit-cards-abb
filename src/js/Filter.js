let doctors = [];
import FetchData from "./fetchData.js";
import DisplayCards from "./DisplayCards.js";

const fetchInstance = new FetchData();
const displayFetchInstance = new DisplayCards();
class DoctorDataFetcher {
  constructor() {
    this.doctors = [];
    this.fetchData();
  }

  async fetchData() {
    let processedData = await fetchInstance.fetchData();
    this.doctors = [...processedData];
  }

  initializeEventListeners() {
    let doctorType = document.getElementById("doctor-type-select");
    let caseState = document.getElementById("case-state-select");
    let urgency = document.getElementById("urgency-select");

    let selectedDocType = "All";
    let selectedCase = "All";
    let selectedUrgency = "All";

    doctorType.addEventListener("change", () => {
      selectedDocType = doctorType.value;
      this.filterDoctor(selectedDocType, selectedCase, selectedUrgency);
    });

    caseState.addEventListener("change", () => {
      selectedCase = caseState.value;
      this.filterDoctor(selectedDocType, selectedCase, selectedUrgency);
    });

    urgency.addEventListener("change", () => {
      selectedUrgency = urgency.value;
      this.filterDoctor(selectedDocType, selectedCase, selectedUrgency);
    });

    let searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", () => {
      let inputBoxValue = document
        .getElementById("search-box")
        .value.toLowerCase();
      this.searchInput(inputBoxValue);
    });

    let inputBox = document.getElementById("search-box");
    inputBox.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        doctorType.value = doctorType.options[0].value;
        caseState.value = caseState.options[0].value;
        urgency.value = urgency.options[0].value;
        const result = this.doctors.filter(
          (doctor) =>
            (doctor.fullName != undefined &&
              doctor.fullName
                .toLowerCase()
                .includes(inputBox.value.toLowerCase())) ||
            (doctor.doctor != undefined &&
              doctor.doctor
                .toLowerCase()
                .includes(inputBox.value.toLowerCase())) ||
            (doctor.urgency != undefined &&
              doctor.urgency
                .toLowerCase()
                .includes(inputBox.value.toLowerCase())) ||
            (doctor.caseState != undefined &&
              doctor.caseState
                .toLowerCase()
                .includes(inputBox.value.toLowerCase()))
        );
        displayFetchInstance.display(result);
      }
    });
  }

  filterDoctor(doctorType, caseState, urgency) {
    const result = this.doctors
      .filter(
        (doctor) =>
          (doctor.doctor != undefined &&
            doctor.doctor.toLowerCase() === doctorType.toLowerCase()) ||
          doctorType === "All"
      )
      .filter(
        (doctor) =>
          (doctor.caseState != undefined &&
            doctor.caseState.toLowerCase() === caseState.toLowerCase()) ||
          caseState === "All"
      )
      .filter(
        (doctor) =>
          (doctor.urgency != undefined &&
            doctor.urgency.toLowerCase() === urgency.toLowerCase()) ||
          urgency === "All"
      );
    displayFetchInstance.display(result);
  }

  searchInput(inputBoxValue) {
    const result = this.doctors.filter(
      (doctor) =>
        (doctor.fullName != undefined &&
          doctor.fullName.toLowerCase().includes(inputBoxValue)) ||
        (doctor.doctor != undefined &&
          doctor.doctor.toLowerCase().includes(inputBoxValue)) ||
        (doctor.urgency != undefined &&
          doctor.urgency.toLowerCase().includes(inputBoxValue)) ||
        (doctor.caseState != undefined &&
          doctor.caseState.toLowerCase().includes(inputBoxValue)) ||
        (doctor.description != undefined &&
          doctor.description.toLowerCase().includes(inputBoxValue)) ||
        (doctor.visitPurpose != undefined &&
          doctor.visitPurpose.toLowerCase().includes(inputBoxValue)) ||
        (doctor.normalBloodPressure != undefined &&
          doctor.normalBloodPressure.toLowerCase().includes(inputBoxValue)) ||
        (doctor.weight != undefined &&
          doctor.weight.toLowerCase().includes(inputBoxValue)) ||
        (doctor.age != undefined &&
          String(doctor.age).includes(inputBoxValue)) ||
        (doctor.prevDiagnose != undefined &&
          doctor.prevDiagnose.toLowerCase().includes(inputBoxValue))
    );
    displayFetchInstance.display(result);
  }

  displayDoctors() {
    displayFetchInstance.display(this.doctors);
  }
}

const doctorDataFetcher = new DoctorDataFetcher();
setTimeout(() => {
  doctorDataFetcher.initializeEventListeners();
}, 1000);
