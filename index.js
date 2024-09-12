const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'f2e728ded963713dbf00c108e08f9a8a';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            if (!json.weather || json.weather.length === 0) {
                console.error('Weather data is not available.');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            const weatherMain = json.weather[0]?.main || 'Unknown';
            const weatherDescription = json.weather[0]?.description || 'No description available';
            const temp = json.main?.temp || 'N/A';
            const humidityValue = json.main?.humidity || 'N/A';
            const windSpeed = json.wind?.speed || 'N/A';

            switch (weatherMain) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(temp)}<span>°C</span>`;
            description.innerHTML = weatherDescription;
            humidity.innerHTML = `${humidityValue}%`;
            wind.innerHTML = `${parseInt(windSpeed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
        });

});
