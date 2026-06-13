
function showTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (!loginForm || !registerForm) return;

  loginForm.style.display = tab === 'login' ? 'block' : 'none';
  registerForm.style.display = tab === 'register' ? 'block' : 'none';

  document.getElementById('loginTab')?.classList.toggle('active', tab === 'login');
  document.getElementById('registerTab')?.classList.toggle('active', tab === 'register');
}


function registerUser() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const msg = document.getElementById('registerMsg');

  if (!name || !email || !password) {
    showMsg(msg, "Fill all fields", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find(u => u.email === email)) {
    showMsg(msg, "User already exists", "error");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  showMsg(msg, "Registered successfully!", "success");

  setTimeout(() => showTab("login"), 1000);
}


function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const msg = document.getElementById('loginMsg');

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showMsg(msg, "Invalid credentials", "error");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  showMsg(msg, "Login success!", "success");

  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 1000);
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "./index.html";
}

function loadUser() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    window.location.href = "./index.html";
    return;
  }

  let nameEl = document.getElementById("username");
  if (nameEl) nameEl.innerText = user.name;
}


const defaultEvents = [
  {
    id: 1,
    title: "Tech Fest 2026",
    date: "10 May",
    location: "Auditorium",
    description: "Coding + Hackathon"
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "15 May",
    location: "Main Ground",
    description: "Dance & Music"
  }
];

function loadEvents() {
  let events = JSON.parse(localStorage.getItem("events")) || defaultEvents;
  let container = document.getElementById("eventsContainer");

  if (!container) return;

  container.innerHTML = "";

  events.forEach(event => {
    container.innerHTML += `
      <div class="event-card">
        <h3>${event.title}</h3>
        <p>${event.date} | ${event.location}</p>
        <p>${event.description}</p>
        <button onclick="registerEvent(${event.id})">Register</button>
      </div>
    `;
  });

  localStorage.setItem("events", JSON.stringify(events));
}


function registerEvent(id) {
  let myEvents = JSON.parse(localStorage.getItem("myEvents") || "[]");

  if (myEvents.includes(id)) {
    alert("Already registered!");
    return;
  }

  myEvents.push(id);
  localStorage.setItem("myEvents", JSON.stringify(myEvents));

  alert("Registered successfully!");
}


function loadMyEvents() {
  let events = JSON.parse(localStorage.getItem("events") || "[]");
  let myEvents = JSON.parse(localStorage.getItem("myEvents") || "[]");

  let container = document.getElementById("myEventsContainer");

  if (!container) return;

  container.innerHTML = "";

  events.forEach(event => {
    if (myEvents.includes(event.id)) {
      container.innerHTML += `
        <div class="event-card">
          <h3>${event.title}</h3>
          <p>${event.date} | ${event.location}</p>
        </div>
      `;
    }
  });
}


function createEvent() {
  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let location = document.getElementById("location").value;
  let description = document.getElementById("description").value;

  let events = JSON.parse(localStorage.getItem("events") || "[]");

  let newEvent = {
    id: Date.now(),
    title,
    date,
    location,
    description
  };

  events.push(newEvent);
  localStorage.setItem("events", JSON.stringify(events));

  alert("Event created!");
  window.location.href = "./events.html";
}


function showMsg(el, text, type) {
  if (!el) return;
  el.innerText = text;
  el.className = "msg-box " + type;
}