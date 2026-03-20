# ✈️ VoyageAI – Multi-Agent AI Travel Planner


>  Intelligent travel planning powered by **Multi-Agent AI + Machine Learning**

---

## Overview

**VoyageAI** is a full-stack **AI-powered travel planning system** that helps users plan trips intelligently using a **multi-agent architecture**.

It generates:

* Day-wise AI itineraries
* Weather-aware travel insights
* Nearby hotel recommendations
* Place discovery with images & maps
* AI-estimated flight prices

All combined into a **modern, interactive travel dashboard**.

---

## Key Features

### Multi-Agent AI System

* Coordinator Agent manages the workflow
* Specialized agents for:

  * Itinerary generation
  * Weather intelligence
  * Place discovery
  * Hotel recommendations
  * Flight price prediction

---

### AI Itinerary Planner

* Generates **day-by-day travel plans**
* Each day includes:

  * Places to visit
  * Timings & activities
  * Relevant images
* Interactive **slider UI (1 day = 1 slide)**

---

### Weather-Aware Planning

* Uses real-time weather data
* Matches weather with **selected travel dates**
* Improves trip decision-making

---

### Smart Place Discovery

* Shows:

  * Attractions
  * Descriptions
  * Images (Unsplash integration)
* Enhanced UI with place previews

---

### Hotel Recommendations

* Suggests **nearby stays**
* Based on:

  * Destination
  * Travel plan

---

### AI Flight Price Prediction

* Custom **Machine Learning model (XGBoost)**
* Predicts price based on:

  * Source & destination
  * Duration
  * Stops
  * Days left

> Note: Prices are **AI-estimated**, not real-time booking prices

---

## System Architecture

```
User Input → Coordinator Agent
                ↓
     ┌──────────┼──────────┐
     ↓          ↓          ↓
 Itinerary   Weather    Places
   Agent      Agent      Agent
     ↓          ↓          ↓
     └──────→ Combine Results ←──────┐
                                     ↓
                             Hotels Agent
                                     ↓
                           Price Prediction API
                                     ↓
                               Final Response
```

---

## Tech Stack

### Frontend

* React.js + Vite
* JavaScript
* CSS3
* Swiper / Slider UI
* Axios

### Backend

* Node.js
* Express.js
* REST API Architecture

### AI & ML

* Python
* FastAPI (ML service)
* XGBoost (price prediction model)
* Multi-Agent Logic

### APIs Used

* OpenWeather API 
* Google Places API 
* Unsplash API 

---

## Features Preview
### AI Itinerary
### Places Discovery
### Stay Recommendations
### Weather Insights

---

## How It Works

1. User selects:

   * From country
   * To country
   * Travel dates

2. Coordinator Agent triggers:

   * Itinerary Agent
   * Weather Agent
   * Place Agent
   * Hotel Agent
   * Price Prediction API

3. System combines everything into:
    A **complete smart travel plan**

---

## Running Locally

### 1️⃣ Clone Repo

```bash
git clone https://github.com/Pudamya/flight-price-prediction.git
cd flight-price-prediction
```

### 2️⃣ Backend (Node.js)

```bash
cd backend
npm install
node server.js
```

### 3️⃣ ML API (Python)

```bash
cd ml-service
pip install -r requirements.txt
uvicorn api.app:app --reload
```

### 4️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

---


## Innovation

VoyageAI introduces a **multi-agent architecture** where different AI modules collaborate to simulate a real-world travel assistant.

Unlike traditional systems:

* Not static
* Not rule-based
* Fully **AI-coordinated workflow**

Combines:

* AI reasoning
* ML predictions
* Real-world APIs
* Interactive UI

---

## Author

**Pudamya Vidusini Rathnayake**

AI & Data Science Undergraduate

🔗 GitHub: https://github.com/Pudamya
🔗 LinkedIn: https://www.linkedin.com/in/pudamya-rathnayake

---
