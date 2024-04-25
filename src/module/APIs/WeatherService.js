
import axios from "axios";
import { API_KEY, BASE_URL } from "../../config";

const fetchWeatherData = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        throw error;
    }
};

export default fetchWeatherData;