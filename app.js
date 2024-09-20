const API_KEY = "9e30909cbd3edb79628106c25353ab76";


const searchTemperature = () => {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none'; 
    document.getElementById('weather-section').style.display = 'none'; 

    const city = document.getElementById('city-name').value;

    if (!city) {
        showError('Please enter a city!');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.cod)
            if (data.cod === 200) {
                displayTemperature(data);
                console.log(data)
            } else {
                showError('City not found. Please try again.');
            }
        })
        .catch(() => {
            showError('Something went wrong. Please try again.');
        });
};

document.getElementById('search-button').addEventListener('click', searchTemperature);

const displayTemperature = (temperature) => {
    setInnerText('city', `${temperature.name} , ${temperature.sys.country}`); 
    setInnerText('temp', temperature.main.temp);
    setInnerText('feels-like', `Feels like: ${temperature.main.feels_like}`); 
    setInnerText('weather', temperature.weather[0].description);
    setInnerText('humidity',`Humidity: ${temperature.main.humidity}%`);
    setInnerText('wind-speed', `Wind Speed: ${temperature.wind.speed} km/h`); 

    const imgIcon = document.getElementById('image-icon');
    const iconUrl = `http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
    imgIcon.setAttribute('src', iconUrl);

    document.getElementById('weather-section').style.display = 'block';
};

const setInnerText = (id, text) => {
    const element = document.getElementById(id);
    element.innerText = text;
};

const showError = (message) => {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.innerText = message;
    errorMessageDiv.style.display = 'block'; 
    document.getElementById('weather-section').style.display = 'none'; 
};

document.getElementById('city-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        searchTemperature(); 
    }
});

