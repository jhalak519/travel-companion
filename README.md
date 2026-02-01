# Travel Companion

Your ultimate travel companion application to discover restaurants, hotels, and attractions around you. Built with React and Mapbox.

# Demo

https://travel-companion-jhalak.netlify.app/

## Features

- **Interactive Map**: Explore places on a dynamic map using Mapbox.
- **Discover Places**: Find restaurants, hotels, and attractions based on your location.
- **Search & Filter**: Filter places by rating and sort them by reviews or ranking.
- **Place Details**: View detailed information including images, awards, cuisine, and contact info.
- **Favorites**: Save your favorite places for quick access.
- **Directions**: Get directions from your current location to a selected place.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **Map Integration**: Mapbox GL JS (`react-map-gl`)
- **Data Source**: RapidAPI (Travel Advisor API)
- **Icons**: React Icons
- **HTTP Client**: Axios

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

You also need API keys for:
- [Mapbox](https://www.mapbox.com/)
- [RapidAPI (Travel Advisor)](https://rapidapi.com/apidojo/api/travel-advisor)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_MAPBOX_TOKEN=your_mapbox_access_token
   VITE_RAPIDAPI_KEY=your_rapidapi_key
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

## Usage

- **Browse the Map**: Move around the map to automatically load places in that area.
- **Filter**: Use the sidebar to switch between Restaurants, Hotels, and Attractions.
- **View Details**: Click on a marker or a list item to see more details.
- **Get Directions**: Select a place and click "Get Directions" to see the route.

## License

This project is licensed under the MIT License.
