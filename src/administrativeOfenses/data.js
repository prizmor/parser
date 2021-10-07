const fs = require('fs');

class Data {
    elements = [];
    json = {
        document: []
    };

    setElements = async (data, next) => {
        this.elements = data;
        next();
    }

    generateJson = () => {
        fs.writeFile('./src/files/AdministrativeOfenses.json', JSON.stringify(this.json), ( err) => {
            if (!err) {
                console.log('Кодекс України про адміністративні правопорушення - создан')
            }
        })
    }
}

module.exports = new Data();