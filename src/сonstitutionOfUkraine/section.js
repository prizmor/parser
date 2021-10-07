const Data = require('./data');
const Article = require('./article');

class Section {

    sectionsIndex = [];
    sections = [];


    start = () => {
        //получаем индексы
        this.getSectionsIndex();

        //получаем разделы
        this.getSections();

        //сетаем разделы
        this.setSections();

        Article.start();
    };

    getSectionsIndex = () => {
        for (let i = 0; i < Data.elements.length; i++) {
            let title = {...Data.elements[i].data}

            if (title[0] + title[1] === 'rz') {
                this.sectionsIndex.push(i);
            }
        }
    };

    getSections = () => {
        for (let i = 0; i < this.sectionsIndex.length; i++) {

            let localSections = []

            if (i < this.sectionsIndex.length - 1) {
                for (let p = this.sectionsIndex[i]; p < this.sectionsIndex[i + 1]; p++) {
                    localSections.push(Data.elements[p])
                }
            } else {
                for (let p = this.sectionsIndex[i]; p < Data.elements.length; p++) {
                    localSections.push(Data.elements[p])
                }
            }

            this.sections.push(localSections);

        }
    };

    setSections = () => {
        for (let i = 0; i < this.sections.length; i++) {
            Data.json.document.push({
                label: this.sections[i][0].HTML.innerText.split('\n')[0].trim() + '.',
                name: this.sections[i][0].HTML.innerText.split('\n')[1].trim(),
                type: 'section',
                articles: []
            })

            this.sections[i].splice(0, 1);

            Data.json.document[i].articles = this.sections[i];
        }
    };

}

module.exports = new Section();