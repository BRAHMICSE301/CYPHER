/**
 * TEAM UNCHARTED - SMART GRAIN STORAGE EARLY-WARNING SYSTEM
 * Client-Side Application Engine & Analytics
 */

const RULES = {
  thresholds: {
    rh_high: 75,
    rh_mid: 70,
    rain_prob: 60,
    temp_min: 25,
    temp_max: 35
  },
  storage_points: {
    open_bag: 2,
    kothi: 1,
    pakka_godown: -1,
    metal_bin: -2,
    hermetic: -4
  },
  storage_names: {
    open_bag: { en: "Open Jute Bags", hi: "\u0916\u0941\u0932\u0940 \u092c\u094b\u0930\u093f\u092f\u093e\u0901", icon: "\u{1F4E6}" },
    kothi: { en: "Traditional Kothi", hi: "\u0915\u094b\u0920\u0940", icon: "\u{1F6D6}" },
    pakka_godown: { en: "Pakka Godown", hi: "\u092a\u0915\u094d\u0915\u093e \u0917\u094b\u0926\u093e\u092e", icon: "\u{1F3EC}" },
    metal_bin: { en: "Metal Bin / Silo", hi: "\u0927\u093e\u0924\u0941 \u0915\u0940 \u091f\u0902\u0915\u0940", icon: "\u{1F6E2}\u{FE0F}" },
    hermetic: { en: "Hermetic Bag (PICS)", hi: "\u0939\u0930\u094d\u092e\u0947\u091f\u093f\u0915 \u092c\u0948\u0917", icon: "\u{1F6E1}\u{FE0F}" }
  },
  levels: {
    low_max: 2,
    medium_max: 5
  }
};

