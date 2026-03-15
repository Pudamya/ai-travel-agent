import { useMemo, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { Plane, MapPinned, CalendarDays, Sparkles } from "lucide-react"

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
  "Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti","Dominica",
  "Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea",
  "Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
  "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives",
  "Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
  "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal",
  "Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey",
  "Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay",
  "Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
]

function todayStr() {
  const d = new Date()
  return d.toISOString().split("T")[0]
}

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split("T")[0]
}

export default function Planner() {
  const navigate = useNavigate()

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [startDate, setStartDate] = useState(todayStr())
  const [endDate, setEndDate] = useState(addDays(todayStr(), 4))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const days = useMemo(() => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    return diff > 0 ? diff : 0
  }, [startDate, endDate])

  async function generate() {
    setError("")

    if (!from.trim() || !to.trim()) {
      setError("Please select both departure country and destination country.")
      return
    }

    if (!countries.includes(from.trim()) || !countries.includes(to.trim())) {
      setError("Please select countries from the dropdown list.")
      return
    }

    if (!startDate || !endDate) {
      setError("Please select travel start and end dates.")
      return
    }

    if (days < 1) {
      setError("End date must be after or equal to start date.")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post("http://localhost:5000/travel", {
        from: from.trim(),
        to: to.trim(),
        days,
        startDate,
        endDate,
      })

      navigate("/results", {
        state: {
          ...res.data,
          from,
          to,
          days,
          startDate,
          endDate,
        },
      })
    } catch (err) {
      setError("Travel planner backend is not responding. Please check backend and APIs.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page-planner page-planner-premium">
      <header className="subHeader plannerTop">
        <Link to="/" className="backLink">← Back to Home</Link>
        <div className="subHeaderBrand">
          <span className="eyebrow">VoyageAI Planner</span>
          <h1>Build your dream journey</h1>
          <p>
            Choose countries, travel dates, and let VoyageAI generate a smart,
            beautiful travel experience with weather, flights, hotels, places,
            and itinerary guidance.
          </p>
        </div>
      </header>

      <section className="plannerPremiumGrid">
        <div className="plannerHeroPanel">
          <div className="plannerHeroImage plannerHeroImageMain">
            <div className="plannerHeroOverlay">
              <span className="plannerBadge">Premium Travel Planning</span>
              <h2>From inspiration to itinerary</h2>
              <p>
                Select your route and dates, then get a complete AI-powered
                travel dashboard with maps, hotels, and daily experiences.
              </p>
            </div>
          </div>

          <div className="plannerMiniCards">
            <div className="plannerMiniCard">
              <Sparkles size={18} />
              <div>
                <strong>Smart itinerary</strong>
                <span>Cleaner day-by-day travel plans</span>
              </div>
            </div>

            <div className="plannerMiniCard">
              <Plane size={18} />
              <div>
                <strong>Fare insight</strong>
                <span>Current vs predicted flight pricing</span>
              </div>
            </div>

            <div className="plannerMiniCard">
              <MapPinned size={18} />
              <div>
                <strong>Destination discovery</strong>
                <span>Places, hotels, and location views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="plannerCard plannerCardPremium">
          <div className="plannerCardHeader">
            <h2>Trip details</h2>
            <span className="sectionBadge">User-friendly planner</span>
          </div>

          <div className="fieldGrid fieldGridPremium">
            <div className="field">
              <label><Plane size={16} /> From</label>
              <input
                list="country-list"
                placeholder="Select departure country"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="field">
              <label><MapPinned size={16} /> To</label>
              <input
                list="country-list"
                placeholder="Select destination country"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="field">
              <label><CalendarDays size={16} /> Start Date</label>
              <input
                type="date"
                value={startDate}
                min={todayStr()}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="field">
              <label><CalendarDays size={16} /> End Date</label>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          <div className="plannerSummaryBar">
            <div className="summaryItem">
              <span className="label">Route</span>
              <strong>{from || "Departure"} → {to || "Destination"}</strong>
            </div>
            <div className="summaryItem">
              <span className="label">Travel Duration</span>
              <strong>{days || 0} day{days === 1 ? "" : "s"}</strong>
            </div>
            <div className="summaryItem">
              <span className="label">Travel Window</span>
              <strong>{startDate} → {endDate}</strong>
            </div>
          </div>

          {error ? <div className="errorBox">{error}</div> : null}

          <button className="primaryBtn fullWidth plannerSubmitBtn" onClick={generate} disabled={loading}>
            {loading ? "Generating your travel dashboard..." : "Generate Travel Plan"}
          </button>
        </div>
      </section>
    </div>
  )
}