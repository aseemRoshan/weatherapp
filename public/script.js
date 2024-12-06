const form = document.getElementById("weatherForm");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const city = formData.get("city");

    try {
        const response = await fetch("/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ city }),
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <p>City: ${data.city}</p>
                <p>Temperature: ${data.temperature}°C</p>
                <p>Condition: ${data.description}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Unable to fetch weather data.</p>`;
    }
});

