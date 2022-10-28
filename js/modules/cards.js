//import {getResource} from '../services/services';

function cards() {
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
            this.transfer = 35; // для пересчета курса
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
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    /* new MenuCard(
        "img/tabs/vegy.jpg", "vegy", "Меню 'Фитнес'", 
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        '.menu .container'
        ).render();
    new MenuCard(

    ).render();
    new MenuCard(

    ).render(); */

    const getResource = async (url) => {
        const result = await fetch(url); 
        return await result.json();
    };
    getResource('db.json')
        .then(res => res.menu.forEach(({img, altimg, title, descr, price}) => { 
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        }))

    /* getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // деструктуризируем обьект по отдельным частям в {} скобках
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }); */
        
}

export default  cards;