// Modal window
const btn_open_modal = document.querySelector('#open-modal');
const btn_close_modal = document.querySelector('#close-modal');
let modal_window = document.querySelector('.back-blur');

btn_open_modal.addEventListener('click', () => {
    modal_window.classList.remove('hidden');
});
btn_close_modal.addEventListener('click', () => {
    modal_window.classList.add('hidden');
});