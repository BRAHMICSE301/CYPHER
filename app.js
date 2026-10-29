
const $ = (id) => document.getElementById(id);

let language = "en";
let currentCoordinates = null;

const text = {
  en: {
    eyebrow: "AFTER HARVEST, EVERY DAY COUNTS",
    headline: "Keep your harvest safe.",
    intro: "Understand local weather, check storage risks, and find nearby agricultural support.",
    locationBtn: "◎ Use My Current Location",
    idle: "Your location is not being accessed.",
    denied: "Location unavailable. Allow permission and try again, or use the demo.",
    loading: "Finding your area and checking the weather...",
    todayLabel: "LOCAL CONDITIONS",
    todayTitle: "Your area today",
    areaLabel: "Detected area",
    waiting: "Waiting for location",
    locationNote: "Your coordinates are not saved.",
    weatherLabel: "Current weather",
    weatherWaiting: "Waiting for weather data",
    humidity: "Humidity",
    riskLabel: "Indicative storage risk",
    riskWaiting: "Not assessed",
    riskReason: "Get local weather data to assess environmental risk.",
    guideLabel: "PROTECT YOUR HARVEST",
    guideTitle: "Six habits for safer grain",
    guide: [
      "Dry grain thoroughly before storage.",
      "Clean and inspect the storage space.",
      "Keep grain away from water and damp floors.",
      "Use suitable, clean storage containers.",
      "Check regularly for moisture, mould and insects.",
      "Ask your local agricultural expert for crop-specific advice."
    ],
    disclaimer: "Prototype only. Weather-based risk is indicative, not a measurement of grain moisture or a guarantee of safety.",
    live: "Live weather",
    demo: "Demo weather",
    low: "Low",
    medium: "Medium",
    high: "High",
    error: "Could not load live data. Check your connection and try again.",
    noPlace: "Place name unavailable",
    detected: "Location detected automatically",
    demoButton: "Use demo location",
    changeLanguage: "हिन्दी"
  },
  hi: {
    eyebrow: "कटाई के बाद, हर दिन ज़रूरी है",
    headline: "अपनी फसल सुरक्षित रखें।",
    intro: "मौसम जानें, अनाज के भंडारण का जोखिम समझें और पास की कृषि सहायता खोजें।",
    locationBtn: "◎ मेरी मौजूदा लोकेशन जानें",
    idle: "अभी आपकी लोकेशन नहीं ली जा रही है।",
    denied: "लोकेशन नहीं मिली। अनुमति देकर दोबारा कोशिश करें या डेमो देखें।",
    loading: "आपका क्षेत्र और मौसम पता किया जा रहा है...",
    todayLabel: "आपके क्षेत्र का मौसम",
    todayTitle: "आज आपके क्षेत्र में",
    areaLabel: "आपका क्षेत्र",
    waiting: "लोकेशन की प्रतीक्षा है",
    locationNote: "आपके निर्देशांक सेव नहीं किए जाते।",
    weatherLabel: "मौजूदा मौसम",
    weatherWaiting: "मौसम की जानकारी की प्रतीक्षा है",
    humidity: "नमी",
    riskLabel: "भंडारण का अनुमानित जोखिम",
    riskWaiting: "अभी आकलन नहीं हुआ",
    riskReason: "मौसम की जानकारी मिलने पर जोखिम का अनुमान लगाया जाएगा।",
    guideLabel: "अपनी फसल सुरक्षित रखें",
    guideTitle: "अनाज सुरक्षित रखने के छह तरीके",
    guide: [
      "भंडारण से पहले अनाज अच्छी तरह सुखाएँ।",
      "भंडारण की जगह साफ़ करें और जाँचें।",
      "अनाज को पानी और गीले फर्श से दूर रखें।",
      "साफ़ और सही भंडारण बर्तनों का उपयोग करें।",
      "नमी, फफूँद और कीड़ों की नियमित जाँच करें।",
      "फसल के अनुसार सलाह के लिए स्थानीय कृषि विशेषज्ञ से पूछें।"
    ],
    disclaimer: "यह केवल एक प्रोटोटाइप है। मौसम से मिला जोखिम का अनुमान अनाज की नमी की जाँच या सुरक्षा की गारंटी नहीं है।",
    live: "लाइव मौसम",
    demo: "डेमो मौसम",
    low: "कम",
    medium: "मध्यम",
    high: "ज़्यादा",
    error: "लाइव जानकारी नहीं मिली। इंटरनेट जाँचें और दोबारा कोशिश करें।",
    noPlace: "जगह का नाम नहीं मिला",
    detected: "लोकेशन अपने आप मिली",
    changeLanguage: "English"
  }
};

