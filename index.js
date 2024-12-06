const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

// Middleware to serve static files and enable CORS
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON requests

// Set up the route to serve the HTML page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Weather API route
app.post("/weather", async (req, res) => {
    const city = req.body.city;
    const API_KEY = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const weather = response.data;

        // Send JSON data to the frontend
        res.json({
            city: weather.name,
            temperature: weather.main.temp,
            description: weather.weather[0].description,
        });
    } catch (error) {
        console.error("Error fetching weather data:", error); // Log the error for debugging
        res.status(500).json({ error: "Unable to fetch weather data." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
