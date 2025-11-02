const fileInput = document.querySelector('#imageUpload');
const uploadBox = document.querySelector(".upload-box");
const uploadContent = document.querySelector('.upload-content');
const preview = document.querySelector("#preview");

const errorMessage = document.createElement("p");
errorMessage.classList.add("error-message")

uploadBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", function(){
    const file = this.files[0];
    if (file) validateAndPreview(file);
});

uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = "#ffaa00";
});

uploadBox.addEventListener("dragleave", ()=>{
    uploadBox.style.borderColor = "#7b7b7b";
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) validateAndPreview(file);
});

// Validate + preview function
function validateAndPreview(file) {
  const validTypes = ["image/jpeg", "image/png"];
  const maxSize = 500 * 1024; // 500KB in bytes

  // Reset previous errors
  errorMessage.textContent = "";

  // Check file type
  if (!validTypes.includes(file.type)) {
    errorMessage.textContent = "❌ Invalid file format. Please upload a JPG or PNG image.";
    resetPreview();
    return;
  }

  // Check file size
  if (file.size > maxSize) {
    errorMessage.textContent = "⚠️ File is too large. Max size is 500KB.";
    resetPreview();
    return;
  }

  // If valid, show preview
  showPreview(file);
}

function showPreview(file) {
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.hidden = false;
    uploadContent.style.display = "none";
  };
  reader.readAsDataURL(file);
}

function resetPreview() {
  preview.hidden = true;
  uploadContent.style.display = "block";
}


// === FULL NAME FIELD ===
const fullName = document.querySelector("#full-name");
const nameDiv = document.querySelector("#fullname");

fullName.addEventListener("blur", function () {
  const existingError = nameDiv.querySelector(".error-message");
  if (existingError) existingError.remove();

  if (fullName.value.trim() === "") {
    let errorMsg = document.createElement("p");
    errorMsg.classList.add("error-message");
    errorMsg.innerHTML = `
      <img src="./assets/images/icon-info.svg" alt="info icon" class="error-icon">
      You need to fill this part
    `;
    nameDiv.appendChild(errorMsg);
  }
});

// remove error once user types
fullName.addEventListener("input", function () {
  const existingError = nameDiv.querySelector(".error-message");
  if (existingError && fullName.value.trim() !== "") {
    existingError.remove();
  }
});


// === EMAIL FIELD ===
const emailInput = document.querySelector("#email-input-field");
const emailDiv = document.querySelector("#email");

emailInput.addEventListener("blur", function () {
  const existingError = emailDiv.querySelector(".error-message");
  if (existingError) existingError.remove();

  const emailValue = emailInput.value.trim();

  // If field is empty
  if (emailValue === "") {
    showError("Please enter your email address");
  }
  // If no "@" symbol found
  else if (!emailValue.includes("@")) {
    showError("Please enter a valid email (missing '@')");
  }

  function showError(message) {
    let errorMsg = document.createElement("p");
    errorMsg.classList.add("error-message");
    errorMsg.innerHTML = `
      <img src="./assets/images/icon-info.svg" alt="info icon" class="error-icon">
      ${message}
    `;
    emailDiv.appendChild(errorMsg);
  }
});

emailInput.addEventListener("input", function () {
  const existingError = emailDiv.querySelector(".error-message");
  if (existingError && emailInput.value.trim() !== "") {
    existingError.remove();
  }
});


// === GITHUB FIELD ===
const githubInput = document.querySelector("#github-input-field");
const githubDiv = document.querySelector("#github");

githubInput.addEventListener("blur", function () {
  const existingError = githubDiv.querySelector(".error-message");
  if (existingError) existingError.remove();

  if (githubInput.value.trim() === "") {
    let errorMsg = document.createElement("p");
    errorMsg.classList.add("error-message");
    errorMsg.innerHTML = `
      <img src="./assets/images/icon-info.svg" alt="info icon" class="error-icon">
      Please enter your GitHub username
    `;
    githubDiv.appendChild(errorMsg);
  }
});

githubInput.addEventListener("input", function () {
  const existingError = githubDiv.querySelector(".error-message");
  if (existingError && githubInput.value.trim() !== "") {
    existingError.remove();
  }
});

document.querySelector("#button").addEventListener("click", (e) => {
  e.preventDefault(); // stop form from submitting normally

  // Get all inputs
  const fullName = document.querySelector("#full-name").value.trim();
  const email = document.querySelector("#email-input-field").value.trim();
  const github = document.querySelector("#github-input-field").value.trim();
  const avatar = document.querySelector("#preview").src;
  

  // Simple check before saving
  if (!fullName || !email || !github || !avatar) {
    alert("Please fill out all fields and upload an image.");
    return;
  }

  // Save data to sessionStorage
  sessionStorage.setItem("ticketData", JSON.stringify({
    fullName,
    email,
    github,
    avatar
  }));

  // Redirect to ticket.html
  window.location.href = "ticket.html";
});
