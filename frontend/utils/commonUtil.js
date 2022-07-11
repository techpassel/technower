const parseQuesyString = (url) => {
    const questString = url.split("?");
    let result = {};
    if (questString.length > 1) {
        let stringItems = questString[1].split("&");
        stringItems.forEach(e => {
            let data = e.split("=");
            if (data[0] && data[0] != null)
                result = { ...result, [data[0]]: data[1] }
        })
    }
    return result;
}

const isValidEmail = (email) => {
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

const capitalizeFirstLetter = (str) => {
    return str.substr(0,1).toUpperCase() + str.substr(1);
}

export {
    parseQuesyString,
    isValidEmail,
    capitalizeFirstLetter
}