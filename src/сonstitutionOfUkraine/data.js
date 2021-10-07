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
        fs.writeFile('./src/files/ConstitutionOfUkraine.json', JSON.stringify(this.json), ( err) => {
            if (!err) {
                console.log('Конституція України - создан')
            }
        })
    }
}

module.exports = new Data();