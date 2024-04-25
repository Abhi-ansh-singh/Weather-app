// import React from "react";

import axios from "axios";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import WindImage from "../../assets/wind.png";
import HumidityImage from "../../assets/humidity.png";
import CloudImage from "../../assets/cloud.png";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const API_key = "518d95e10140ac7e78ff511fde883ee1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}`;

  const searchData = async () => {
    const response = await axios.get(url);
    const result = response.data;
    console.log(result);
    setData(result);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter your City"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" type="submit" onClick={searchData}>
          <CiSearch size={25} />
        </button>
      </div>
      <div>
        {data ? (
          <div className="result-container">
            <div className="main-detail">
              <img src={CloudImage} alt="" />
              <h2>{Math.floor(data.main?.temp - 273.15)} °C</h2>
              <h3>{data.name}</h3>
            </div>
            <div className="sub-detail">
              <div className="wind-area">
                <img src={WindImage} alt="wind image" />
                <h3>{Math.floor(data.wind?.speed)} km/h</h3>
              </div>
              <div className="humidity-area">
                <img src={HumidityImage} alt="wind image" />
                <h3>{data.main?.humidity} %</h3>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherApp;
