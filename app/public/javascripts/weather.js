import {renderImageTodayWeatherType , renderImageCardWeatherType} from './weather-type.js';
const d = document;

const cb = ()=>{

}

d.addEventListener('DOMContentLoaded', (el) => {
    el.preventDefault();
    renderImageTodayWeatherType();
    renderImageCardWeatherType();
});