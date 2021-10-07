const puppeteer = require('puppeteer');
const link = 'https://zakon.rada.gov.ua/laws/show/80731-10#Text';
const Data = require('./data');
const Section = require('./section');

class AdministrativeOfenses {

    start = async () => {
        let browser = await puppeteer.launch({headless: true, slowMo: 100, devtools: true});
        let page = await browser.newPage();
        await page.setViewport({
            width: 1400,
            height: 900
        });

        await page.goto(link, {waitUntil: 'domcontentloaded'});

        setTimeout(async () => {

            await Data.setElements(await page.evaluate(async () => {
                let totalEm = Array.from(await document.getElementsByTagName('em'));
                let totalI = Array.from(await document.getElementsByTagName('i'));
                let totalDif = Array.from(await document.getElementsByClassName('dif'));

                for (let i = 0; i < totalEm.length; i++) {
                    await totalEm[i].remove();
                }
                for (let i = 0; i < totalI.length; i++) {
                    await totalI[i].remove();
                }
                for (let i = 0; i < totalDif.length; i++) {
                    await totalDif[i].remove();
                }

                let children = await document.getElementsByClassName('rvts0')[0].children;

                let dataParsed = [];

                for (let i = 0; i < children.length; i++) {
                    if (i > 0) {
                        if (children[i].children[0].localName === 'a') {
                            dataParsed.push({
                                data: children[i].children[0].dataset.tree,
                                HTML: {
                                    innerText: children[i].innerText,
                                }
                            });
                        } else {
                            dataParsed.push({
                                data: children[i].children[0].children[0].dataset.tree,
                                HTML: {
                                    innerText: children[i].innerText,
                                }
                            });
                        }
                    }
                }

                return dataParsed;

            }), Section.start);


        }, 1200);

    }

}

module.exports = new AdministrativeOfenses();