const MESSAGES = {
  en: {
    title: "Smart Grain Storage Early-Warning",
    tagline: "Know why your grain is at risk, before it is damaged.",
    city: "Village or city",
    grain: "Grain Type",
    storage: "How is it stored?",
    days: "Days stored so far",
    dried: "Sun-dried before storing?",
    source: "Weather Data Source",
    check: "Check My Grain Storage",
    why: "Why your grain is at risk (Risk Factors)",
    do: "What to do (Recommended Action Checklist)",
    forecast: "Next 5 Days Weather & Moisture Exposure",
    whatif: "What if you changed the storage method?",
    send: "Send alert to Telegram",
    sent: "Alert sent successfully to Telegram.",
    fail: "Could not send. Check the Telegram token and chat ID.",
    geo_fail: "City not found. Please try another name or use GPS.",
    net_fail: "Live forecast unavailable. Showing demo week instead.",
    peak: "Highest risk around {date}.",
    note: "This advisory is based on exterior atmospheric weather forecast & verified post-harvest storage research rules. It does not cover rodent infestation. Consult your nearest Krishi Vigyan Kendra (KVK) for laboratory moisture testing.",
    Low: "LOW RISK",
    Medium: "MEDIUM RISK",
    High: "HIGH RISK",
    date: "Date",
    rh: "Humidity %",
    temp: "Temp \u00B0C",
    rain: "Rain Chance %",
    now: "Storage Method",
    risk: "Risk Level",
    g_wheat: "Wheat",
    g_rice: "Rice / Paddy",
    g_maize: "Maize / Corn",
    g_pulses: "Pulses / Gram",
    s_open_bag: "Open jute bags",
    s_kothi: "Traditional Kothi",
    s_pakka_godown: "Pakka godown",
    s_metal_bin: "Metal bin",
    s_hermetic: "Hermetic bag",
    src_live: "\u{1F6F0}\u{FE0F} Live Forecast (Open-Meteo)",
    src_dry: "\u{2600}\u{FE0F} Demo: Dry Safe Week",
    src_rain: "\u{1F327}\u{FE0F} Demo: Bad Day (High Rain)",
    humid_high: "Humidity stays at {rh}% or more for {n} day(s). Fungus & mold can germinate rapidly.",
    humid_mid: "Humidity stays above {rh}% for {n} day(s). Grain will absorb ambient atmospheric moisture.",
    rain_risk: "Rain is likely on {n} day(s) (>=60% chance). Risk of roof leaks or damp splash.",
    heat: "Warm and damp combination (25-35 \u00B0C) accelerates weevil breeding and fungal mycotoxins.",
    r_open_bag: "Open jute bags offer zero moisture barrier; humid air freely penetrates grain.",
    r_kothi: "A traditional kothi gives only partial protection against high dampness.",
    not_dried: "Grain was NOT sun-dried before storing (contains unsafe initial moisture).",
    long_stored: "Grain has been stored for over 30 days without aerated turning.",
    a_lift: "Keep bags off the floor! Place on wooden planks/pallets at least 15cm high.",
    a_cover: "Cover the entire stack with clean waterproof tarpaulin before rainfall.",
    a_dry: "Sun-dry grain immediately on clean plastic sheets before continued storage.",
    a_upgrade: "If possible, transfer grain to an airtight metal bin or hermetic multi-layer bag.",
    a_sealed: "Keep the bin or hermetic bag strictly sealed. Do NOT open in damp weather.",
    a_check: "Check inside for musty smell, hot spots, clumping or insects. Ask local KVK if unsure.",
    a_ok: "No immediate action required. Weather conditions are safe. Keep monitoring.",
    tts_btn: "\u{1F50A} Listen Advisory in English",
    share_wa: "\u{1F4AC} Share on WhatsApp",
    share_tg: "\u{2708}\u{FE0F} Send to Telegram",
    print_advisory: "\u{1F5A8}\u{FE0F} Print Advisory",
    helpline_txt: "Kisan Helpline",
    params_badge: "Step 1 of 2",
    popular_cities: "Popular:",
    dried_yes: "Yes (Well Sun-Dried)",
    dried_no: "No (High Moisture Risk)",
    dried_help: "Grain moisture below 12-14%.",
    upgrade_badge: "Upgrade Decision Tool",
    low_headline: "Grain is Safe & Well Protected",
    med_headline: "Caution: Moderate Moisture Risk Detected",
    high_headline: "CRITICAL: Urgent Storage Intervention Required!"
  },
  hi: {
    title: "\u0938\u094d\u092e\u093e\u0930\u094d\u091f \u0905\u0928\u093e\u091c \u092d\u0902\u0921\u093e\u0930\u0923 \u091a\u0947\u0924\u093e\u0935\u0928\u0940",
    tagline: "\u0928\u0941\u0915\u0938\u093e\u0928 \u0938\u0947 \u092a\u0939\u0932\u0947 \u091c\u093e\u0928\u093f\u090f, \u0906\u092a\u0915\u093e \u0905\u0928\u093e\u091c \u0916\u0924\u0930\u0947 \u092e\u0947\u0902 \u0915\u094d\u092f\u094b\u0902 \u0939\u0948\u0964",
    city: "\u0917\u093e\u0901\u0935 \u092f\u093e \u0938\u0939\u0930",
    grain: "\u0905\u0928\u093e\u091c \u0915\u093e \u092a\u094d\u0930\u0915\u093e\u0930",
    storage: "\u0915\u0948\u0938\u0947 \u0930\u0916\u093e \u0939\u0948?",
    days: "\u0905\u092c \u0924\u0915 \u0915\u093f\u0924\u0928\u0947 \u0926\u093f\u0928 \u0930\u0916\u093e",
    dried: "\u0930\u0916\u0928\u0947 \u0938\u0947 \u092a\u0939\u0932\u0947 \u0927\u0942\u092a \u092e\u0947\u0902 \u0938\u0941\u0916\u093e\u092f\u093e?",
    source: "\u092e\u094c\u0938\u092e \u0915\u093e \u0921\u0947\u091f\u093e \u0938\u094d\u0930\u094b\u0924",
    check: "\u092e\u0947\u0930\u093e \u0905\u0928\u093e\u091c \u091c\u093e\u0901\u091a\u0947\u0902",
    why: "\u0905\u0928\u093e\u091c \u0916\u0924\u0930\u0947 \u092e\u0947\u0902 \u0915\u094d\u092f\u094b\u0902 \u0939\u0948 (\u091c\u094b\u0916\u093f\u092e \u0915\u0947 \u0915\u093e\u0930\u0923)",
    do: "\u0915\u094d\u092f\u093e \u0915\u0930\u0947\u0902 (\u091c\u0930\u0942\u0930\u0940 \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0915\u0926\u092e)",
    forecast: "\u0905\u0917\u0932\u0947 5 \u0926\u093f\u0928 \u0915\u093e \u092e\u094c\u0938\u092e \u0914\u0930 \u0928\u092e\u0940",
    whatif: "\u092d\u0902\u0921\u093e\u0930\u0923 \u092c\u0926\u0932\u0928\u0947 \u092a\u0930 \u0915\u094d\u092f\u093e \u0939\u094b\u0917\u093e?",
    send: "Telegram \u092a\u0930 \u0905\u0932\u0930\u094d\u091f \u092d\u0947\u091c\u0947\u0902",
    sent: "\u0905\u0932\u0930\u094d\u091f \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 Telegram \u092a\u0930 \u092d\u0947\u091c \u0926\u093f\u092f\u093e \u0917\u092f\u093e\u0964",
    fail: "\u092d\u0947\u091c \u0928\u0939\u0940\u0902 \u092a\u093e\u090f\u0964 Telegram \u091f\u094b\u0915\u0928 \u0914\u0930 \u091a\u0948\u091f \u0906\u0908\u0921\u0940 \u091c\u093e\u0901\u091a\u0947\u0902\u0964",
    geo_fail: "\u0938\u0939\u0930 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964 \u0926\u0942\u0938\u0930\u093e \u0928\u093e\u092e \u0932\u093f\u0916\u0947\u0902 \u092f\u093e GPS \u0907\u0938\u094d\u0924\u0947\u092e\u093e\u0932 \u0915\u0930\u0947\u0902\u0964",
    net_fail: "\u0932\u093e\u0907\u0935 \u092e\u094c\u0938\u092e \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964 \u0921\u0947\u092e\u094b \u0938\u092a\u094d\u0924\u093e\u0939 \u0926\u093f\u0916\u093e \u0930\u0939\u0947 \u0939\u0948\u0902\u0964",
    peak: "\u0938\u092c\u0938\u0947 \u091c\u093c\u094d\u092f\u093e\u0926\u093e \u091c\u094b\u0916\u093f\u092e {date} \u0915\u0947 \u0906\u0938\u092a\u093e\u0938 \u0930\u0939\u0947\u0917\u093e\u0964",
    note: "\u092f\u0939 \u0938\u0932\u093e\u0939 \u092c\u093e\u0939\u0930 \u0915\u0947 \u092e\u094c\u0938\u092e \u0915\u0947 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928 \u0914\u0930 ICAR \u0915\u0947 \u0936\u094b\u0927 \u0928\u093f\u092f\u092e\u094b\u0902 \u092a\u0930 \u0906\u0927\u093e\u0930\u093f\u0924 \u0939\u0948\u0964 \u0907\u0938\u092e\u0947\u0902 \u091a\u0942\u0939\u0947 \u0936\u093e\u092e\u093f\u0932 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964 \u0938\u091f\u0940\u0915 \u0928\u092e\u0940 \u091c\u093e\u0901\u091a \u0915\u0947 \u0932\u093f\u090f \u0905\u092a\u0928\u0947 \u0928\u091c\u0926\u0940\u0915\u0940 \u0915\u0943\u0937\u093f \u0935\u093f\u091c\u094d\u091e\u093e\u0928 \u0915\u0947\u0902\u0926\u094d\u0930 (KVK) \u0938\u0947 \u0938\u0902\u092a\u0930\u094d\u0915 \u0915\u0930\u0947\u0902\u0964",
    Low: "\u0915\u092e \u091c\u094b\u0916\u093f\u092e",
    Medium: "\u092e\u0927\u094d\u092f\u092e \u091c\u094b\u0916\u093f\u092e",
    High: "\u091c\u093c\u094d\u092f\u093e\u0926\u093e \u091c\u094b\u0916\u093f\u092e",
    date: "\u0924\u093e\u0930\u0940\u0916",
    rh: "\u0928\u092e\u0940 %",
    temp: "\u0924\u093e\u092a\u092e\u093e\u0928 \u00B0C",
    rain: "\u092c\u093e\u0930\u093f\u0936 \u0915\u0940 \u0938\u0902\u092d\u093e\u0935\u0928\u093e %",
    now: "\u092d\u0902\u0921\u093e\u0930\u0923 \u092a\u094d\u0930\u0915\u093e\u0930",
    risk: "\u091c\u094b\u0916\u093f\u092e \u0938\u094d\u0924\u0930",
    g_wheat: "\u0917\u0947\u0939\u0942\u0901",
    g_rice: "\u091a\u093e\u0935\u0932 / \u0927\u093e\u0928",
    g_maize: "\u092e\u0915\u094d\u0915\u093e",
    g_pulses: "\u091a\u0928\u093e / \u0926\u093e\u0932\u0947\u0902",
    s_open_bag: "\u0916\u0941\u0932\u0940 \u092c\u094b\u0930\u093f\u092f\u093e\u0901",
    s_kothi: "\u092a\u093e\u0930\u0902\u092a\u0930\u093f\u0915 \u0915\u094b\u0920\u0940",
    s_pakka_godown: "\u092a\u0915\u094d\u0915\u093e \u0917\u094b\u0926\u093e\u092e",
    s_metal_bin: "\u0927\u093e\u0924\u0941 \u0915\u0940 \u091f\u0902\u0915\u0940 (\u0938\u093e\u0907\u0932\u094b)",
    s_hermetic: "\u0939\u0930\u094d\u092e\u0947\u091f\u093f\u0915 \u092c\u0948\u0917 (PICS)",
    src_live: "\u{1F6F0}\u{FE0F} \u0932\u093e\u0907\u0935 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928 (Open-Meteo)",
    src_dry: "\u{2600}\u{FE0F} \u0921\u0947\u092e\u094b: \u0938\u0942\u0916\u093e \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0938\u092a\u094d\u0924\u093e\u0939",
    src_rain: "\u{1F327}\u{FE0F} \u0921\u0947\u092e\u094b: Bad Day (\u092d\u093e\u0930\u0940 \u092c\u093e\u0930\u093f\u0936)",
    humid_high: "{n} \u0926\u093f\u0928 \u0928\u092e\u0940 {rh}% \u092f\u093e \u0909\u0938\u0938\u0947 \u091c\u093c\u094d\u092f\u093e\u0926\u093e \u0930\u0939\u0947\u0917\u093e\u0964 \u092b\u092b\u0942\u0902\u0926 (\u0909\u0932\u0940) \u0924\u0947\u091c\u093c\u0940 \u0938\u0947 \u092a\u0928\u092a \u0938\u0915\u0924\u0940 \u0939\u0948\u0964",
    humid_mid: "{n} \u0926\u093f\u0928 \u0928\u092e\u0940 {rh}% \u0938\u0947 \u090a\u092a\u0930 \u0930\u0939\u0947\u0917\u0940\u0964 \u0905\u0928\u093e\u091c \u0939\u0935\u093e \u0938\u0947 \u0928\u092e\u0940 \u0938\u094b\u0916 \u0932\u0947\u0917\u093e\u0964",
    rain_risk: "{n} \u0926\u093f\u0928 \u092c\u093e\u0930\u093f\u0936 \u0915\u0940 \u0938\u0902\u092d\u093e\u0935\u0928\u093e \u0939\u0948 (60% \u0938\u0947 \u0905\u0927\u093f\u0915)\u0964 \u091f\u092a\u0915\u0928\u0947 \u092f\u093e \u0938\u0940\u0932\u0928 \u0915\u093e \u0916\u0924\u0930\u093e \u0939\u0948\u0964",
    heat: "\u0917\u0930\u094d\u092e\u0940 \u0914\u0930 \u0928\u092e\u0940 \u090f\u0915 \u0938\u093e\u0925 (25-35 \u00B0C) \u0918\u0941\u0928, \u0938\u0941\u0902\u0921\u0940 \u0914\u0930 \u092b\u092b\u0942\u0902\u0926 \u0915\u094b \u092c\u0939\u0941\u0924 \u0924\u0947\u091c\u093c\u0940 \u0938\u0947 \u092c\u0922\u093c\u093e\u0924\u0940 \u0939\u0948\u0964",
    r_open_bag: "\u0916\u0941\u0932\u0940 \u092c\u094b\u0930\u093f\u092f\u094b\u0902 \u092e\u0947\u0902 \u0915\u094b\u0908 \u0928\u092e\u0940 \u0905\u0935\u0930\u094b\u0927 \u0928\u0939\u0940\u0902 \u0939\u094b\u0924\u093e; \u0928\u092e \u0939\u0935\u093e \u0938\u0940\u0927\u0947 \u0905\u0928\u093e\u091c \u092e\u0947\u0902 \u091c\u093e\u0924\u0940 \u0939\u0948\u0964",
    r_kothi: "\u092a\u093e\u0930\u0902\u092a\u0930\u093f\u0915 \u0915\u094b\u0920\u0940 \u0938\u0947 \u0938\u0940\u0932\u0928 \u0915\u0947 \u092e\u094c\u0938\u092e \u092e\u0947\u0902 \u0938\u093f\u0930\u094d\u092b\u093c \u0906\u0902\u0936\u093f\u0915 \u092c\u091a\u093e\u0935 \u0939\u094b\u0924\u093e \u0939\u0948\u0964",
    not_dried: "\u0930\u0916\u0928\u0947 \u0938\u0947 \u092a\u0939\u0932\u0947 \u0905\u0928\u093e\u091c \u0915\u094b \u0905\u091a\u094d\u091b\u0940 \u0924\u0930\u0939 \u0927\u0942\u092a \u092e\u0947\u0902 \u0928\u0939\u0940\u0902 \u0938\u0941\u0916\u093e\u092f\u093e \u0917\u092f\u093e \u0925\u093e\u0964",
    long_stored: "\u0905\u0928\u093e\u091c \u0915\u094b \u0930\u0916\u0947 30 \u0926\u093f\u0928 \u0938\u0947 \u091c\u093c\u094d\u092f\u093e\u0926\u093e \u0939\u094b \u0917\u090f \u0939\u0948\u0902\u0964 \u092c\u0940\u091a \u092e\u0947\u0902 \u0939\u0935\u093e \u0928\u0939\u0940\u0902 \u0932\u0917\u093e\u0908 \u0917\u0908\u0964",
    a_lift: "\u092c\u094b\u0930\u093f\u092f\u094b\u0902 \u0915\u094b \u0938\u0940\u0927\u0947 \u092b\u0930\u094d\u0936 \u092a\u0930 \u0928 \u0930\u0916\u0947\u0902! \u0932\u0915\u0921\u093c\u0940 \u0915\u0947 \u0924\u0916\u094d\u0924\u094b\u0902/\u092a\u0948\u0932\u0947\u091f\u094d\u0938 \u092a\u0930 \u0915\u092e \u0938\u0947 \u0915\u092e 6 \u0907\u0902\u091a \u090a\u092a\u0930 \u0930\u0916\u0947\u0902\u0964",
    a_cover: "\u092c\u093e\u0930\u093f\u0936 \u092f\u093e \u0938\u0940\u0932\u0928 \u0938\u0947 \u092a\u0939\u0932\u0947 \u092a\u0942\u0930\u0947 \u0922\u0947\u0930 \u0915\u094b \u0938\u093e\u092b\u093c \u0924\u093f\u0930\u092a\u093e\u0932 \u0938\u0947 \u0905\u091a\u094d\u091b\u0940 \u0924\u0930\u0939 \u0922\u0915\u0947\u0902\u0964",
    a_dry: "\u0905\u0928\u093e\u091c \u0915\u094b \u0938\u093e\u092b\u093c \u0924\u093f\u0930\u092a\u093e\u0932 \u092f\u093e \u092a\u0915\u094d\u0915\u0947 \u092b\u0930\u094d\u0936 \u092a\u0930 \u0927\u0942\u092a \u092e\u0947\u0902 \u0905\u091a\u094d\u091b\u0940 \u0924\u0930\u0939 \u0938\u0941\u0916\u093e\u090f\u0901\u0964",
    a_upgrade: "\u092f\u0926\u093f \u0938\u0902\u092d\u0935 \u0939\u094b \u0924\u094b \u0905\u0928\u093e\u091c \u0915\u094b \u0927\u093e\u0924\u0941 \u0915\u0940 \u091f\u0902\u0915\u0940 (\u0938\u093f\u0932\u094d\u0935\u0930 \u0915\u094b\u0920\u0940) \u092f\u093e \u0939\u0930\u094d\u092e\u0947\u091f\u093f\u0915 \u092c\u0948\u0917 \u092e\u0947\u0902 \u0930\u0916\u0947\u0902\u0964",
    a_sealed: "\u091f\u0902\u0915\u0940 \u092f\u093e \u0939\u0930\u094d\u092e\u0947\u091f\u093f\u0915 \u092c\u0948\u0917 \u0915\u093e \u0922\u0915\u094d\u0915\u0928 \u0915\u0938\u0915\u0930 \u092c\u0902\u0926 \u0930\u0916\u0947\u0902\u0964 \u0928\u092e\u0940 \u0935\u093e\u0932\u0947 \u092e\u094c\u0938\u092e \u092e\u0947\u0902 \u092c\u093f\u0932\u094d\u0915\u0941\u0932 \u0928 \u0916\u094b\u0932\u0947\u0902\u0964",
    a_check: "\u0905\u0928\u093e\u091c \u092e\u0947\u0902 \u0938\u0940\u0932\u0928 \u0915\u0940 \u0917\u0902\u0927, \u0917\u0930\u094d\u092e\u093e\u0939\u091f, \u0917\u0941\u091a\u094d\u091b\u0947 \u092f\u093e \u0915\u0940\u0921\u093c\u0947 \u0926\u0947\u0916\u0947\u0902\u0964 \u0938\u0902\u0926\u0947\u0939 \u0939\u094b\u0928\u0947 \u092a\u0930 KVK \u0938\u0947 \u092a\u0942\u091b\u0947\u0902\u0964",
    a_ok: "\u0905\u092d\u0940 \u0915\u094b\u0908 \u0906\u092a\u093e\u0924 \u0915\u0926\u092e \u091c\u093c\u0930\u0942\u0930\u0940 \u0928\u0939\u0940\u0902\u0964 \u092e\u094c\u0938\u092e \u0905\u0928\u0941\u0915\u0942\u0932 \u0939\u0948\u0964 \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928 \u0926\u0947\u0916\u0924\u0947 \u0930\u0939\u0947\u0902\u0964",
    tts_btn: "\u{1F50A} \u0939\u093f\u0928\u094d\u0926\u0940 \u092e\u0947\u0902 \u0938\u0932\u093e\u0939 \u0938\u0941\u0928\u0947\u0902",
    share_wa: "\u{1F4AC} \u0935\u094d\u0939\u093e\u091f\u094d\u0938\u090f\u092a \u092a\u0930 \u092d\u0947\u091c\u0947\u0902",
    share_tg: "\u{2708}\u{FE0F} Telegram \u092a\u0930 \u092d\u0947\u091c\u0947\u0902",
    print_advisory: "\u{1F5A8}\u{FE0F} \u090f\u0921\u0935\u093e\u0907\u091c\u0930\u0940 \u092a\u094d\u0930\u093f\u0902\u091f \u0915\u0930\u0947\u0902",
    helpline_txt: "\u0915\u093f\u0938\u093e\u0928 \u0939\u0947\u0932\u094d\u092a\u0932\u093e\u0907\u0928",
    params_badge: "\u091a\u0930\u0923 1 / 2",
    popular_cities: "\u092a\u094d\u0930\u092e\u0941\u0916 \u0936\u0939\u0930:",
    dried_yes: "\u0939\u093e\u0901 (\u0927\u0942\u092a \u092e\u0947\u0902 \u0905\u091a\u094d\u091b\u0940 \u0924\u0930\u0939 \u0938\u0941\u0916\u093e\u092f\u093e)",
    dried_no: "\u0928\u0939\u0940\u0902 (\u0928\u092e\u0940 \u0915\u093e \u092c\u0921\u093c\u093e \u091c\u094b\u0916\u093f\u092e)",
    dried_help: "\u0905\u0928\u093e\u091c \u092e\u0947\u0902 \u0928\u092e\u0940 12-14% \u0938\u0947 \u0915\u092e \u0939\u094b\u0928\u0940 \u091a\u093e\u0939\u093f\u090f\u0964",
    upgrade_badge: "\u092d\u0902\u0921\u093e\u0930\u0923 \u0938\u0941\u0927\u093e\u0930 \u0938\u0941\u091d\u093e\u0935",
    low_headline: "\u0905\u0928\u093e\u091c \u092a\u0942\u0930\u0940 \u0924\u0930\u0939 \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0939\u0948",
    med_headline: "\u0938\u093e\u0935\u0927\u093e\u0928\u0940: \u0928\u092e\u0940 \u0915\u093e \u092e\u0927\u094d\u092f\u092e \u0916\u0924\u0930\u093e \u0939\u0948",
    high_headline: "\u0917\u0902\u092d\u0940\u0930 \u091a\u0947\u0924\u093e\u0935\u0928\u0940: \u0924\u0941\u0930\u0902\u0924 \u0938\u0941\u0930\u0915\u094d\u0937\u093e\u0924\u094d\u092e\u0915 \u0915\u0926\u092e \u0909\u0920\u093e\u090f\u0901!"
  }
};

