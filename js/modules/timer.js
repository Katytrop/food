function timer(id, deadline) {

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
    setClock(id, deadline);
}

export default timer;