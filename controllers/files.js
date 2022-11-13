const tbxnet = require('../services/tbxnet')
const csv = require('csvtojson')
const formatFile = require('../util/format-files')

module.exports = {
    /* GET formated files from external API. */
    getData: async function (req, res, next) {
        const fileName = req.query.fileName
        try {
            let filesList = []
            let results = []

            //If there is a fileName as queryparam is not necesary to request the list of files
            filesList = fileName ? [fileName] : (await tbxnet.getFiles()).data.files

            //Request all files in the file list
            for (const file of filesList) {
                const fileCSV = (await tbxnet.getFile(file).catch(() => { }))?.data
                const fileJSON = await csv().fromString(fileCSV || "")

                //Format de file
                const fileFormated = formatFile.formatFile(file, fileJSON)

                //Push files with no empty lines
                if (fileFormated?.lines.toString() !== "") {
                    results.push(fileFormated)
                }
            }
            res.json(results)
        } catch (e) {
            console.log(e)
            e.status = 400
            next(e)
        }
    },

    /* GET files list from external API. */
    getList: async function (req, res, next) {
        try {
            const documents = await tbxnet.getFiles()
            res.json(documents.data)
        } catch (e) {
            console.log(e)
            e.status = 400
            next(e)
        }
    },
}