let currentLang = 'en';
let currentForecast = null;
let currentAssessment = null;
let currentCityName = "Faridabad";
let weatherChartInstance = null;
let gpsCoords = null; // remembered when the GPS button is used

function assessRisk(forecast, storage, daysStored, dried) {
  const t = RULES.thresholds;
  const hi = forecast.filter(d => d.rh >= t.rh_high);
  const mid = forecast.filter(d => d.rh >= t.rh_mid);
  const rain = forecast.filter(d => d.rain >= t.rain_prob);

  const reasons = [];
  let w = 0;

  if (hi.length >= 2) {
    w += 3;
    reasons.push({ key: "humid_high", params: { n: hi.length, rh: t.rh_high } });
  } else if (hi.length === 1) {
    w += 1;
    reasons.push({ key: "humid_high", params: { n: 1, rh: t.rh_high } });
  } else if (mid.length >= 2) {
    w += 1;
    reasons.push({ key: "humid_mid", params: { n: mid.length, rh: t.rh_mid } });
  }

  if (rain.length >= 2) {
    w += 2;
  } else if (rain.length === 1) {
    w += 1;
  }
  if (rain.length > 0) {
    reasons.push({ key: "rain_risk", params: { n: rain.length } });
  }

  const heatDay = forecast.find(d => d.temp >= t.temp_min && d.temp <= t.temp_max && d.rh >= t.rh_mid);
  if (heatDay) {
    w += 1;
    reasons.push({ key: "heat", params: {} });
  }

  let total = 0;
  if (w > 0) {
    const sp = RULES.storage_points[storage] ?? 0;
    total = w + sp;
    if (sp > 0) {
      reasons.push({ key: "r_" + storage, params: {} });
    }
  }

  if (!dried) {
    total += 2;
    reasons.push({ key: "not_dried", params: {} });
  }

  if (daysStored > 30) {
    total += 1;
    reasons.push({ key: "long_stored", params: {} });
  }

  total = Math.max(0, total);

  const lv = RULES.levels;
  let level = "Low";
  if (total <= lv.low_max) {
    level = "Low";
  } else if (total <= lv.medium_max) {
    level = "Medium";
  } else {
    level = "High";
  }

  let peakDate = forecast[0].date;
  if (forecast.length > 0) {
    const sorted = [...forecast].sort((a, b) => (b.rh + b.rain) - (a.rh + a.rain));
    peakDate = sorted[0].date;
  }

  const actions = getActions(level, storage, dried);

  return {
    level,
    score: total,
    reasons,
    actions,
    peakDate
  };
}

