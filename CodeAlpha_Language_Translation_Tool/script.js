// ==========================================
// LinguaAI - Language Translation Tool
// CodeAlpha Internship - Task 1
// ==========================================


// ---------- DOM ELEMENTS ----------

const inputText = document.getElementById("inputText");
const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const translateBtn = document.getElementById("translateBtn");
const swapLanguages = document.getElementById("swapLanguages");

const clearText = document.getElementById("clearText");
const copyTranslation = document.getElementById("copyTranslation");
const pasteText = document.getElementById("pasteText");

const speakTranslation = document.getElementById("speakTranslation");

const characterCount = document.getElementById("characterCount");
const translationResult = document.getElementById("translationResult");
const translationStatus = document.getElementById("translationStatus");

const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

const themeToggle = document.getElementById("themeToggle");


// ---------- LANGUAGE NAMES ----------

const languageNames = {

    auto: "Detect Language",
    en: "English",
    mr: "Marathi",
    hi: "Hindi",
    gu: "Gujarati",
    bn: "Bengali",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    ml: "Malayalam",
    pa: "Punjabi",
    fr: "French",
    de: "German",
    es: "Spanish",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    ar: "Arabic"

};


// ---------- CHARACTER COUNTER ----------

inputText.addEventListener("input", () => {

    const length = inputText.value.length;

    characterCount.textContent = `${length} / 5000 characters`;

    hideError();

});


// ---------- TRANSLATE ----------

translateBtn.addEventListener("click", translateText);


async function translateText() {

    const text = inputText.value.trim();

    const source = sourceLanguage.value;
    const target = targetLanguage.value;


    // Validate input

    if (!text) {

        showError("Please enter some text to translate.");

        inputText.focus();

        return;

    }


    // Same language check

    if (source !== "auto" && source === target) {

        showError("Source and target languages cannot be the same.");

        return;

    }


    hideError();

    setLoading(true);

    translationStatus.textContent = "Translating...";


    try {

        /*
         * MyMemory Translation API
         *
         * The API is used to process the user's text
         * and return the translated response.
         */

        const sourceCode = source === "auto" ? "auto" : source;

        const apiURL =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceCode}|${target}`;


        const response = await fetch(apiURL);


        if (!response.ok) {

            throw new Error("Translation service is currently unavailable.");

        }


        const data = await response.json();


        // Check API response

        if (
            !data ||
            !data.responseData ||
            !data.responseData.translatedText
        ) {

            throw new Error("Unable to generate translation.");

        }


        const translatedText =
            decodeHTMLEntities(data.responseData.translatedText);


        // Display translation

        displayTranslation(translatedText);


        // Update status

        translationStatus.textContent =
            `Translated to ${languageNames[target]}`;


        // Save history

        saveHistory(
            text,
            translatedText,
            source,
            target
        );


    } catch (error) {

        console.error("Translation Error:", error);

        showError(
            "Unable to translate right now. Please check your internet connection and try again."
        );

        translationStatus.textContent = "Translation failed";


    } finally {

        setLoading(false);

    }

}


// ---------- DISPLAY TRANSLATION ----------

function displayTranslation(text) {

    translationResult.innerHTML = "";

    const result = document.createElement("div");

    result.className = "translated-text";

    result.textContent = text;

    translationResult.appendChild(result);

}


// ---------- HTML ENTITY DECODER ----------

function decodeHTMLEntities(text) {

    const textarea = document.createElement("textarea");

    textarea.innerHTML = text;

    return textarea.value;

}


// ---------- LOADING STATE ----------

function setLoading(isLoading) {

    if (isLoading) {

        translateBtn.classList.add("loading");

        translateBtn.disabled = true;

    } else {

        translateBtn.classList.remove("loading");

        translateBtn.disabled = false;

    }

}


// ---------- SWAP LANGUAGES ----------

swapLanguages.addEventListener("click", () => {

    const sourceValue = sourceLanguage.value;

    const targetValue = targetLanguage.value;


    // Do not swap if source is auto-detect

    if (sourceValue === "auto") {

        showError(
            "Select a source language before swapping."
        );

        return;

    }


    sourceLanguage.value = targetValue;

    targetLanguage.value = sourceValue;


    // Swap text if translation exists

    const currentTranslation =
        translationResult.querySelector(".translated-text");


    if (currentTranslation && inputText.value.trim()) {

        const oldInput = inputText.value;

        inputText.value = currentTranslation.textContent;

        displayTranslation(oldInput);

        characterCount.textContent =
            `${inputText.value.length} / 5000 characters`;

        translationStatus.textContent =
            "Languages swapped";

    }

    hideError();

});


// ---------- CLEAR TEXT ----------

clearText.addEventListener("click", () => {

    inputText.value = "";

    characterCount.textContent = "0 / 5000 characters";

    translationResult.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                <i class="fa-solid fa-globe"></i>
            </div>

            <h3>Your translation will appear here</h3>

            <p>
                Enter text on the left and click
                <strong>Translate</strong>.
            </p>

        </div>

    `;

    translationStatus.textContent =
        "Ready to translate";

    hideError();

    inputText.focus();

});


// ---------- COPY TRANSLATION ----------

