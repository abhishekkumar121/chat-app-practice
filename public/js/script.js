document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const messageForm = document.getElementById("messageForm");
  const contactForm = document.getElementById("contactForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      localStorage.setItem("username", username);
      window.location.href = "/";
    });
  }

  if (messageForm) {
    const username = localStorage.getItem("username");
    if (!username) {
      window.location.href = "/login";
    }

    fetch("/messages")
      .then((response) => response.json())
      .then((messages) => {
        const chatBox = document.getElementById("chatBox");
        messages.forEach((msg) => {
          const messageElement = document.createElement("p");
          messageElement.textContent = `${msg.username}: ${msg.message}`;
          chatBox.appendChild(messageElement);
        });
      });

    messageForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const message = document.getElementById("message").value;
      fetch("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, message }),
      }).then(() => {
        window.location.reload();
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      fetch("/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }).then(() => {
        window.location.href = "/success";
      });
    });
  }
});
