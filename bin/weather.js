const puppeteer = require('puppeteer');

const weatherToday = async (page) => {
    await page.waitForSelector('div[data-testid="CurrentConditionsContainer"]');
    return await page.evaluate(() => {
        const $d = document,
            $sectionInformation = $d.querySelector('div[data-testid="CurrentConditionsContainer"]'),
            infoToday = {
                location: $sectionInformation.querySelector('h1.CurrentConditions--location--kyTeL').textContent,
                timestamp: $sectionInformation.querySelector('div.CurrentConditions--timestamp--23dfw').textContent,
                tempValue: $sectionInformation.querySelector('span.CurrentConditions--tempValue--3a50n').textContent,
                phraseValue: $sectionInformation.querySelector('div.CurrentConditions--phraseValue--2Z18W').textContent
            }
        return infoToday;
    })
}

const detailWeatherToday = async (page) => {
    await page.waitForSelector('section[data-testid="TodaysDetailsModule"]');
    return await page.evaluate(() => {
        const $d = document,
            $sectionInformation = $d.querySelector('section[data-testid="TodaysDetailsModule"]'),
            $details = $sectionInformation.querySelectorAll('div[data-testid="WeatherDetailsListItem"]'),
            tagContentDetail = 'span';
        $details[1].querySelector(tagContentDetail + ' svg').remove();
        $details[4].querySelector(tagContentDetail + ' svg').remove();
        details = {
            highLow: $details[0].querySelector(tagContentDetail).textContent,
            wind: $details[1].querySelector(tagContentDetail).textContent,
            humidity: $details[2].querySelector(tagContentDetail).textContent,
            dewPoint: $details[3].querySelector(tagContentDetail).textContent,
            pressure: $details[4].querySelector(tagContentDetail).textContent,
            uvIndex: $details[5].querySelector(tagContentDetail).textContent,
            visibility: $details[6].querySelector(tagContentDetail).textContent,
        };
        return details;
    })
}

const weatherFiveDays = async (page) => {
    await page.waitForSelector('section[data-testid="DailyWeatherModule"]');
    return page.evaluate(() => {
        const $d = document,
            $section = $d.querySelector('section[data-testid="DailyWeatherModule"]'),
            $liDays = $section.querySelectorAll('li'),
            infoDays = [];
        for ($li of $liDays) {
            $li.querySelector('div[data-testid="SegmentPrecipPercentage"] span span').remove();
            infoDays.push({
                day: $li.querySelector('h3.Column--label--3QyFS.Column--default--1lfv3 span').textContent,
                highTempValue: $li.querySelector('div[data-testid="SegmentHighTemp"] span').textContent,
                lowTempValue: $li.querySelector('div[data-testid="SegmentLowTemp"] span').textContent,
                precipPercentage: $li.querySelector('div[data-testid="SegmentPrecipPercentage"] span').textContent,
                phraseValue: $li.querySelector('.Icon--icon--3wCKh.Icon--fullTheme--3ns8p').textContent
            })
        }

        return infoDays;
    })
}

const getDataWeather = async (lat, lon) => {
    let browser = page = detailsWeatherToday = weatherInfo = weatherInfoFiveDays = null;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
        page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
        });
        await page.goto(`https://weather.com/weather/today/l/${lat},${lon}`);

        weatherInfo = await weatherToday(page);
        detailsWeatherToday = await detailWeatherToday(page);
        weatherInfoFiveDays = await weatherFiveDays(page);

        await browser.close();
        return {
            weatherInfo,
            detailsWeatherToday,
            weatherInfoFiveDays
        }
    } catch (error) {
        console.log(error)
    }

};


module.exports.getDataWeather = getDataWeather;