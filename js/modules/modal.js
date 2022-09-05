function openModal (modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // убираем скролл
    console.log(modalTimerID);
    if (modalTimerID) {
        clearInterval(modalTimerID); // если клиент уже открывал модалку, останавливаем таймер
    }
    
    } 
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

function modal(btnSelector, modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector),
    btnOpenModal = document.querySelectorAll(btnSelector);
    //console.log(btnCloseModal);

    btnOpenModal.forEach(item => {
    item.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    });

    modal.addEventListener('click', (event) => { // нажатие на темную область
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modal.classList.contains('show')) { //если нажимаем esc И если модалка открыта
        closeModal(modalSelector);
    }
    });
    // вызов модалки через какое то время

    function showModalByScroll () { // если клиент долистал до конца страницы ,вызываем модалку
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal(modalSelector, modalTimerID);
        window.removeEventListener('scroll', showModalByScroll); // чтобы окно открывалось тольок один раз при долистывании
    }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};