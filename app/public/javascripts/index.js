const d = document,
    n = navigator;

const cb = (position) => {
    let lat = position.coords.latitude,
        lon = position.coords.longitude;
    window.location.assign(`/${lat},${lon}`);
}

const err = (error) => {};

d.addEventListener('DOMContentLoaded', (el) => {
    el.preventDefault();
    n.geolocation.getCurrentPosition(cb, err);
});