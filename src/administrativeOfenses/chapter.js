const Data = require('./data');
const Article = require('./article');

class Chapter {

    chaptersIndex = [];

    start = () => {
        //получение индекса и сетанья
        this.getChapterIndex();

        Article.start();
    };

    getChapterIndex = () => {
        for (let dcI = 0; dcI < Data.json.document.length; dcI++) {
            this.chaptersIndex.push([])

            let localChapters = [];
            let localPartsChapters = [];

            if (Data.json.document[dcI].parts.length === 1) {
                for (let glI = 0; glI < Data.json.document[dcI].parts[0].chapters.length; glI++) {
                    let title = {...Data.json.document[dcI].parts[0].chapters[glI].data}
                    if (title[0] + title[1] === 'gl') {
                        localChapters.push(glI);
                    }
                }

                Data.json.document[dcI].parts[0].chapters = this.setChapter(Data.json.document[dcI].parts[0].chapters, localChapters);
            } else {
                for (let prI = 0; prI < Data.json.document[dcI].parts.length; prI++) {
                    localPartsChapters.push([]);
                    for (let cI = 0; cI < Data.json.document[dcI].parts[prI].chapters.length; cI++) {
                        let title = {...Data.json.document[dcI].parts[prI].chapters[cI].data}

                        if (title[0] + title[1] === 'gl') {
                            localPartsChapters[prI].push(cI);
                        }
                    }
                    Data.json.document[dcI].parts[prI].chapters = this.setChapter(Data.json.document[dcI].parts[prI].chapters, localPartsChapters[prI]);
                }
            }

        }
    }

    setChapter = (list, index) => {
        let localChapters = [];


        for (let i = 0; i < index.length; i++) {

            localChapters.push({
                label: list[index[i]].HTML.innerText.split('\n')[0],
                name: list[index[i]].HTML.innerText.split('\n')[1],
                type: 'chapter',
                articles: []
            })

            if (i < index.length - 1) {
                for (let s = index[i]; s < index[i + 1]; s++) {
                    localChapters[i].articles.push(list[s]);
                }
            } else {
                for (let s = index[i]; s < list.length; s++) {
                    localChapters[i].articles.push(list[s]);
                }
            }

            localChapters[i].articles.splice(index[0], 1);
        }

        return localChapters;
    }
}

module.exports = new Chapter();