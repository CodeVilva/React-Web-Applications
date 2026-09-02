import { useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [locationText, setLocationText] = useState("");
  const [temperatureText, setTemperatureText] = useState("");
  const [dateTimeText, setDateTimeText] = useState("");
  const [weatherText, setWeatherText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserLocation = async () => {
    if (!("geolocation" in navigator)) {
      throw new Error("Geolocation not supported");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const getLocationName = async (lat, lon) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unknown Location");
    }

    return response.json();
  };

  const getApi = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,rain,snowfall,is_day,wind_speed_10m`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Cannot Fetch Data ${response.status}`);
    }

    return response.json();
  };

  const getWeatherDescription = (weatherCode) => {
    const weatherMap = [
      { max: 2, label: "Clear, mainly clear, partly cloudy" },
      { min: 3, max: 3, label: "Overcast" },
      { min: 45, max: 48, label: "Fog and depositing rime fog" },
      { min: 51, max: 57, label: "Drizzle and Freezing Drizzle" },
      { min: 61, max: 67, label: "Rain and Freezing Rain" },
      { min: 71, max: 77, label: "Snow fall and snow grains" },
      { min: 80, max: 82, label: "Rain and Snow showers" },
      { min: 95, max: 99, label: "Thunderstorm with optional hail" },
    ];

    const match = weatherMap.find(
      ({ min, max }) =>
        (min === undefined ? weatherCode <= max : max === undefined ? weatherCode >= min : weatherCode >= min && weatherCode <= max)
    );

    return match ? match.label : "Clear, mainly clear, partly cloudy";
  };

  const getWeather = async () => {
    setIsLoading(true);

    try {
      const { latitude, longitude } = await getUserLocation();
      const [locData, weatherData] = await Promise.all([
        getLocationName(latitude, longitude),
        getApi(latitude, longitude),
      ]);

      const current = weatherData.current;
      const formattedTemperature = `${current.temperature_2m} ${weatherData.current_units.temperature_2m}`;

      setLocationText(`${locData.city}, ${locData.countryName}`);
      setTemperatureText(formattedTemperature);
      setDateTimeText(current.time);
      setWeatherText(getWeatherDescription(current.weather_code));
    } catch (error) {
      console.error("Failed to get weather:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("capture-block");

    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const downloadLink = document.createElement("a");
      const imageURL = canvas.toDataURL("image/png");
      downloadLink.href = imageURL;
      downloadLink.download = "weather-block-capture.png";
      downloadLink.click();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Error: Unable to download the weather image.");
    }
  };

  return (
    <main>
      <div id="capture-block" className="capture-block">
        <div className="head">
          <center>
            <h1>Weather App ⛅</h1>
          </center>
        </div>
        <div className="data">
          <div className="field loc">
            <label>📍Location</label>
            <input value={locationText} disabled />
          </div>
          <div className="field temp">
            <label>☀️ Temperature</label>
            <input value={temperatureText} disabled />
          </div>
          <div className="field date-time">
            <label> 🗓️ Date/Time</label>
            <input value={dateTimeText} disabled />
          </div>
          <div className="field Weathercode">
            <label>📡 Weather</label>
            <input type="textarea" value={weatherText} disabled />
          </div>
        </div>
        <div className="btn-container">
          <button type="button" onClick={getWeather} disabled={isLoading} className="primary-btn">
            {isLoading ? "Loading..." : "Get Weather"}
          </button>
        </div>
        <div className="download-wrap">
          <button type="button" onClick={handleDownload} className="download-btn">
            Download
            <i className="fa-solid fa-download" style={{ color: "rgb(255, 212, 59)" }} />
          </button>
        </div>
        <span className="footer-note">
          Powered by <a href="https://open-meteo.com/">Open-meteo</a> & <a href="https://bigdatacloud.net/">Big Data Cloud</a> API
        </span>
      </div>
    </main>
  );
}

export default App;