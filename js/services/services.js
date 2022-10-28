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

/* const getResource = async (url) => {// функция отвечает за постинг данных, когда они отправляются на сервер
    const result = await fetch(url); // async await для того чтобы дождаться ответа с сервера, 
    //await ставим перед тем что нужно дождаться
    if(!result.ok) { // если запрос не 200(ок) а ошибка
       throw new Error(`Could not fetch ${url}, status: ${result.status}`); // то выкидываем ошибку 
    }
    return await result.json(); // возвращает ответ сервера в json
}; */

export {postData}; 
//export {getResource};