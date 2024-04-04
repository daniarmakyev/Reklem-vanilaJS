//MODAL
const userHeader = document.querySelector(".user-header");
const userHeaderPersonal = document.querySelector(".user-header-personal");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close");
const body = document.querySelector("body");
const modalBg = document.querySelector(".modal-bg");

// SIGN UP
const signUp = document.querySelector(".sign-up");
const regNameInp = document.querySelector("#reg-name-inp");
const regMailInp = document.querySelector("#reg-email-inp");
const regPaswordInp = document.querySelector("#reg-password-inp");
const regConfirmPaswordInp = document.querySelector(
  "#reg-confirm-password-inp"
);
const regSwaper = document.querySelector("#reg-swaper");
const regWindow = document.querySelector("#reg-content");

// SIGN IN
const signIn = document.querySelector(".sign-in");
const loginMailInp = document.querySelector("#login-email-inp");
const loginPaswordInp = document.querySelector("#login-password-inp");
const loginSwaper = document.querySelector("#login-swaper");
const loginWindow = document.querySelector("#login-content");
const loginCloseBtn = document.querySelector(".login-close");
const exit = document.querySelector(".exit");
const userName = document.querySelector(".name");

// --------- add card -------------
const addBtn = document.querySelector(".add");
const addProductBtn = document.querySelector("#addProductBtn");
const addForm = document.querySelector(".addProduct");
const container2 = document.querySelector(".cards-container");
const newModal = document.querySelector(".new");
const imgInp = document.getElementById("imgInp");
const titleInp = document.getElementById("titleInp");
const priceInp = document.getElementById("priceInp");
const categoryInp = document.getElementById("categoryInp");
const descriptionArea = document.getElementById("descriptionArea");

userHeader.addEventListener("click", () => {
  popup.style.display = "flex";
  popup.style.zIndex = "4";
  popup.style.pointerEvents = "all";
  modalBg.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
});

loginCloseBtn.addEventListener("click", () => {
  modalBg.style.backgroundColor = "rgba(0, 0, 0, 0)";
  modalBg.style.position = "";
  setTimeout(() => {
    popup.style.zIndex = "-1";
  }, 1500);
});

closeBtn.addEventListener("click", () => {
  modalBg.style.backgroundColor = "rgba(0, 0, 0, 0)";
  modalBg.style.position = "";
  setTimeout(() => {
    popup.style.zIndex = "-1";
  }, 1500);
});

closeBtn.addEventListener("click", () => {
  regMailInp.value = "";
  regPaswordInp.value = "";
});

loginCloseBtn.addEventListener("click", () => {
  loginMailInp.value = "";
  loginPaswordInp.value = "";
});

async function getQuery(endpoint) {
  const res = await fetch(`http://localhost:8000/${endpoint}`);
  const data = await res.json();
  return data;
}

async function getUsers() {
  const data = await getQuery("users");
  console.log(data);
  return data;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.addEventListener("storage", getName);

function getName() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    userName.innerText = user.username + " Legenda";
  } else {
    userName.innerText = " ";
  }
}
getName();

// CLOSE MODAL

function closeModal() {
  regNameInp.value = "";
  regMailInp.value = "";
  regPaswordInp.value = "";
  regConfirmPaswordInp.value = "";
}

// REGISTRATION FUNCTION
async function registration() {
  if (
    !regMailInp.value.trim() ||
    !regPaswordInp.value.trim() ||
    !regNameInp.value.trim() ||
    !regConfirmPa ||
    swordInp.value.trim()
  ) {
    alert("Some inputs are empty!");
    return;
  }
  if (regPaswordInp.value.length < 8) {
    console.error("Password must be more than 8 characters!");
    return;
  }

  if (regPaswordInp.value !== regConfirmPaswordInp.value) {
    console.error("Password and its confirmation don't match!");
    return;
  }

  let users = await getUsers();

  if (users.some((item) => item.email === regMailInp.value)) {
    alert("This email is already taken!");
    return;
  }
  const data = {
    username: regNameInp.value,
    email: regMailInp.value,
    password: regPaswordInp.value,
  };

  try {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    console.log("Response:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }

  regNameInp.value = "";
  regMailInp.value = "";
  regPaswordInp.value = "";
  regConfirmPaswordInp.value = "";
  closeBtn.click();
  location.reload();
}
closeBtn.addEventListener("click", closeModal);
signUp.addEventListener("click", registration);

loginSwaper.addEventListener("click", () => {
  regWindow.style.display = "none";
  loginWindow.style.display = "block";
});

regSwaper.addEventListener("click", () => {
  regWindow.style.display = "block";
  loginWindow.style.display = "none";
});

async function login() {
  if (!loginMailInp.value.trim() || !loginPaswordInp.value.trim()) {
    alert("Some inputs are empty!");
    return;
  }

  let users = await getUsers();

  const foundUser = users.find((user) => user.email === loginMailInp.value);

  if (!foundUser) {
    alert("User not found!");
    return;
  }

  if (foundUser.password !== loginPaswordInp.value) {
    alert("Wrong password!");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({ username: foundUser.username, email: foundUser.email })
  );

  loginMailInp.value = "";
  loginPaswordInp.value = "";
  closeBtn.click();
  getName();
  location.reload();
}

signIn.addEventListener("click", login);

if (userName.textContent.trim() !== "") {
  userHeaderPersonal.style.display = "inline-block";
  userHeader.style.display = "none";
} else {
  userHeader.style.display = "inline-block";
}

exit.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

exit.style.display = "none";

if (userName.textContent.trim() !== "") {
  exit.style.display = "inline-block";
} else {
  exit.style.display = "none";
}

// ----------- card -----------------
const container = document.querySelector(".container2");

async function render() {
  try {
    const res = await fetch("http://localhost:8000/cards");
    const data = await res.json();

    container.innerHTML = "";

    data.forEach((item) => {
      container.innerHTML += `
        <div class="product-card">
          <img src = ${item.image}  alt="" class="product-card__image">
          <h3 class="product-card__title">${item.title}</h3>
          <span class="product-card__price">Price: ${item.price}$</span>
          <p class="product-card__description">Description: ${item.description}</p>
          <div class="buttons">
          
              <a id = ${item.id}
     data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                 class="editBtn">Edit</a>
    <a id = ${item.id} class="deleteBtn">Delete</a>
          </div>
        </div>
      `;
    });
  } catch (error) {
    // console.error("Error fetching data:", error);
  }
}

render();

// --------- delete -----------
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    await fetch(`${" http://localhost:8000/cards"}/${e.target.id}`, {
      method: "DELETE",
    });
    render();
  }
});

// ----------- edit ----------------

let id = null;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("editBtn")) {
    const cardId = e.target.id;
    editForm.style.display = "block";
    overlay.style.display = "block";
    const data = await getQuery(`cards/${cardId}`);
    titleInp.value = data.title;
    priceInp.value = data.price;
    descriptionArea.value = data.description;
    imgInp.value = data.image;
    id = cardId;
  }
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    !titleInp.value.trim() ||
    !priceInp.value.trim() ||
    !descInp.value.trim() ||
    !imgInp.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }
  const editedObj = {
    title: titleInp.value,
    price: priceInp.value,
    description: descriptionArea.value,
    image: imgInpEdit.value,
  };
  await fetch(`${" http://localhost:8000/cards"}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  render();
  closeModal();
});