function getActions(level, storage, dried) {
  if (level === "Low") {
    return ["a_ok"];
  }

  const acts = [];
  if (!dried) {
    acts.push("a_dry");
  }

  if (storage === "open_bag" || storage === "kothi") {
    acts.push("a_lift", "a_cover", "a_upgrade");
  } else if (storage === "pakka_godown") {
    acts.push("a_lift", "a_cover");
  } else {
    acts.push("a_sealed");
  }

  if (level === "High") {
    acts.push("a_check");
  }

  return acts;
}

async function geocode(cityName) {
  try {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(cityName) + "&count=1&language=en&format=json";
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        name: data.results[0].name + (data.results[0].country ? ", " + data.results[0].country : "")
      };
    }
  } catch (err) {
    console.warn("Geocoding network error:", err);
  }
  return null;
}

async function fetchLiveForecast(lat, lon, days = 5) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&forecast_days=" + days + "&timezone=auto&hourly=relative_humidity_2m,temperature_2m,precipitation_probability";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast API error");
  const data = await res.json();

  const hourly = data.hourly;
  const groups = {};

  for (let i = 0; i < hourly.time.length; i++) {
    const dateStr = hourly.time[i].substring(0, 10);
    if (!groups[dateStr]) {
      groups[dateStr] = { rh: [], temp: [], rain: [] };
    }
    groups[dateStr].rh.push(hourly.relative_humidity_2m[i]);
    groups[dateStr].temp.push(hourly.temperature_2m[i]);
    groups[dateStr].rain.push(hourly.precipitation_probability[i] || 0);
  }

  const result = Object.keys(groups).sort().map(d => {
    const rhArr = groups[d].rh;
    const tempArr = groups[d].temp;
    const rainArr = groups[d].rain;

    const avgRh = Math.round(rhArr.reduce((a, b) => a + b, 0) / rhArr.length);
    const avgTemp = +(tempArr.reduce((a, b) => a + b, 0) / tempArr.length).toFixed(1);
    const maxRain = Math.max(...rainArr);

    return {
      date: d,
      rh: avgRh,
      temp: avgTemp,
      rain: maxRain
    };
  });

  return result.slice(0, 5);
}

