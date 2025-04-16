from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Replace with your Google Maps API key
load_dotenv()

@app.route('/get-coords', methods=['POST'])
def get_coords():
    data = request.json
    city = data.get('city')
    state = data.get('state')

    if not city or not state:
        return jsonify({"error": "City and state are required"}), 400

    # Fetch coordinates from Google Maps API
    maps_url = f"https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": f"{city}, {state}", "key": os.getenv("GOOGLE_MAPS_API_KEY")}
    response = requests.get(maps_url, params=params)
    maps_data = response.json()

    if response.status_code != 200 or not maps_data.get('results'):
        return jsonify({"error": "Failed to fetch coordinates"}), 500

    coords = maps_data['results'][0]['geometry']['location']
    return jsonify({"lat": coords['lat'], "lng": coords['lng']})


@app.route('/get-weather', methods=['POST'])
def get_weather():
    data = request.json
    lat = data.get('lat')
    lng = data.get('lng')

    if not lat or not lng:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    # Fetch weather data from National Weather Service API
    weather_url = f"https://api.weather.gov/points/{lat},{lng}"
    response = requests.get(weather_url)
    weather_data = response.json()

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch weather data"}), 500

    # Extract forecast URL
    forecast_url = weather_data.get('properties', {}).get('forecast')
    if not forecast_url:
        return jsonify({"error": "Forecast URL not found"}), 500

    # Fetch forecast data
    forecast_response = requests.get(forecast_url)
    forecast_data = forecast_response.json()

    if forecast_response.status_code != 200:
        return jsonify({"error": "Failed to fetch forecast data"}), 500

    return jsonify(forecast_data)

if __name__ == '__main__':
    app.run(debug=True)