const e = require("express")
const { validator } = require("./validator")

module.exports = {
    formatFile: (fileName, fileBody) => {
        const lines = []
        for (const line of fileBody) {

            //Validate all atributes in the line
            if (validator(line)) {
                lines.push({ text: line.text, number: Number(line.number), hex: line.hex })
            }
        }

        return ({ "file": fileName, "lines": lines })
    },
}