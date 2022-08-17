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
          btnOpenModal = document.querySelectorAll('[data-modal]'),
          btnCloseModal = document.querySelector('[data-close]');
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
    btnCloseModal.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (event) => { // нажатие на темную область
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) { //если нажимаем esc И если модалка открыта
            closeModal();
        }
    });
    // вызов модалки через какое то время
    const modalTimerID = setTimeout(openModal, 6000);

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container',
        'menu__item'
    ).render();

    // Формы (сброс кеша шифт f5)

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "Загрузка",
        success: "Спасибо, мы скоро с вами свяжемя!",
        failure: "Что то пошло не так..."
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div'); // создаем ответ пользователю
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage); // добавляем в конец формы

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
                    statusMessage.textContent = message.success;
                    form.reset(); // очистить инпуты после заполнения и отправки
                    setTimeout(() => {
                        statusMessage.remove(); // удаляет сообщение через 5 секунд
                    }, 5000);
                } else {
                    statusMessage.textContent = message.failure;
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

    

});