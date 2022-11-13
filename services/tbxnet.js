const axios = require("axios");

//Create axios instance and set headers for all request
const instance = axios.create({
    baseURL: "https://echo-serv.tbxnet.com/v1/secret/"
})

//Fix header fot all request
instance.defaults.headers.common['Authorization'] = 'Bearer aSuperSecretKey'

module.exports = {
    //GET formated files from external API
    getFile: function (fileName) {
        return (instance.get(`file/${fileName}`));
    },

    //GET files list from external API
    getFiles: function () {
        return (instance.get(`files/`));
    }
}