function getDemoForecast(type) {
  const isRain = type === "rain";
  const baseRh = isRain ? 86 : 42;
  const baseTemp = isRain ? 30 : 29;
  const baseRain = isRain ? 80 : 5;

  const list = [];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().substring(0, 10);
    list.push({
      date: dateStr,
      rh: baseRh + (i % 2) * 2,
      temp: baseTemp,
      rain: baseRain
    });
  }
  return list;
}

function t(key, params = {}) {
  const dict = MESSAGES[currentLang] || MESSAGES.en;
  let text = dict[key] || MESSAGES.en[key] || key;

  for (const [k, v] of Object.entries(params)) {
    text = text.replace(new RegExp("\\{" + k + "\\}", 'g'), v);
  }
  return text;
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('langBtnEn').classList.toggle('active', lang === 'en');
  document.getElementById('langBtnHi').classList.toggle('active', lang === 'hi');

  document.getElementById('navTagline').textContent = t('title');
  document.getElementById('mainTitle').textContent = t('title');
  document.getElementById('mainTagline').textContent = t('tagline');
  document.getElementById('formTitle').textContent = "\u2699\uFE0F " + t('storage') + " & " + t('source');
  document.getElementById('labelCity').textContent = t('city');
  document.getElementById('chipLabel').textContent = t('popular_cities');
  document.getElementById('labelSource').textContent = t('source');
  document.getElementById('srcLive').textContent = t('src_live');
  document.getElementById('srcRain').textContent = t('src_rain');
  document.getElementById('srcDry').textContent = t('src_dry');
  document.getElementById('labelGrain').textContent = t('grain');
  document.getElementById('labelStorage').textContent = t('storage');
  document.getElementById('labelDays').textContent = t('days');
  document.getElementById('labelDried').textContent = t('dried');
  document.getElementById('btnCheckText').textContent = t('check');
  document.getElementById('resultsTitle').textContent = "\u{1F4CA} " + t('risk');
  document.getElementById('titleWhy').textContent = "\u26A0\uFE0F " + t('why');
  document.getElementById('titleDo').textContent = "\u2705 " + t('do');
  document.getElementById('shareWhatsapp').textContent = t('share_wa');
  document.getElementById('shareTelegram').textContent = t('share_tg');
  document.getElementById('printAdvisory').textContent = t('print_advisory');
  document.getElementById('helpText').textContent = t('helpline_txt');
  document.getElementById('paramsBadge').textContent = t('params_badge');
  document.getElementById('noteText').textContent = t('note');
  document.getElementById('forecastHeader').textContent = "\u{1F324}\u{FE0F} " + t('forecast');
  document.getElementById('whatIfHeader').textContent = "\u{1F504} " + t('whatif');
  document.getElementById('roiBadge').textContent = t('upgrade_badge');
  document.getElementById('ttsBtnText').textContent = t('tts_btn');

  const driedChecked = document.getElementById('driedCheckbox').checked;
  document.getElementById('driedStatusText').textContent = driedChecked ? t('dried_yes') : t('dried_no');

  if (currentAssessment && currentForecast) {
    renderAssessmentUI(currentAssessment, currentForecast);
    renderForecastCards(currentForecast);
    renderWhatIfMatrix(currentForecast);
  }
}

