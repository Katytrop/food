// Формы, использование устаревнего способа без fetch через json
/* const forms = document.querySelectorAll('form');
const message = {
    loading: "icons/spinner.svg",
    success: "Спасибо, мы скоро с вами свяжемя!",
    failure: "Что то пошло не так..."
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img'); // создаем ответ пользователю
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;`; 
        form.insertAdjacentElement('afterend', statusMessage); // добавляем в конец формы

        const request = new XMLHttpRequest(); // начинаем запрос
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form); // всегда прописывать у формы name

        const object = {}; // переводим формдату в формат json
        formData.forEach(function(value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);

        request.send(json);
        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                showthanksModal(message.success);
                form.reset(); // очистить инпуты после заполнения и отправки
                statusMessage.remove();
            } else {
                showthanksModal(message.failure);
            }
        });

    });
} */

/* // использование форм через форм дату
const forms = document.querySelectorAll('form');
const message = {
    loading: "Загрузка",
    success: "Спасибо, мы скоро с вами свяжемcя!",
    failure: "Что то пошло не так..."
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        const formData = new FormData(form);
        request.send(formData);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                statusMessage.textContent = message.success;
                form.reset();
                //console.log(request.response);
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
} */

/* // Формы fetch без json через форм дату

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "icons/spinner.svg",
        success: "Спасибо, мы скоро с вами свяжемя!",
        failure: "Что то пошло не так..."
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // создаем ответ пользователю
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`; 
            form.insertAdjacentElement('afterend', statusMessage); // добавляем в конец формы

            const formData = new FormData(form); // всегда прописывать у формы name

            fetch('server.php', {
                method: "POST",
                body: formData
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showthanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showthanksModal(message.failure);
            }).finally(() => {
                form.reset(); // очистить инпуты после заполнения и отправки
            });
        });
    } */

    /* // Формы fetch через json

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "icons/spinner.svg",
        success: "Спасибо, мы скоро с вами свяжемя!",
        failure: "Что то пошло не так..."
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // создаем ответ пользователю
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`; 
            form.insertAdjacentElement('afterend', statusMessage); // добавляем в конец формы

            const formData = new FormData(form); // всегда прописывать у формы name
            const object = {}; // переводим формдату в формат json
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showthanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showthanksModal(message.failure);
            }).finally(() => {
                form.reset(); // очистить инпуты после заполнения и отправки
            });
        });
    } */


function showthanksModal(message) { // функция замены модального окна
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide'); // прячем старое окно
    openModal(); 

    const thanksModal = document.createElement('div'); // создаем новое
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal); // убираем окно спасибо через 4сек
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 3000);

}

// КАРТОЧКИ без классов //

const getResource = async (url) => {// функция отвечает за постинг данных, когда они отправляются на сервер
    const result = await fetch(url); // async await для того чтобы дождаться ответа с сервера, 
    //await ставим перед тем что нужно дождаться
    if(!result.ok) { // если запрос не 200(ок) а ошибка
       throw new Error(`Could not fetch ${url}, status: ${result.status}`); // то выкидываем ошибку 
    }
    return await result.json(); // возвращает ответ сервера в json
};

getResource('http://localhost:3000/menu')
    .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML  = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>`;
            document.querySelector('.menu .container').append(element);
        });
    }

    // простой SLAIDER //
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
          let slideIndex = 1;

    showSlide(slideIndex);
 
    if(slideIndex < 10) { // обозначаем общее количество слайдов
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    
    function showSlide(n) {
        if(n > slides.length) { // если n больше количества слайдов, переходим в начало
            slideIndex = 1;
        }
        if(n < 1) { // если n меньше 1 то переходим в конец слайдера
            slideIndex = slides.length;
        }

        slides.forEach( item => { // скрываем слайды
            item.classList.add('hide');
        });
        
        slides[slideIndex - 1].classList.add('show');// показать нужный слайд и его номер
        slides[slideIndex - 1].classList.remove('hide');
        
        if(slides.length < 10) { 
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function changeSlide(n) {
        showSlide(slideIndex += n);
    }

    next.addEventListener('click', () => {
        changeSlide(1);
    });

    prev.addEventListener('click', () => {
        changeSlide(-1);
    });