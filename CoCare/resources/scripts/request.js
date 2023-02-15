import { initialize } from "../scripts/firebase.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const { firestore } = initialize();

const requestTitleCheckBox = document.querySelectorAll(
  ".checkbox-request-title"
);
const dropOff = document.querySelector("#drop-off");
const pickUp = document.querySelector("#pick-up");
const host = document.querySelector("#host");
const other = document.querySelector("#other");
const requestDetails = document.querySelector("#request-details");
const kidDetails = document.querySelector("#kid-details");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const output = document.querySelector("#outputArea");
const submitButton = document.querySelector("#submit");
const clearButton = document.querySelector("#clear");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  let careTypes = [];

  if (dropOff.checked) {
    careTypes.push(dropOff.value);
  }
  if (pickUp.checked) {
    careTypes.push(pickUp.value);
  }
  if (host.checked) {
    careTypes.push(host.value);
  }
  if (other.checked) {
    careTypes.push(other.value);
  }

  let requestForm = new CareRequest(
    careTypes,
    requestDetails.value,
    kidDetails.value,
    date.value,
    time.value
  );

  console.log(requestForm);

  addCareRequest(requestForm);
  drawRequestForm(requestForm);
});

async function addCareRequest(requestForm) {
  try {
    const response = await addDoc(
      collection(firestore, "careRequests"),
      Object.assign({}, requestForm)
    );
    console.log(`Request added to Database successfully`, response);
  } catch (error) {
    console.log("There was an error!", error);
  }
}

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearRequestForm();
});

function drawRequestForm(requestForm) {
  output.innerHTML = "Your Request Form is created";

  for (let property in requestForm) {
    let row = "<tr>";
    row += `<td>${requestForm[property]}</td>`;
    row += "</tr>";
    output.innerHTML += row;
  }
}

function clearRequestForm() {
  requestTitleCheckBox.value = "";
  requestDetails.value = "";
  kidDetails.value = "";
  date.value = "";
  time.value = "";
  output.innerHTML = "";
}

class CareRequest {
  constructor(careTypes, details, kidInfo, date, time) {
    this.careTypes = careTypes;
    this.details = details;
    this.kidInfo = kidInfo;
    this.date = date;
    this.time = time;
  }
}
