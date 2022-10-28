'use strict';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-12-11');
    modal('[data-modal]', '.modal', modalTimerID);
    cards();
    forms('form', modalTimerID);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextBtn: '.offer__slider-next',
        prevBtn: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();


});