# Weather App 🌦️

A responsive weather application that allows users to search for weather forecasts by city and state. The app provides detailed weather information, including icons representing the forecast (e.g., sunny, rainy, snowy), and supports features like responsive design and error handling.

---

## Features
- **Search Weather by City and State**: Enter a city and state to fetch the weather forecast.
- **Dynamic Weather Icons**: Displays weather-specific icons (e.g., rain, snow, sunny) based on the forecast.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Error Handling**: Displays user-friendly error messages for invalid input or API errors.

---

## Technologies Used
- **Frontend**: React, Bootstrap, React Icons
- **Backend**: Flask (Python), Flask-CORS
- **Weather Data**: National Weather Service API
- **Geocoding**: Google Maps Geocoding API

---

## How It Works
1. **User Input**: The user enters a city and state into the input fields.
2. **API Requests**:
   - The app sends a request to the Flask backend to fetch the latitude and longitude of the location using the Google Maps Geocoding API.
   - The backend then fetches weather data from the National Weather Service API.
3. **Display Weather**:
   - The app displays the weather forecast for the next several periods (e.g., "Today," "Tonight," "Monday").
   - Icons are dynamically chosen based on the forecast (e.g., rain, snow, sunny).
4. **Error Handling**:
   - If the user enters invalid input or the API fails, an error message is displayed.

---

## How to Run the App Locally

### Prerequisites
- **Frontend**: Node.js (v16 or higher), npm (v8 or higher)
- **Backend**: Python 3.9 or higher, pip, and virtualenv

### Steps
```bash
# 1. Clone the Repository
git clone https://github.com/your-username/weather-app.git
cd weather-app

# 2. Install Frontend Dependencies
cd client
npm install

# 3. Set Up Backend
cd ../backend
# Create a virtual environment
python -m venv venv
# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# Install Python dependencies
pip install -r requirements.txt
# Create a .env file and add your Google Maps API key
echo "GOOGLE_MAPS_API_KEY=your-google-maps-api-key" > .env

# 4. Start the Application (Frontend and Backend Simultaneously)
cd ../client
npm start
# The frontend will run on http://localhost:3000
# The backend will run on http://localhost:5000
```

---

## Project Structure

### The project is organized as follows:
```
weather-app/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # Entry point
│   └── public/            # Static assets
├── backend/               # Flask backend
│   ├── app.py             # Main Flask app
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Environment variables
├── package.json           # Frontend project metadata and dependencies
└── README.md              # Project documentation
```

---

## Environment Variables
The app requires the following environment variables to be set in the `backend/.env` file:
- `GOOGLE_MAPS_API_KEY`: Your Google Maps Geocoding API key.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments
- Weather data provided by the [National Weather Service API](https://www.weather.gov/documentation/services-web-api).
- Geocoding powered by the [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start).