/* eslint-disable react/prop-types */
import React from "react";
import Country from "./Country";

function CountriesList({ countries, showCountry }) {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country} />;
  } else {
    return <div>No matches, specify another country</div>;
  }
}

export default CountriesList;
