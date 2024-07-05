const regs = {
    email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    number:/^\+?[1-9][0-9]*$/,
    password:/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,}$/,
    version:/^[0-9\.]+$/
}

const verfiy = (rule,value,reg,callback) => {
    if (value) {
        if (reg.test(value)) {
            callback();
        }else {
            callback(new Error(rule.message));
        }
    }else {
        callback();
    }
}

const checkPassword = (value) => {
    return regs.password.test(value);
}

const checkEmail = (value) => {
    return regs.email.test(value);
}

// --------------------------------------

const email = (rule,value,callback) => {
    return verfiy(rule,value,regs.email,callback);
}

const password = (rule,value,callback) => {
    return verfiy(rule,value,regs.password,callback);
}

const number = (rule,value,callback) => {
    return verfiy(rule,value,regs.number,callback);
}

const version = (rule,value,callback) => {
    return verfiy(rule,value,regs.version,callback);
}

export default {
    checkPassword,
    checkEmail,
    email,
    password,
    number,
    version
}