function renderAssessmentUI(res, fc) {
  const banner = document.getElementById('riskBanner');
  banner.className = "risk-banner risk-" + res.level.toLowerCase();

  const iconMap = {
    Low: "\u{1F6E1}\u{FE0F}",
    Medium: "\u26A0\uFE0F",
    High: "\u{1F6A8}"
  };
  document.getElementById('riskIcon').textContent = iconMap[res.level] || "\u{1F33E}";
  document.getElementById('riskLevelTag').textContent = t(res.level);
  
  let headline = t('low_headline');
  if (res.level === "Medium") headline = t('med_headline');
  if (res.level === "High") headline = t('high_headline');
  document.getElementById('riskHeadline').textContent = headline;

  if (res.level !== "Low") {
    document.getElementById('riskPeakDate').textContent = t('peak', { date: res.peakDate });
  } else {
    document.getElementById('riskPeakDate').textContent = currentLang === 'hi' 
      ? "\u0905\u0917\u0932\u0947 5 \u0926\u093f\u0928\u094b\u0902 \u0924\u0915 \u092e\u094c\u0938\u092e \u0938\u0941\u0930\u0915\u094d\u0937\u093f\u0924 \u0914\u0930 \u0938\u0942\u0916\u093e \u0926\u093f\u0916 \u0930\u0939\u093e \u0939\u0948\u0964" 
      : "Weather forecast looks dry and safe for the next 5 days.";
  }

  document.getElementById('scoreValue').textContent = res.score;

  const whyUl = document.getElementById('whyList');
  whyUl.innerHTML = "";
  if (res.reasons.length === 0) {
    const li = document.createElement('li');
    li.textContent = currentLang === 'hi' ? "\u0915\u094b\u0908 \u0916\u093c\u093e\u0938 \u091c\u094b\u0916\u093f\u092e \u0928\u0939\u0940\u0902 \u092a\u093e\u092f\u093e \u0917\u092f\u093e\u0964" : "No major risks identified. Conditions are safe.";
    whyUl.appendChild(li);
  } else {
    res.reasons.forEach(r => {
      const li = document.createElement('li');
      li.textContent = t(r.key, r.params);
      whyUl.appendChild(li);
    });
  }

  const actionsUl = document.getElementById('actionsList');
  actionsUl.innerHTML = "";
  res.actions.forEach((actKey, idx) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = "act_" + idx;
    const span = document.createElement('span');
    span.textContent = t(actKey);

    label.appendChild(cb);
    label.appendChild(span);
    li.appendChild(label);
    actionsUl.appendChild(li);
  });
}

