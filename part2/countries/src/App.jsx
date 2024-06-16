import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const showCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {selectedCountry && <CountriesList countries={[selectedCountry]} />}
      <CountriesList countries={filteredCountries} showCountry={showCountry} />
    </div>
  );
}

export default App;
