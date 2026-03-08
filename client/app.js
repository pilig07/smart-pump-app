const API = "http://localhost:3000/api";


async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  });

  if (res.status !== 200) {
    alert("Invalid login");

    return;
  }

  const user = await res.json();

  localStorage.setItem("user", JSON.stringify(user));

  window.location = "dashboard.html";
}



function loadUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  document.getElementById("userName").innerText =
    `${user.name.first} ${user.name.last}`;

  document.getElementById("firstName").value = user.name.first;
  document.getElementById("lastName").value = user.name.last;

  document.getElementById("balance").innerText = user.balance;

  document.getElementById("phone").value = user.phone;

  document.getElementById("address").value = user.address;

  const img = document.getElementById("userImage");

  if (user.picture) {
    img.src = user.picture;
  } else {
    img.src = "../assets/simple-user-default-icon-free-png.png";
  }
}

async function updateUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  const first = document.getElementById("firstName").value;
  const last = document.getElementById("lastName").value;

  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const res = await fetch(`${API}/user/${user._id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      phone,
      address,
      name: {
        first: first,
        last: last,
      },
    }),
  });

  const updated = await res.json();

  localStorage.setItem("user", JSON.stringify(updated));

  alert("User updated");
}

if (window.location.pathname.includes("dashboard")) {
  loadUser();
}

//profile actions
function toggleBalance() {
  const section = document.getElementById("balance");

  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

function toggleEidtSection() {
  const section = document.getElementById("edit");

  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}