function renderForecastCards(forecast) {
  const container = document.getElementById('forecastCardsContainer');
  container.innerHTML = "";

  forecast.forEach(d => {
    let icon = "\u{2600}\u{FE0F}";
    if (d.rain >= 50) icon = "\u{1F327}\u{FE0F}";
    else if (d.rh >= 75) icon = "\u{1F32B}\u{FE0F}";
    else if (d.rh >= 65) icon = "\u{26C5}";

    const isHighRh = d.rh >= 70;

    const card = document.createElement('div');
    card.className = "fc-card";
    card.innerHTML = `
      <div class="fc-date">${d.date}</div>
      <div class="fc-icon">${icon}</div>
      <div class="fc-metrics">
        <div class="metric-row">
          <span>${t('rh')}:</span>
          <span class="metric-val ${isHighRh ? 'high-rh' : ''}">${d.rh}%</span>
        </div>
        <div class="metric-row">
          <span>${t('temp')}:</span>
          <span class="metric-val">${d.temp}\u00B0C</span>
        </div>
        <div class="metric-row">
          <span>${t('rain')}:</span>
          <span class="metric-val">${d.rain}%</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  renderChart(forecast);
}

function renderChart(forecast) {
  const ctx = document.getElementById('weatherChart');
  if (!ctx || typeof Chart === 'undefined') return;

  const labels = forecast.map(d => d.date);
  const rhData = forecast.map(d => d.rh);
  const tempData = forecast.map(d => d.temp);
  const rainData = forecast.map(d => d.rain);

  if (weatherChartInstance) {
    weatherChartInstance.destroy();
  }

  weatherChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: currentLang === 'hi' ? '\u0928\u092e\u0940 (RH %)' : 'Humidity (RH %)',
          data: rhData,
          backgroundColor: rhData.map(v => v >= 75 ? 'rgba(220, 38, 38, 0.7)' : v >= 70 ? 'rgba(217, 119, 6, 0.6)' : 'rgba(21, 128, 61, 0.6)'),
          borderColor: rhData.map(v => v >= 75 ? '#dc2626' : v >= 70 ? '#d97706' : '#15803d'),
          borderWidth: 1.5,
          yAxisID: 'y'
        },
        {
          label: currentLang === 'hi' ? '\u092c\u093e\u0930\u093f\u0936 \u0938\u0902\u092d\u093e\u0935\u0928\u093e (%)' : 'Rain Chance (%)',
          data: rainData,
          type: 'line',
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.2)',
          tension: 0.3,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: currentLang === 'hi' ? '\u0924\u093e\u092a\u092e\u093e\u0928 (\u00B0C)' : 'Temp (\u00B0C)',
          data: tempData,
          type: 'line',
          borderColor: '#f97316',
          backgroundColor: '#f97316',
          borderDash: [4, 4],
          tension: 0.2,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'Inter, sans-serif', size: 11 } }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: 'Percentage (%)', font: { size: 10 } }
        },
        y1: {
          position: 'right',
          beginAtZero: false,
          min: 10,
          max: 50,
          grid: { drawOnChartArea: false },
          title: { display: true, text: 'Temp (\u00B0C)', font: { size: 10 } }
        }
      }
    }
  });
}

function renderWhatIfMatrix(forecast) {
  const container = document.getElementById('whatIfGrid');
  container.innerHTML = "";

  const daysStored = parseInt(document.getElementById('daysInput').value) || 0;
  const dried = document.getElementById('driedCheckbox').checked;
  const currentSelectedStorage = document.getElementById('storageSelect').value;

  const storageKeys = Object.keys(RULES.storage_points);

  storageKeys.forEach(sKey => {
    const assessment = assessRisk(forecast, sKey, daysStored, dried);
    const meta = RULES.storage_names[sKey];
    const isCurrent = sKey === currentSelectedStorage;

    const card = document.createElement('div');
    card.className = "whatif-card " + (isCurrent ? 'current' : '');
    card.onclick = () => {
      document.getElementById('storageSelect').value = sKey;
      triggerRecalculate();
    };

    const pillClass = "pill-" + assessment.level.toLowerCase();
    const storageTitle = currentLang === 'hi' ? meta.hi : meta.en;

    card.innerHTML = `
      <div>
        <div class="whatif-icon">${meta.icon}</div>
        <div class="whatif-title">${storageTitle}</div>
      </div>
      <div>
        <span class="whatif-pill ${pillClass}">
          ${t(assessment.level)} (Score ${assessment.score})
        </span>
        ${isCurrent ? '<small style="display:block;margin-top:4px;color:var(--primary);font-weight:600;">' + (currentLang === 'hi' ? '\u25CF \u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u091a\u092f\u0928' : '\u25CF Current Storage') + '</small>' : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

async function handleFormSubmit(e) {
  if (e) e.preventDefault();
  
  const city = document.getElementById('cityInput').value.trim() || "Faridabad";
  const source = document.querySelector('input[name="source"]:checked').value;
  const storage = document.getElementById('storageSelect').value;
  const days = parseInt(document.getElementById('daysInput').value) || 0;
  const dried = document.getElementById('driedCheckbox').checked;

  document.getElementById('loadingIndicator').classList.remove('hidden');

  let forecast = null;
  if (source === "live") {
    try {
      const geo = (gpsCoords && city === gpsCoords.label)
        ? { lat: gpsCoords.lat, lon: gpsCoords.lon, name: gpsCoords.label }
        : await geocode(city);
      if (geo) {
        currentCityName = geo.name;
        document.getElementById('forecastLocation').textContent = geo.name;
        forecast = await fetchLiveForecast(geo.lat, geo.lon);
      } else {
        alert(t('geo_fail'));
        forecast = getDemoForecast("dry");
      }
    } catch (err) {
      console.warn("Forecast fetch failure, falling back to demo:", err);
      alert(t('net_fail'));
      forecast = getDemoForecast("dry");
    }
  } else {
    forecast = getDemoForecast(source);
    currentCityName = city;
    document.getElementById('forecastLocation').textContent = city + " (" + (source === 'rain' ? 'Rain Demo' : 'Dry Demo') + ")";
  }

  document.getElementById('loadingIndicator').classList.add('hidden');

  currentForecast = forecast;
  currentAssessment = assessRisk(forecast, storage, days, dried);

  renderAssessmentUI(currentAssessment, currentForecast);
  renderForecastCards(currentForecast);
  renderWhatIfMatrix(currentForecast);

  if (window.innerWidth < 768) {
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
  }
}

function triggerRecalculate() {
  if (!currentForecast) {
    handleFormSubmit();
    return;
  }
  const storage = document.getElementById('storageSelect').value;
  const days = parseInt(document.getElementById('daysInput').value) || 0;
  const dried = document.getElementById('driedCheckbox').checked;

  document.getElementById('driedStatusText').textContent = dried ? t('dried_yes') : t('dried_no');

  currentAssessment = assessRisk(currentForecast, storage, days, dried);
  renderAssessmentUI(currentAssessment, currentForecast);
  renderWhatIfMatrix(currentForecast);
}

function updateWeatherSource(val) {
  handleFormSubmit();
}

function setCity(city) {
  gpsCoords = null;
  document.getElementById('cityInput').value = city;
  handleFormSubmit();
}

function syncRange(val) {
  document.getElementById('daysRange').value = Math.min(val, 180);
  triggerRecalculate();
}

function syncNumber(val) {
  document.getElementById('daysInput').value = val;
  triggerRecalculate();
}

function detectUserLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  const btn = document.getElementById('geoBtn');
  btn.textContent = "\u23F3...";

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      btn.textContent = "\u{1F4CD} GPS";
      try {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const detectedName = "GPS (" + lat.toFixed(2) + ", " + lon.toFixed(2) + ")";
        gpsCoords = { lat, lon, label: detectedName };
        document.getElementById('cityInput').value = detectedName;
        currentCityName = detectedName;
        document.getElementById('forecastLocation').textContent = detectedName;
        
        currentForecast = await fetchLiveForecast(lat, lon);
        const storage = document.getElementById('storageSelect').value;
        const days = parseInt(document.getElementById('daysInput').value) || 0;
        const dried = document.getElementById('driedCheckbox').checked;
        currentAssessment = assessRisk(currentForecast, storage, days, dried);

        renderAssessmentUI(currentAssessment, currentForecast);
        renderForecastCards(currentForecast);
        renderWhatIfMatrix(currentForecast);
      } catch (e) {
        alert("Failed to fetch forecast for GPS coordinates.");
      }
    },
    (err) => {
      btn.textContent = "\u{1F4CD} GPS";
      alert("Location permission denied. Please enter city manually.");
    }
  );
}

function playAudioAdvisory() {
  if (!window.speechSynthesis) {
    alert("Audio speech synthesis is not supported on this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  if (!currentAssessment) return;

  const langCode = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
  let speechText = "";

  if (currentLang === 'hi') {
    speechText += "\u091f\u0940\u092e \u0905\u0928\u091a\u093e\u0930\u094d\u091f\u0947\u0921 \u0905\u0928\u093e\u091c \u092d\u0902\u0921\u093e\u0930\u0923 \u0938\u0932\u093e\u0939\u0964 ";
    speechText += "\u091c\u094b\u0916\u093f\u092e \u0938\u094d\u0924\u0930: " + t(currentAssessment.level) + "\u0964 ";
    speechText += "\u0938\u092c\u0938\u0947 \u091c\u093c\u094d\u092f\u093e\u0926\u093e \u091c\u094b\u0916\u093f\u092e \u0924\u093e\u0930\u0940\u0916 " + currentAssessment.peakDate + " \u0915\u0947 \u0906\u0938\u092a\u093e\u0938 \u0930\u0939\u0947\u0917\u093e\u0964 ";
    if (currentAssessment.reasons.length > 0) {
      speechText += "\u0915\u093e\u0930\u0923: ";
      currentAssessment.reasons.forEach(r => speechText += t(r.key, r.params) + ". ");
    }
    speechText += "\u0906\u092a\u0915\u094b \u0915\u094d\u092f\u093e \u0915\u0930\u0928\u093e \u091a\u093e\u0939\u093f\u090f: ";
    currentAssessment.actions.forEach(a => speechText += t(a) + ". ");
  } else {
    speechText += "Team Uncharted Grain Storage Advisory. ";
    speechText += "Risk Level: " + t(currentAssessment.level) + ". ";
    speechText += "Peak risk date around " + currentAssessment.peakDate + ". ";
    if (currentAssessment.reasons.length > 0) {
      speechText += "Key Reasons: ";
      currentAssessment.reasons.forEach(r => speechText += t(r.key, r.params) + ". ");
    }
    speechText += "Action required: ";
    currentAssessment.actions.forEach(a => speechText += t(a) + ". ");
  }

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = langCode;
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

function generateAdvisorySummaryText() {
  if (!currentAssessment) return "";

  const grainType = document.getElementById('grainSelect').value;
  const storageType = document.getElementById('storageSelect').value;
  const grainName = t('g_' + grainType);
  const storageName = t('s_' + storageType);

  let msg = "\u{1F33E} *TEAM UNCHARTED - SMART GRAIN STORAGE ADVISORY*\n";
  msg += "\u{1F4CD} " + currentCityName + " | \u{1F33E} " + grainName + " (" + storageName + ")\n\n";
  msg += "\u{1F6A8} *" + t('risk') + ": " + t(currentAssessment.level) + "* (Peak: " + currentAssessment.peakDate + ")\n\n";

  if (currentAssessment.reasons.length > 0) {
    msg += "\u26A0\uFE0F *" + t('why') + ":*\n";
    currentAssessment.reasons.forEach(r => {
      msg += "\u2022 " + t(r.key, r.params) + "\n";
    });
    msg += "\n";
  }

  msg += "\u2705 *" + t('do') + ":*\n";
  currentAssessment.actions.forEach(a => {
    msg += "\u2022 " + t(a) + "\n";
  });

  msg += "\n\u{1F4DE} Kisan Helpline: 1800-180-1551\n";
  msg += "\u{1F517} Smart Storage App: Team Uncharted";
  return msg;
}

function shareOnWhatsApp() {
  const summary = generateAdvisorySummaryText();
  const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(summary);
  window.open(url, '_blank');
}

function openTelegramModal() {
  const summary = generateAdvisorySummaryText();
  document.getElementById('tgMessagePreview').textContent = summary;
  document.getElementById('telegramModal').classList.remove('hidden');
}

function closeTelegramModal() {
  document.getElementById('telegramModal').classList.add('hidden');
}

async function sendTelegramAlert() {
  const token = document.getElementById('tgTokenInput').value.trim();
  const chat = document.getElementById('tgChatInput').value.trim();
  const summary = generateAdvisorySummaryText();
  const statusEl = document.getElementById('tgStatusMessage');

  statusEl.classList.remove('hidden', 'success', 'error');

  if (!token || !chat) {
    statusEl.className = "tg-status success";
    statusEl.textContent = currentLang === 'hi'
      ? "\u2705 [\u0938\u093f\u092e\u094d\u092f\u0941\u0932\u0947\u091f\u0930 \u092e\u094b\u0921] \u091f\u0947\u0932\u0940\u0917\u094d\u0930\u093e\u092e \u0905\u0932\u0930\u094d\u091f \u0938\u092b\u0932\u0924\u093e\u092a\u0942\u0930\u094d\u0935\u0915 \u092d\u0947\u091c\u093e \u0917\u092f\u093e!"
      : "\u2705 [Simulator Mode] Telegram alert dispatched successfully!";
    setTimeout(closeTelegramModal, 2200);
    return;
  }

  try {
    const res = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: summary })
    });
    const result = await res.json();
    if (result.ok) {
      statusEl.className = "tg-status success";
      statusEl.textContent = t('sent');
      setTimeout(closeTelegramModal, 2000);
    } else {
      statusEl.className = "tg-status error";
      statusEl.textContent = t('fail') + " (" + result.description + ")";
    }
  } catch (e) {
    statusEl.className = "tg-status error";
    statusEl.textContent = t('fail');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  handleFormSubmit();
});
