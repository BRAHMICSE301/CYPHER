# 🌾 Team Uncharted — Smart Grain Storage Early-Warning System

> **Know why your grain is at risk, before it is damaged.**  
> An AI and weather-driven post-harvest decision support system designed for Indian farmers, godown managers, and agricultural extension officers.

---

## 🌟 Key Features

1. **Live 5-Day Weather Analytics (Open-Meteo API)**
   - Automatic geocoding for any Indian village, mandi, or city (Faridabad, Karnal, Ludhiana, Patna, Indore, etc.).
   - Automatic GPS location detection button.
   - Dual demo modes:
     - **🌧️ Demo: Bad Day (High Rain & 86% RH)** to demonstrate crisis intervention.
     - **☀️ Demo: Dry Week** for safe baseline comparison.

2. **Multilingual Support (English & हिन्दी)**
   - Instant 1-click toggle between full English and Hindi (Devanagari).
   - All risk assessments, reasons, and actionable steps are translated with culturally relevant agricultural terms.

3. **Domain-Specific Risk Scoring Engine (ICAR-Backed)**
   - Evaluates sustained relative humidity ($\ge 75\%$ triggers fungal *Aspergillus* mold warnings).
   - Correlates warm ambient temperatures ($25-35^\circ\text{C}$) with humidity for insect/weevil breeding acceleration.
   - Calculates specific risk weights based on storage types:
     - **Open Jute Bags** (खुली बोरियाँ) — $+2$ vulnerability penalty
     - **Traditional Kothi** (कोठी) — $+1$ vulnerability penalty
     - **Pakka Godown** (पक्का गोदाम) — $-1$ protection credit
     - **Metal Bin / Silo** (धातु की टंकी) — $-2$ protection credit
     - **Hermetic Bag / PICS** (हर्मेटिक बैग) — $-4$ maximum protection credit
   - Tracks duration stored ($>30$ days penalty) and initial sun-drying status ($<12-14\%$ safe moisture threshold).

4. **Interactive 5-Day Forecast Visualizer & Chart**
   - Day-by-day weather breakdown (Relative Humidity %, Average Temperature, Rain Probability %).
   - Integrated Chart.js visualization with risk threshold markers.

5. **"What-If" Storage Method Comparison Matrix**
   - Real-time comparison across all 5 storage methods under the identical weather forecast.
   - Enables farmers to visually see how switching from open jute bags to a hermetic bag or metal bin turns **HIGH RISK 🔴** into **LOW RISK 🟢**.

6. **🔊 Text-to-Speech (TTS) Voice Advisory for Farmers**
   - Reads out the entire advisory in spoken Hindi or English at field-friendly audio pace.
   - Bridges literacy barriers for rural agricultural communities.

7. **Multi-Channel Advisory Sharing**
   - **WhatsApp 1-Click Share:** Generates pre-formatted WhatsApp advisory message ready to forward to farmer groups and mandis.
   - **Telegram Channel Alert Dispatcher:** Integrates with Telegram Bot API to send live channel notifications (with built-in offline simulator).
   - **Printer / PDF Export:** Clean formatted print view for notice boards and physical distribution.

8. **Kisan Helpline & Emergency Directory**
   - Direct link to Government of India's Kisan Call Center: **1800-180-1551** (Toll-Free).

---

## 🌐 Live Demo

After enabling GitHub Pages (see below) the site is available at:
`https://YOUR-USERNAME.github.io/smart-grain-storage/`

---

## 🚀 How to Run the Website

### Option 1: Double-Click (Zero Setup Required)
Simply double-click:
- **`start_website.bat`**  
  *or*  
- Directly open **`index.html`** in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Python Server
Run the included Python server script:
```bash
python serve.py
```
This will start the local HTTP server at `http://localhost:8080/index.html` and automatically launch your browser.

---

## 📂 Project Structure

```text
smart-grain-storage/
├── index.html           # Main semantic HTML5 web application
├── style.css            # Responsive styles, agricultural palette & print rules
├── app.js               # Core rules engine, Open-Meteo API, TTS & state management
├── serve.py             # Optional local HTTP web server
├── start_website.bat    # Windows 1-click launcher
├── README.md            # Documentation & project guide
├── .nojekyll            # Tells GitHub Pages to serve files as-is
└── .gitignore           # Files Git should ignore
```

---

## ⚠️ Telegram Token Safety
This is a client-side website, so any bot token typed into the Telegram dialog is only held in the browser and sent directly to Telegram. **Never hard-code a bot token in `app.js` or commit it to GitHub.** Leave the fields blank to use the built-in simulator.

---

## 🔬 Scientific & Technical References
- **ICAR (Indian Council of Agricultural Research):** Post-harvest grain storage moisture guidelines.
- **FAO (Food and Agriculture Organization):** Hermetic storage systems for smallholder farmers.
- **Open-Meteo:** Open-access high-resolution meteorological forecasts.
