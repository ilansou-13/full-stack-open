/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import weatherService from "../services/weather";

function Country({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather(country.capital[0]).then((weather) => setWeather(weather));
  }, [country.capital]);

  const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="200" />
      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {(weather.main.temp - 273.15).toFixed(0)} Celsius</div>
          <div>
            <img src={getIconUrl(weather.weather[0].icon)} alt={weather.weather[0].description} />
          </div>
          <div>wind {weather.wind.speed} m/s</div>
          <br />
        </div>
      )}
    </div>
  );
}

export default Country;