copyTranslation.addEventListener("click", async () => {

    const result =
        translationResult.querySelector(".translated-text");


    if (!result) {

        showError("There is no translation to copy.");

        return;

    }


    const text = result.textContent;


    try {

        await navigator.clipboard.writeText(text);

        const original =
            copyTranslation.innerHTML;

        copyTranslation.innerHTML =
            `<i class="fa-solid fa-check"></i> Copied`;

        setTimeout(() => {

            copyTranslation.innerHTML = original;

        }, 1800);

    } catch (error) {

        showError("Unable to copy the translation.");

    }

});


// ---------- PASTE TEXT ----------

pasteText.addEventListener("click", async () => {

    try {

        const text =
            await navigator.clipboard.readText();


        if (!text) {

            showError("Clipboard is empty.");

            return;

        }


        inputText.value =
            text.substring(0, 5000);


        characterCount.textContent =
            `${inputText.value.length} / 5000 characters`;

        hideError();

        inputText.focus();


    } catch (error) {

        showError(
            "Clipboard access is not available. Please paste manually."
        );

    }

});


// ---------- TEXT TO SPEECH ----------

speakTranslation.addEventListener("click", () => {

    const result =
        translationResult.querySelector(".translated-text");


    if (!result) {

        showError("There is no translation to listen to.");

        return;

    }


    if (!("speechSynthesis" in window)) {

        showError(
            "Text-to-speech is not supported by your browser."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(result.textContent);


    speech.lang =
        targetLanguage.value === "auto"
            ? "en-US"
            : getSpeechLanguage(targetLanguage.value);


    speech.rate = 0.9;

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

});


// ---------- SPEECH LANGUAGE ----------

function getSpeechLanguage(code) {

    const languages = {

        en: "en-US",
        mr: "mr-IN",
        hi: "hi-IN",
        gu: "gu-IN",
        bn: "bn-IN",
        ta: "ta-IN",
        te: "te-IN",
        kn: "kn-IN",
        ml: "ml-IN",
        pa: "pa-IN",

        fr: "fr-FR",
        de: "de-DE",
        es: "es-ES",
        it: "it-IT",
        pt: "pt-PT",
        ru: "ru-RU",
        ja: "ja-JP",
        ko: "ko-KR",
        zh: "zh-CN",
        ar: "ar-SA"

    };


    return languages[code] || "en-US";

}


// ---------- ERROR HANDLING ----------

function showError(message) {

    errorText.textContent = message;

    errorMessage.classList.add("show");

}


function hideError() {

    errorMessage.classList.remove("show");

}


// ---------- TRANSLATION HISTORY ----------

function saveHistory(
    sourceText,
    translatedText,
    source,
    target
) {

    const history =
        JSON.parse(
            localStorage.getItem("linguaAIHistory")
        ) || [];


    const newItem = {

        sourceText:
            sourceText.substring(0, 150),

        translatedText:
            translatedText.substring(0, 150),

        source,

        target,

        date:
            new Date().toLocaleString()

    };


    history.unshift(newItem);


    // Keep latest 10 translations

    const limitedHistory =
        history.slice(0, 10);


    localStorage.setItem(
        "linguaAIHistory",
        JSON.stringify(limitedHistory)
    );


    displayHistory();

}


// ---------- DISPLAY HISTORY ----------

function displayHistory() {

    const history =
        JSON.parse(
            localStorage.getItem("linguaAIHistory")
        ) || [];


    if (history.length === 0) {

        historyList.innerHTML = `

            <div class="history-empty">

                <i class="fa-regular fa-clock"></i>

                <p>
                    Your recent translations will appear here.
                </p>

            </div>

        `;

        return;

    }


    historyList.innerHTML = "";


    history.forEach((item) => {

        const historyItem =
            document.createElement("div");


        historyItem.className =
            "history-item";


        historyItem.innerHTML = `

            <div class="history-languages">

                ${languageNames[item.source]}
                <i class="fa-solid fa-arrow-right"></i>
                ${languageNames[item.target]}

            </div>

            <div class="history-source">
                ${escapeHTML(item.sourceText)}
            </div>

            <div class="history-target">
                ${escapeHTML(item.translatedText)}
            </div>

        `;


        historyList.appendChild(historyItem);

    });

}


// ---------- ESCAPE HTML ----------

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ---------- CLEAR HISTORY ----------

clearHistory.addEventListener("click", () => {

    const history =
        JSON.parse(
            localStorage.getItem("linguaAIHistory")
        ) || [];


    if (history.length === 0) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to clear your translation history?"
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem("linguaAIHistory");

    displayHistory();

});


// ---------- DARK / LIGHT MODE ----------

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    if (isDark) {

        themeToggle.innerHTML =
            `<i class="fa-solid fa-sun"></i>`;

        localStorage.setItem(
            "linguaAITheme",
            "dark"
        );

    } else {

        themeToggle.innerHTML =
            `<i class="fa-solid fa-moon"></i>`;

        localStorage.setItem(
            "linguaAITheme",
            "light"
        );

    }

});


// ---------- LOAD SAVED THEME ----------

function loadTheme() {

    const savedTheme =
        localStorage.getItem("linguaAITheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeToggle.innerHTML =
            `<i class="fa-solid fa-sun"></i>`;

    }

}


// ---------- KEYBOARD SHORTCUT ----------

inputText.addEventListener("keydown", (event) => {

    // Ctrl + Enter = Translate

    if (
        event.ctrlKey &&
        event.key === "Enter"
    ) {

        translateText();

    }

});


// ---------- INITIALIZE ----------

displayHistory();

loadTheme();

console.log(
    "LinguaAI Translation Tool initialized successfully."
);