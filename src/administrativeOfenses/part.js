const Data = require('./data');
const Chapter = require('./chapter');


class Part {

    partsIndex = [];
    parts = [];


    start = () => {

        //получаем индексы
        this.getPartsIndex();

        //получаем части
        this.getParts();

        //сетаем части
        this.setParts();


        Chapter.start();
    };

    getPartsIndex = () => {
        for (let dcI = 0; dcI < Data.json.document.length; dcI++) {
            let localParts = [];

            for (let i = 0; i < Data.json.document[dcI].parts.length; i++) {
                let title = {...Data.json.document[dcI].parts[i].data}

                if (title[0] + title[1] === 'pr') {
                    localParts.push(i);
                }
            }

            this.partsIndex.push(localParts);
        }
    };

    getParts = () => {
        let localParts = [];

        for (let i = 0; i < this.partsIndex.length; i++) {

            localParts.push([]);

            if (this.partsIndex[i].length !== 0) {

                for (let i2 = 0; i2 < this.partsIndex[i].length; i2++) {

                    localParts[i].push([]);

                    if (i2 + 1 !== this.partsIndex[i].length) {
                        for (let i3 = this.partsIndex[i][i2]; i3 < this.partsIndex[i][i2 + 1]; i3++) {
                            localParts[i][i2].push(Data.json.document[i].parts[i3])
                        }
                    } else {
                        for (let i3 = this.partsIndex[i][i2]; i3 < Data.json.document[i].parts.length; i3++) {
                            localParts[i][i2].push(Data.json.document[i].parts[i3])
                        }
                    }


                }
            }
        }

        this.parts = localParts;
    };

    setParts = () => {
        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i].length === 0) {
                let tmp = JSON.parse(JSON.stringify(Data.json.document[i].parts));
                Data.json.document[i].parts = [{
                    label: '',
                    type: 'part',
                    chapters: tmp
                }];
            } else {

                let localContent = []

                for (let i2 = 0; i2 < this.parts[i].length; i2++) {
                    let content = {
                        label: this.parts[i][i2][0].HTML.innerText.trim(),
                        type: 'part',
                        chapters: []
                    }

                    this.parts[i][i2].splice(0, 1);

                    content.chapters = this.parts[i][i2];
                    localContent.push(content);
                }

                Data.json.document[i].parts = localContent;
            }
        }
    };

}

module.exports = new Part();