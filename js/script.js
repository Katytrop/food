'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // ТАБЫ //
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabsContent(i); 
                }
            });
        }
    });

    // ТАЙМЕР //
    const deadline = '2022-09-01';

    // функция расчитывает разницу между временем сейчас и дедлайном
    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // количество милисекунд 
              days = Math.floor(t / (1000 * 60 * 60 * 24)), //количество дней до окончания акции
              hours = Math.floor(t / (1000 * 60 * 60) % 24), // количество часов, через остаток от деления
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //  подставляем ноль если число единичное
    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // функция установки часов на страницу
    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);  // запускаем интервал раз в 1 сек   
        
        updateClock(); // запускаем ф-цию в ручную чтобы не было первой задержки в секунду
        // обновляет таймер каждую секунду
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // останавливаем таймер когда истечет время
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // МОДАЛЬНОЕ ОКНО //
    const modal = document.querySelector('.modal'),
          btnOpenModal = document.querySelectorAll('[data-modal]');
    //console.log(btnCloseModal);

    function openModal () {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // убираем скролл
        clearInterval(modalTimerID); // если клиент уже открывал модалку, останавливаем таймер
    } 
    btnOpenModal.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal () {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    modal.addEventListener('click', (event) => { // нажатие на темную область
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) { //если нажимаем esc И если модалка открыта
            closeModal();
        }
    });
    // вызов модалки через какое то время
    const modalTimerID = setTimeout(openModal, 50000);

    function showModalByScroll () { // если клиент долистал до конца страницы ,вызываем модалку
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // чтобы окно открывалось тольок один раз при долистывании
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // КАРТОЧКИ (используем классы для карточек) //

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; // для пересчета курса
            this.changeTOUAH();
        }

        changeTOUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {
           // this.changeTOUAH();
            const element = document.createElement('div');
            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
            this.classes.forEach(className => element.classList.add(className));
            }
           
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {// функция отвечает за постинг данных, когда они отправляются на сервер
        const result = await fetch(url); // async await для того чтобы дождаться ответа с сервера, 
        //await ставим перед тем что нужно дождаться
        if(!result.ok) { // если запрос не 200(ок) а ошибка
           throw new Error(`Could not fetch ${url}, status: ${result.status}`); // то выкидываем ошибку 
        }
        return await result.json(); // возвращает ответ сервера в json
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // деструктуризируем обьект по отдельным частям в {} скобках
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Формы

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "icons/spinner.svg",
        success: "Спасибо, мы скоро с вами свяжемя!",
        failure: "Что то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {// функция отвечает за постинг данных, когда они отправляются на сервер
        const result = await fetch(url, { // async await для того чтобы дождаться ответа с сервера, 
            method: "POST",              //await ставим перед тем что нужно дождаться
            headers: {
                'Content-type': 'application/json'
            },
            body: data //JSON.stringify(object)
        });
        return await result.json(); // возвращает ответ сервера в json
    };

    function bindPostData(form) { //привязка постинга данных
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // создаем ответ пользователю
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`; 
            form.insertAdjacentElement('afterend', statusMessage); // добавляем в конец формы

            const formData = new FormData(form); // всегда прописывать у формы name

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
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
    }

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

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


});