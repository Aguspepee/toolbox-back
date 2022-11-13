const isCSVFileName = (value) => {
    return (value.endsWith('.csv'));
}

const isString = (value) => {
    return typeof (value) === 'string';
}

const isNumber = (value) => {
    const regex = /^-?\d+$/;
    return regex.test(value);
}

const isHex32Digits = (value) => {
    const regex = /\b[0-9A-Fa-f]{32}\b/g;
    return regex.test(value);
}

module.exports = {
    validator: (line) => {
        return (isCSVFileName(line.file) & isString(line.text) & isNumber(line.number) & isHex32Digits(line.hex))
    }
}