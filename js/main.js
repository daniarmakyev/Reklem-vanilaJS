const userHeader = document.querySelector('.user-header');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');
const body = document.querySelector('body');
const modalBg = document.querySelector('.modal-bg')

userHeader.addEventListener('click', () => {
    popup.style.display = 'flex';
    popup.style.pointerEvents = 'all';
    modalBg.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    
});

closeBtn.addEventListener('click', () => {
    modalBg.style.backgroundColor = '';
});




