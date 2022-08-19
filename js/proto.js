// Формы, использование устаревнего способа без fetch

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
}

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
        //request.setRequestHeader('Content-type', 'application/json');
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

/* // Формы? fetch без json

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