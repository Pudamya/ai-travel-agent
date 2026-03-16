import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0]
}

function getDateRange(startDate, endDate) {
  const dates = []
  const current = new Date(startDate)
  const end = new Date(endDate)

  while (current <= end) {
    dates.push(formatDate(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

function summarizeForecast(entries, travelDates) {
  const grouped = {}

  for (const entry of entries) {
    const date = entry.dt_txt.split(" ")[0]

    if (!travelDates.includes(date)) continue

    if (!grouped[date]) {
      grouped[date] = []
    }

    grouped[date].push(entry)
  }

  const daily = Object.entries(grouped).map(([date, items]) => {
    const temps = items.map((i) => i.main?.temp ?? 0)
    const descriptions = items.map((i) => i.weather?.[0]?.description).filter(Boolean)

    const avgTemp =
      temps.length > 0
        ? Number((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1))
        : null

    const topDescription =
      descriptions.length > 0
        ? descriptions.sort(
            (a, b) =>
              descriptions.filter((x) => x === b).length -
              descriptions.filter((x) => x === a).length
          )[0]
        : "Unavailable"

    return {
      date,
      temperature: avgTemp,
      condition: topDescription,
    }
  })

  const overallTemp =
    daily.length > 0
      ? Number(
          (
            daily.reduce((sum, day) => sum + (day.temperature ?? 0), 0) /
            daily.length
          ).toFixed(1)
        )
      : null

  return {
    temperature: overallTemp ?? 28,
    condition: daily[0]?.condition || "Sunny",
    travelForecast: daily,
  }
}

export async function getWeather(city, startDate, endDate) {
  try {
    const apiKey = process.env.OPENWEATHER_KEY

    if (!apiKey) {
      throw new Error("OPENWEATHER_KEY is missing")
    }

    // 1) Convert city/country name to coordinates
    const geoRes = await axios.get("http://api.openweathermap.org/geo/1.0/direct", {
      params: {
        q: city,
        limit: 1,
        appid: apiKey,
      },
      timeout: 10000,
    })

    const location = geoRes.data?.[0]

    if (!location) {
      throw new Error(`No coordinates found for ${city}`)
    }

    // 2) Get 5 day / 3 hour forecast by lat/lon
    const forecastRes = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        lat: location.lat,
        lon: location.lon,
        appid: apiKey,
        units: "metric",
      },
      timeout: 10000,
    })

    const list = forecastRes.data?.list || []

    if (!startDate || !endDate) {
      return {
        temperature: list[0]?.main?.temp ?? 28,
        condition: list[0]?.weather?.[0]?.description ?? "Sunny",
        travelForecast: [],
      }
    }

    const travelDates = getDateRange(startDate, endDate)

    return summarizeForecast(list, travelDates)
  } catch (err) {
    console.log("Weather API failed:", err.response?.data || err.message)

    return {
      temperature: 28,
      condition: "Sunny",
      travelForecast: startDate && endDate
        ? getDateRange(startDate, endDate).map((date) => ({
            date,
            temperature: 28,
            condition: "Sunny",
          }))
        : [],
    }
  }
}