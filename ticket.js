window.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(sessionStorage.getItem("ticketData"));

  // Check if we are on ticket.html
 if (window.location.pathname.includes("ticket.html")) {
  const data = JSON.parse(sessionStorage.getItem("ticketData"));
  if (!data) {
    window.location.href = "index.html";
    return;
  }

  // Update all fields
  document.getElementById("display-avatar").src = data.avatar;
  document.getElementById("display-name").textContent = data.fullName;
  document.getElementById("display-email").textContent = data.email;
  document.getElementById("display-name").textContent = data.fullName;
  document.querySelector("#bottom-name").textContent = data.fullName ;
  // Remove extra '@' if user already typed one
  const githubName = data.github.startsWith("@")
    ? data.github
    : "@" + data.github;
  document.getElementById("display-github").textContent = githubName;

  //Generated and display random serial number 
const serialNum = document.querySelector("#ticket-serial");
const genNum = Math.floor(10000 + Math.random()* 9000)
serialNum.textContent = `#${genNum}`
}});

