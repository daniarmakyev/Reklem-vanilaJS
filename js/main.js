
const userHeader = document.querySelector('.user-header');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');
const body = document.querySelector('body');
const modalBg = document.querySelector('.modal-bg');
const regNameInp = document.querySelector('#reg-name-inp');
const regMailInp = document.querySelector('#reg-email-inp');
const regPaswordInp = document.querySelector('#reg-password-inp');
const regConfirmPaswordInp = document.querySelector('#reg-confirm-password-inp');
const signUp = document.querySelector('.sign-up')


userHeader.addEventListener('click', () => {
    popup.style.display = 'flex';
    popup.style.zIndex = '4'
    popup.style.pointerEvents = 'all';
    modalBg.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    
});

closeBtn.addEventListener('click', () => {
    modalBg.style.backgroundColor = '';
    setTimeout(() => {
        popup.style.zIndex = '-1';
    }, 1500);
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

// CLOSE MODAL

function closeModal(){
    regNameInp.value = '';
    regMailInp.value = '';
    regPaswordInp.value = '';
    regConfirmPaswordInp.value = '';
}

// REGISTRATION FUNCTION
async function registration() {
    const regNameInp = document.querySelector('#reg-name-inp');
    const regMailInp = document.querySelector('#reg-email-inp');
    const regPaswordInp = document.querySelector('#reg-password-inp');

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
}
closeBtn.addEventListener('click', closeModal)
signUp.addEventListener('click', registration);