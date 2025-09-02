const weatherForm = document.querySelector('form');
const search = document.querySelector('#location-input') || document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const weatherResult = document.querySelector('#weather-result');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value.trim();
    
    if (!location) {
        showError('Prosím zadejte lokaci');
        return;
    }
    
    showLoading();
    
    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                showError(data.error);
            } else {
                showWeather(data);
            }
        });
    }).catch(() => {
        showError('Nastala chyba při načítání dat');
    });
});

function showLoading() {
    weatherResult.classList.add('loading');
    message1.textContent = 'Načítám předpověď...';
    message2.innerHTML = '';
}

function showError(errorMessage) {
    weatherResult.classList.remove('loading');
    message1.innerHTML = `<span class="error">${errorMessage}</span>`;
    message2.innerHTML = '';
}

function showWeather(data) {
    weatherResult.classList.remove('loading');
    message1.innerHTML = `<div class="location">${data.location}</div>`;
    if (data.icon) {
        message2.innerHTML = `
            <div class="weather-info">
                <img class="weather-icon" src="${data.icon}" alt="${data.forecast || 'weather icon'}" />
                <div class="weather-text">
                    <div class="forecast">${data.forecast}</div>
                </div>
            </div>
        `;
    } else {
        message2.innerHTML = `
            <div class="weather-text">
                <div class="forecast">${data.forecast}</div>
                <div class="forecast">Teplota: ${data.temperature}</div>
            </div>
        `;
    }
}