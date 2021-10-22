const d = document,
    $imgWeatherToday = d.querySelector('.container_info-basic_information-img'),
    $imgWeatherDays = d.querySelectorAll('.container_detail-detail_days-card_day-img'),
    $cloudy = '../images/Cloudy.svg',
    $isolatedThunderstorms = '../images/Isolated Thunderstorms.svg',
    $mostlyCloudy = '../images/Mostly Cloudy.svg',
    $rain = '../images/Rain.svg',
    $scatteredShowers = '../images/Scattered Showers.svg',
    $sunny = '../images/Sunny.svg',
    $thunderstorm = '../images/Thunderstorm.svg';

const injectImg = (el) => {
    if (el.alt === 'Cloudy')
        el.src = $cloudy;
    else if (el.alt === 'Isolated Thunderstorms')
        el.src = $isolatedThunderstorms;
    else if (el.alt === 'Mostly Cloudy' || el.alt === 'Partly Cloudy')
        el.src = $mostlyCloudy;
    else if (el.alt === 'Rain')
        el.alt = $rain;
    else if (el.alt === 'Scattered Showers')
        el.src = $scatteredShowers;
    else if (el.alt === 'Sunny')
        el.src = $sunny;
    else if (el.alt === 'Thunderstorm')
        el.src = $thunderstorm;
};

export function renderImageCardWeatherType() {
    for (const $imgDay of $imgWeatherDays) {
        injectImg($imgDay);
    }
};

export function renderImageTodayWeatherType() {
    injectImg($imgWeatherToday);
};