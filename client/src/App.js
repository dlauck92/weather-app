import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'; // Import weather icons

function App() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [darkMode, setDarkMode] = useState(false); // Commented out for debugging

  // useEffect(() => {
  //   const savedMode = localStorage.getItem('darkMode') === 'true';
  //   setDarkMode(savedMode);
  // }, []);

  // const toggleDarkMode = () => {
  //   setDarkMode((prevMode) => {
  //     localStorage.setItem('darkMode', !prevMode);
  //     return !prevMode;
  //   });
  // };

  const handleGetWeather = async () => {
    setLoading(true);
    try {
      setError('');
      setWeather(null);

      if (!city.trim() || !state.trim()) {
        setError('City and state are required.');
        return;
      }

      // Fetch coordinates
      const coordsResponse = await axios.post('http://localhost:5000/get-coords', {
        city,
        state,
      });

      if (!coordsResponse.data.lat || !coordsResponse.data.lng) {
        setError('Failed to retrieve coordinates. Please check your input.');
        return;
      }

      const { lat, lng } = coordsResponse.data;

      // Fetch weather data
      const weatherResponse = await axios.post('http://localhost:5000/get-weather', {
        lat,
        lng,
      });

      setWeather(weatherResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Function to determine which icon to display
  const getWeatherIcon = (periodName, detailedForecast) => {
    const lowerCaseName = periodName.toLowerCase(); // Convert period name to lowercase
    const lowerCaseForecast = detailedForecast.toLowerCase(); // Convert forecast text to lowercase

    // Prioritize "rain" in the forecast
    if (lowerCaseForecast.includes('rain')) {
      return <WiRain size={50} color="#3498db" />;
    }
    // Match "snow" in the forecast
    else if (lowerCaseForecast.includes('snow')) {
      return <WiSnow size={50} color="#ffffff" />;
    }
    // Match "storm" or "thunderstorm" in the forecast
    else if (lowerCaseForecast.includes('storm') || lowerCaseForecast.includes('thunderstorm')) {
      return <WiThunderstorm size={50} color="#ffcc00" />;
    }
    // Match "night" in the period name
    else if (lowerCaseName.includes('night')) {
      return <WiNightClear size={50} color="#2c3e50" />;
    }
    // Match "cloud" in the forecast
    else if (lowerCaseForecast.includes('cloud')) {
      return <WiCloudy size={50} color="#7f8c8d" />;
    }
    // Match "sunny" or "clear" in the forecast
    else if (lowerCaseForecast.includes('sunny') || lowerCaseForecast.includes('clear')) {
      return <WiDaySunny size={50} color="#f39c12" />;
    }

    // Default icon
    return <WiCloudy size={50} color="#7f8c8d" />;
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Weather App</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <div className="col-sm-12 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleGetWeather();
                  }
                }}
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGetWeather(); // Trigger the button's functionality
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={handleGetWeather}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
      </div>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      {weather && (
        <div className="mt-5">
          <h2 className="text-center">Weather Forecast</h2>
          <div className="container">
            {weather.properties.periods.reduce((rows, period, index) => {
              if (index % 2 === 0) {
                rows.push([period]); // Start a new row
              } else {
                rows[rows.length - 1].push(period); // Add to the last row
              }
              return rows;
            }, []).map((row, rowIndex) => (
              <div key={rowIndex} className="row justify-content-center mb-3">
                {row.map((period) => (
                  <div key={period.number} className="col-sm-12 col-md-6">
                    <div className="card">
                      <div className="card-body text-center">
                        {getWeatherIcon(period.name, period.detailedForecast)}
                        <h5 className="card-title mt-3">{period.name}</h5>
                        <p className="card-text">{period.detailedForecast}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