function setLanguage(lang) {
  language = lang;
  const t = text[lang];

  document.documentElement.lang = lang;
  $("languageBtn").textContent = t.changeLanguage;
  $("eyebrow").textContent = t.eyebrow;
  $("headline").textContent = t.headline;
  $("intro").textContent = t.intro;
  $("locationBtn").textContent = t.locationBtn;
  $("todayLabel").textContent = t.todayLabel;
  $("todayTitle").textContent = t.todayTitle;
  $("areaLabel").textContent = t.areaLabel;
  $("weatherLabel").textContent = t.weatherLabel;
  $("riskLabel").textContent = t.riskLabel;
  $("guideLabel").textContent = t.guideLabel;
  $("guideTitle").textContent = t.guideTitle;
  $("disclaimer").textContent = t.disclaimer;

  $("guideList").replaceChildren(
    ...t.guide.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    })
  );

  if (!currentCoordinates) {
    $("status").textContent = t.idle;
    $("area").textContent = t.waiting;
    $("locationNote").textContent = t.locationNote;
    $("weatherText").textContent = t.weatherWaiting;
    $("risk").textContent = t.riskWaiting;
    $("riskReason").textContent = t.riskReason;
  }
}

$("languageBtn").addEventListener("click", () => {
  setLanguage(language === "en" ? "hi" : "en");
});

function getPlaceName(data) {
  const address = data.address || {};
  const parts = [
    address.village ||
    address.town ||
    address.city ||
    address.hamlet ||
    address.suburb,
    address.county || address.state_district,
    address.state
  ].filter(Boolean);

  return [...new Set(parts)].join(", ") || text[language].noPlace;
}

async function reverseGeocode(lat, lon) {
  const url = new URL(
    "https://nominatim.openstreetmap.org/reverse"
  );

  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    format: "jsonv2",
    "accept-language": language
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Place lookup failed");
  }

  return response.json();
}

function weatherDescription(code) {
  if (code === 0) return language === "hi" ? "साफ़ आसमान" : "Clear sky";
  if (code <= 3) return language === "hi" ? "बादल" : "Cloudy";
  if (code <= 48) return language === "hi" ? "कोहरा" : "Fog";
  if (code <= 67) return language === "hi" ? "बारिश" : "Rain";
  if (code <= 77) return language === "hi" ? "बर्फ़" : "Snow";
  if (code <= 82) return language === "hi" ? "तेज़ बौछारें" : "Rain showers";
  if (code <= 86) return language === "hi" ? "बर्फ़ की बौछारें" : "Snow showers";
  return language === "hi" ? "गरज के साथ तूफ़ान" : "Thunderstorm";
}

function assessRisk(humidity, precipitation, temperature) {
  // Preliminary demo heuristic, not a validated grain-safety model.
  let score = 0;

  if (humidity >= 85) score += 2;
  else if (humidity >= 70) score += 1;

  if (precipitation >= 2) score += 2;
  else if (precipitation > 0) score += 1;

  if (temperature >= 30) score += 1;

  if (score >= 3) return "high";
  if (score >= 1) return "medium";
  return "low";
}

async function getWeather(lat, lon) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.search = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,relative_humidity_2m,precipitation,weather_code",
    timezone: "auto"
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather lookup failed");
  }

  return response.json();
}

function displayWeather(data) {
  const t = text[language];
  const current = data.current;
  const humidity = current.relative_humidity_2m;
  const rain = current.precipitation;
  const temperature = current.temperature_2m;
  const risk = assessRisk(humidity, rain, temperature);

  $("temperature").textContent = `${temperature}°C`;
  $("weatherText").textContent = weatherDescription(current.weather_code);
  $("humidity").textContent = `${t.humidity}: ${humidity}%`;
  $("dateLabel").textContent = t.live;

  $("risk").textContent = t[risk];
  $("riskReason").textContent =
    language === "hi"
      ? `हवा की नमी ${humidity}% है और मौजूदा वर्षा ${rain} मिमी है। यह केवल शुरुआती अनुमान है।`
      : `Relative humidity: ${humidity}%. Current precipitation: ${rain} mm. This is a preliminary estimate.`;

  const riskColors = {
    low: "#2f6c45",
    medium: "#946719",
    high: "#b33b30"
  };

  $("risk").style.color = riskColors[risk];
  $("weatherText").dataset.source = "live";
}

async function detectLocation() {
  const t = text[language];

  if (!navigator.geolocation) {
    $("status").textContent = t.denied;
    return;
  }

  $("locationBtn").disabled = true;
  $("status").textContent = t.loading;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Coordinates remain in memory only.
      currentCoordinates = { lat, lon };

      try {
        const [place, weather] = await Promise.all([
          reverseGeocode(lat, lon),
          getWeather(lat, lon)
        ]);

        $("area").textContent = getPlaceName(place);
        $("locationNote").textContent = t.detected;
        displayWeather(weather);
        $("status").textContent = t.live;
      } catch (error) {
        console.error(error);
        $("status").textContent = t.error;
      } finally {
        $("locationBtn").disabled = false;
      }
    },
    (error) => {
      console.warn("Geolocation error:", error.message);
      $("status").textContent = t.denied;
      $("locationBtn").disabled = false;
    },
    {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 60000
    }
  );
}

$("locationBtn").addEventListener("click", detectLocation);

setLanguage("en");
