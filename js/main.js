//MODAL
const userHeader = document.querySelector('.user-header');
const userHeaderPersonal = document.querySelector('.user-header-personal')
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');
const body = document.querySelector('body');
const modalBg = document.querySelector('.modal-bg');

// SIGN UP
const signUp = document.querySelector('.sign-up')
const regNameInp = document.querySelector('#reg-name-inp');
const regMailInp = document.querySelector('#reg-email-inp');
const regPaswordInp = document.querySelector('#reg-password-inp');
const regConfirmPaswordInp = document.querySelector('#reg-confirm-password-inp');
const regSwaper = document.querySelector('#reg-swaper');
const regWindow = document.querySelector('#reg-content')

// SIGN IN
const signIn = document.querySelector('.sign-in')
const loginMailInp = document.querySelector('#login-email-inp');
const loginPaswordInp = document.querySelector('#login-password-inp');
const loginSwaper = document.querySelector('#login-swaper')
const loginWindow = document.querySelector('#login-content')
const loginCloseBtn = document.querySelector('.login-close');
const exit = document.querySelector('.exit')
const userName = document.querySelector('.name')

userHeader.addEventListener('click', () => {
    popup.style.display = 'flex';
    popup.style.zIndex = '4'
    popup.style.pointerEvents = 'all';
    modalBg.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
});

loginCloseBtn.addEventListener('click', () => {
    modalBg.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    modalBg.style.position = '';
    setTimeout(() => {
        popup.style.zIndex = '-1';
    }, 1500);
});

closeBtn.addEventListener('click', (e) => {
    modalBg.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    modalBg.style.position = '';
    setTimeout(() => {
        popup.style.zIndex = '-1';
    }, 1500);
    e.preventDefault()
    setTimeout(() => {
      location.reload();
  }, 1200);
  
});

closeBtn.addEventListener('click', () => {
    regMailInp.value = '';
    regPaswordInp.value = '';
})

loginCloseBtn.addEventListener('click', () => {
    loginMailInp.value = '';
    loginPaswordInp.value = '';
})

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
      userName.innerText =  user.username + ' Legenda';
    } else {
      userName.innerText = " ";
    }
  }
  getName();



// CLOSE MODAL

function closeModal(){
    regNameInp.value = '';
    regMailInp.value = '';
    regPaswordInp.value = '';
    regConfirmPaswordInp.value = '';
}

// REGISTRATION FUNCTION
async function registration() {

    if (!regMailInp.value.trim() || !regPaswordInp.value.trim() || !regNameInp.value.trim() || !regConfirmPaswordInp.value.trim()){
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
      password: regPaswordInp.value
    };

    try {
        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log('Response:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }

    regNameInp.value = '';
    regMailInp.value = '';
    regPaswordInp.value = '';
    regConfirmPaswordInp.value = '';
    closeBtn.click();
    setTimeout(() => {
      location.reload();
  }, 1200);
}
closeBtn.addEventListener('click', closeModal)
signUp.addEventListener('click', registration);

loginSwaper.addEventListener('click' ,() => {
    regWindow.style.display = 'none'
    loginWindow.style.display = 'block'
})

regSwaper.addEventListener('click', () => {
    regWindow.style.display = 'block'
    loginWindow.style.display = 'none'
})

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

    loginMailInp.value = '';
    loginPaswordInp.value = '';
    closeBtn.click();
    getName();
    setTimeout(() => {
      location.reload();
  }, 1200);
  }
  
signIn.addEventListener('click', login) 


if (userName.textContent.trim() !== '') {
    userHeaderPersonal.style.display = 'inline-block';
    userHeader.style.display = 'none';
} else {
    userHeader.style.display = 'inline-block';
}

exit.addEventListener('click', () => {
    localStorage.clear();
  setTimeout(location.reload(), 1500);
});

exit.style.display = 'none'

if (userName.textContent.trim() !== '') {
    exit.style.display = 'inline-block';
} else {
    exit.style.display = 'none';
}


function handleCheckboxChange(event) {

  if (event.target.classList.contains('password-checkbox')) {

      logindInp.type = event.target.checked ? 'text' : 'password';
  }
}
  

document.body.addEventListener('change', handleCheckboxChange);

