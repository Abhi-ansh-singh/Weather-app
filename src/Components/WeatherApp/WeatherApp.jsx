import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  CLEAR_IMAGE,
  CLOUD_IMAGE,
  DRIZZLE_IMAGE,
  HUMIDITY_IMAGE,
  RAIN_IMAGE,
  SNOW_IMAGE,
  WIND_IMAGE,
} from "../../config";
import "./WeatherApp.css";
import { fetchWeatherData } from "../../module";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchWeatherData(search);
      setData(result);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherImage = () => {
    if (!data) return null;

    const conditionCode = data.weather[0].icon;
    switch (conditionCode) {
      case "01d":
      case "01n":
        return CLEAR_IMAGE;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return CLOUD_IMAGE;
      case "09d":
      case "09n":
        return RAIN_IMAGE;
      case "10d":
      case "10n":
        return DRIZZLE_IMAGE;
      case "13d":
      case "13n":
        return SNOW_IMAGE;
      default:
        return CLEAR_IMAGE;
    }
  };

  const handleSearch = async () => {
    if (search) await searchData();
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") await handleSearch();
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter your City"
          value={search.trim()}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn"
          type="submit"
          onClick={handleSearch}
          disabled={isLoading}
        >
          <CiSearch size={25} />
        </button>
      </div>
      {data && (
        <div className="result-container">
          <div className="search-detail">
            <img src={getWeatherImage()} alt="weather" />
            <h2>{Math.floor(data.main.temp - 273.15)} °C</h2>
            <h3>{data.name}</h3>
          </div>
          <div className="sub-detail">
            <div className="wind-area">
              <img src={WIND_IMAGE} alt="wind" />
              <div>
                <h3>{Math.floor(data.wind.speed)} km/h</h3>
                <p>Wind</p>
              </div>
            </div>
            <div className="humidity-area">
              <img src={HUMIDITY_IMAGE} alt="humidity" />
              <div>
                <h3>{data.main.humidity} %</h3>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
