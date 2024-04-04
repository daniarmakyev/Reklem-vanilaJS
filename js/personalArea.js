const personalIcon = document.querySelector('.user-header-personal');
const interactive = document.querySelector('.interactive');
const name = document.querySelector('.name');

personalIcon.addEventListener('click', async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.email) {
            console.error(error)
        }
        const { email } = userData;

        const response = await fetch(`http://localhost:8000/users?email=${email}`);
        if (!response.ok) {
            console.error(error)
        }
        const data = await response.json();

        if (!data || data.length === 0) {
            console.error(error)
        }

        const user = data[0];

        interactive.innerHTML = `<div class="my-cabinet">
            <div class="container">
                <p style="margin-top: 30px;><a href="index.html" style="color: black; text-decoration: none;">Главная</a> / <a href="#" style="color: black; text-decoration: none;">Личный кабинет</a></p>
            </div> 
            <hr style="margin-top: 80px;"> 
            <div class="container">
                <form id="userDataForm">
                    <ul style="list-style: none; margin-top: 150px; max-width: 700px; margin-left: auto; margin-right: auto;">
                        <li><span >Имя пользователя:</span><input type="text" name="username" value="${user.username}" readonly></li>
                        <li><span >Email:</span>${user.email}</li>
                        <li><span >Телефон:</span><input type="tel" name="number" value="${user.number || ''}" readonly></li>
                        <li><span >Специализация:</span><input type="text" name="specialization" value="${user.specialization || ''}" readonly></li>
                        <li><span >Адрес:</span><input type="text" name="address" value="${user.address || ''}" readonly></li>
                        <li><span >Пароль</span><input type="checkbox" class="password-checkbox"><input type="password" name="password" class="password-input" value="${user.password || ''}" readonly></li>
                        <li><span >Сайт компании:</span><input type="text" name="Site" value="${user.Site || ''}" readonly></li>
                        <li><span >Полное имя:</span><input type="text" name="FullName" value="${user.FullName || ''}" readonly></li>
                    </ul>
                </form>
                <button type="button" id="editButton" style="align-items: center; padding: 12px 30px 12px 30px; border-radius: 10px; background: rgb(255, 255, 255); box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.15); border: none; cursor: pointer; margin-left: auto; margin-right: auto; display: block;">Изменить</button>
                <button type="submit" class="save-changes" style="align-items: center; padding: 12px 30px 12px 30px; border-radius: 10px; background: rgb(255, 255, 255); box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.15); border: none; cursor: pointer; margin-left: auto; margin-right: auto; display: none;">Сохранить изменения</button>
            </div>
        </div>`;

        interactive.style.backgroundImage = 'none';
        name.style.display = 'block';
        interactive.style.marginTop = '0';

        const editButton = document.querySelector('#editButton');
        const saveChangesButton = document.querySelector('.save-changes');
        const form = document.querySelector('#userDataForm');
        const inputs = form.querySelectorAll('input');

        editButton.addEventListener('click', () => {
            for (const item of inputs) {
                item.removeAttribute('readonly');
            }
            editButton.style.display = 'none';
            saveChangesButton.style.display = 'block';
        });

        saveChangesButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const updatedUserData = {};
            for (const [name, value] of formData) {
                updatedUserData[name] = value;
            }
            try {
                const response = await fetch(`http://localhost:8000/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUserData)
                });
                if (!response.ok) {
                    console.error(error)
                }
                alert('Данные успешно обновлены');
                saveChangesButton.style.display = 'none';
                editButton.style.display = 'block';
                for (const item of inputs) {
                    item.setAttribute('readonly', true);
                }
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function handleCheckboxChange(event) {
    if (event.target.classList.contains('password-checkbox') && !event.target.disabled) {
        let parentElement = event.target.parentElement;
        let passwordInput;
        for (let i = 0; i < parentElement.children.length; i++) {
            if (parentElement.children[i].tagName === 'INPUT' && parentElement.children[i].type === 'password') {
                passwordInput = parentElement.children[i];
                break;
            }
        }
        if (passwordInput) {
            passwordInput.type = event.target.checked ? 'text' : 'password';
            event.target.disabled = true;
        } 
    }
}

document.body.addEventListener('change', handleCheckboxChange);

