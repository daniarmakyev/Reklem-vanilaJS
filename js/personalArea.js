const personalIcon = document.querySelector('.user-header-personal');
const interactive = document.querySelector('.interactive');
const name = document.querySelector('.name');

personalIcon.addEventListener('click', async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData || !userData.email) {
            throw new Error('Нет данных пользователя в локальном хранилище или отсутствует адрес электронной почты');
        }

        const { email } = userData;

        const response = await fetch(`http://localhost:8000/users?email=${email}`);
        if (!response.ok) {
            throw new Error('Ошибка HTTP: ' + response.status);
        }
        const data = await response.json();
        console.log(data);

        if (!data || data.length === 0) {
            throw new Error('Нет данных о пользователе с таким адресом электронной почты');
        }

        const user = data[0];

        interactive.innerHTML = `<div class="my-cabinet">
            <div class="container">
                <p><a href="./index.html" style="color: black; text-decoration: none;">Главная</a> / <a href="#" style="color: black; text-decoration: none;">Личный кабинет</a></p>
            </div> 
            <hr style="margin-top: 80px;"> 
            <div class="container">
                <form id="userDataForm">
                    <ul style="list-style: none; margin-top: 150px; max-width: 700px; margin-left: auto; margin-right: auto;">
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Имя пользователя:</span><input type="text" name="username" value="${user.username}" readonly></li>
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Email:</span><input type="email" name="email" value="${user.email}" readonly></li>
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Телефон:</span><input type="tel" name="number" value="${user.number || ''}" readonly></li>
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Специализация:</span><input type="text" name="specialization" value="${user.specialization || ''}" readonly></li>
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Адрес:</span><input type="text" name="address" value="${user.address || ''}" readonly></li>
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Пароль</span><input type="text" name="password" value="${user.password || ''}" readonly></li>
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Сайт компании:</span><input type="text" name="Site" value="${user.Site || ''}" readonly></li>
                        <li><span style="font-size: 14px; font-weight: 600; line-height: 20px; color: rgb(216, 123, 0); margin-bottom: 25px; display: inline-block;">Полное имя:</span><input type="text" name="FullName" value="${user.FullName || ''}" readonly></li>
                    </ul>
                </form>
                <button type="button" id="editButton" style="align-items: center; padding: 12px 30px 12px 30px; border-radius: 10px; background: rgb(255, 255, 255); box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.15); border: none; cursor: pointer; margin-left: auto; margin-right: auto; display: block;">Изменить</button>
                <button type="submit" class="save-changes" style="align-items: center; padding: 12px 30px 12px 30px; border-radius: 10px; background: rgb(255, 255, 255); box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.15); border: none; cursor: pointer; margin-left: auto; margin-right: auto; display: none;">Сохранить изменения</button>
            </div>
        </div>`;

        interactive.style.backgroundImage = 'none';
        name.style.display = 'block';
        interactive.style.marginTop = '0';

        const editButton = document.getElementById('editButton');
        const saveChangesButton = document.querySelector('.save-changes');
        const form = document.getElementById('userDataForm');
        const inputs = form.getElementsByTagName('input');

        editButton.addEventListener('click', () => {
            for (const input of inputs) {
                input.removeAttribute('readonly');
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
                    throw new Error('Ошибка HTTP: ' + response.status);
                }
                console.log('Данные успешно обновлены');
                saveChangesButton.style.display = 'none';
                editButton.style.display = 'block';
                for (const input of inputs) {
                    input.setAttribute('readonly', true);
                }
            } catch (error) {
                console.error('Ошибка при отправке данных на сервер:', error);
            }
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
});





