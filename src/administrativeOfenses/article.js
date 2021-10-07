const Data = require('./data');


class Article {

    start = () => {
        this.getArticleIndex()

        Data.generateJson();
    };

    getArticleIndex = () => {
        for (let dcI = 0; dcI < Data.json.document.length; dcI++) {

            let localArticle = [];
            let localPartsArticle = [];

            if (Data.json.document[dcI].parts.length === 1) {
                for (let glI = 0; glI < Data.json.document[dcI].parts[0].chapters.length; glI++) {
                    for (let stI = 0; stI < Data.json.document[dcI].parts[0].chapters[glI].articles.length; stI++) {
                        let title = {...Data.json.document[dcI].parts[0].chapters[glI].articles[stI].data}

                        if (title[0] + title[1] === 'st') {
                            localArticle.push(stI);
                        }
                    }
                    Data.json.document[dcI].parts[0].chapters[glI].articles = this.setArticle(Data.json.document[dcI].parts[0].chapters[glI].articles, localArticle);
                }
            } else {
                for (let prI = 0; prI < Data.json.document[dcI].parts.length; prI++) {
                    localPartsArticle.push([]);
                    for (let glI = 0; glI < Data.json.document[dcI].parts[prI].chapters.length; glI++) {
                        localPartsArticle[prI].push([]);
                        for (let stI = 0; stI < Data.json.document[dcI].parts[prI].chapters[glI].articles.length; stI++) {
                            let title = {...Data.json.document[dcI].parts[prI].chapters[glI].articles[stI].data}

                            if (title[0] + title[1] === 'st') {
                                localPartsArticle[prI][glI].push(stI);
                            }
                        }
                        Data.json.document[dcI].parts[prI].chapters[glI].articles = this.setArticle(Data.json.document[dcI].parts[prI].chapters[glI].articles, localPartsArticle[prI][glI]);
                    }
                }
            }
        }
    }

    setArticle = (list, index) => {
        let article = []

        for (let i = 0; i < index.length; i++) {

            article.push({
                name: list[index[i]].HTML.innerText.split('.')[0].trim(),
                label: list[index[i]].HTML.innerText.split('.')[1].trim(),
                type: 'article',
                paragraphs: []
            })

            if (i < index.length - 1) {
                for (let s = index[i]; s < index[i + 1]; s++) {
                    article[i].paragraphs.push(list[s]);
                }
            } else {
                for (let s = index[i]; s < list.length; s++) {
                    article[i].paragraphs.push(list[s]);
                }
            }


            article[i].paragraphs.splice(index[0], 1);

            for (let e = 0; e < article[i].paragraphs.length; e++) {
                article[i].paragraphs[e] = article[i].paragraphs[e].HTML.innerText;
            }

        }

        return article;
    }

}

module.exports = new Article();