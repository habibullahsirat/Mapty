'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
    #map;
    #mapEvent;
    constructor() {
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this));

inputType.addEventListener('change', 
    function() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
    };

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
                alert('Could not get your location!');
            })
        }
    };

    _loadMap(position) {
        const {longitude} = position.coords;
        const {latitude} = position.coords;
        const coords = [latitude, longitude];

        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        this.#map = L.map('map').setView(coords, 13);
        // console.log(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
        .addTo(this.#map);
        //Handling clicks on map
        this.#map.on('click', function(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
        })
    };

    _showForm() {};

    _toggleElevationField() {};

    _newWorkout(e) {
        e.preventDefault();
        
        //Clear input fields
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
        
        // console.log(mapEvent);
        const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat, lng]).addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            })
        )
        .setPopupContent('Walking')
        .openPopup();
    };
}

const app = new App();