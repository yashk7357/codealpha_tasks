// ==========================================
// HelpBot - Professional FAQ Chatbot
// CodeAlpha Internship - Task 2
// ==========================================

const faqs = [
    {
        intent: "greeting",
        keywords: ["hello", "hi", "hey", "hii", "hallo", "good morning", "good afternoon", "good evening"],
        answer: "Hello! 👋 I'm HelpBot. How can I assist you today?"
    },

    {
        intent: "service",
        keywords: [
            "what is this chatbot",
            "what is this service",
            "what is this",
            "about this chatbot",
            "about chatbot",
            "what is helpbot",
            "purpose"
        ],
        answer: "This is a Smart FAQ Chatbot designed to answer frequently asked questions quickly using predefined knowledge and intelligent text matching."
    },

    {
        intent: "working",
        keywords: [
            "how does it work",
            "how does this work",
            "how does chatbot work",
            "how this chatbot works",
            "how it works",
            "explain how it works",
            "explain working",
            "working process"
        ],
        answer: "HelpBot analyzes your question, compares important words with its FAQ knowledge base, and selects the most relevant answer. This allows users to ask questions in different ways."
    },

    {
        intent: "features",
        keywords: [
            "feature",
            "features",
            "what features",
            "what are the features",
            "available features",
            "chatbot features",
            "what can you do",
            "what can this chatbot do",
            "what can chatbot do",
            "what does this chatbot do",
            "capabilities",
            "capability",
            "functions",
            "options"
        ],
        answer: "HelpBot provides instant FAQ responses, intelligent question matching, quick question suggestions, typing feedback, chat history, dark mode, and a responsive interface."
    },

    {
        intent: "support",
        keywords: [
            "support",
            "contact support",
            "get support",
            "need support",
            "contact",
            "help",
            "assistance",
            "support team"
        ],
        answer: "For support, please contact the project's support team or administrator through the official support channel."
    },

    {
        intent: "pricing",
        keywords: [
            "price",
            "pricing",
            "what is the price",
            "how much",
            "how much does it cost",
            "cost",
            "fee",
            "payment",
            "plans"
        ],
        answer: "For pricing information, please check the official pricing details or contact the service administrator."
    },

    {
        intent: "account",
        keywords: [
            "account",
            "create account",
            "new account",
            "my account",
            "login",
            "sign in",
            "signin",
            "register",
            "registration"
        ],
        answer: "You can manage your account through the available login or registration options provided by the service."
    },

    {
        intent: "thanks",
        keywords: [
            "thank",
            "thanks",
            "thank you",
            "thankyou"
        ],
        answer: "You're welcome! 😊 I'm always happy to help."
    },

    {
        intent: "goodbye",
        keywords: [
            "bye",
            "goodbye",
            "bye bye",
            "see you",
            "see you later"
        ],
        answer: "Goodbye! 👋 Have a great day!"
    }
];


// ==========================================
// DOM ELEMENTS
// ==========================================

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typingIndicator = document.getElementById("typingIndicator");
const themeBtn = document.getElementById("themeBtn");
const clearBtn = document.getElementById("clearBtn");
const quickButtons = document.querySelectorAll(".quick-btn");


// ==========================================
// STOP WORDS
// ==========================================

const stopWords = new Set([
    "a", "an", "the",
    "is", "are", "am",
    "was", "were",
    "to", "of", "in",
    "on", "for",
    "and", "or",
    "this", "that",
    "can", "you",
    "your", "me", "my",
    "how", "what",
    "why", "where", "when",
    "does", "do", "did",
    "please", "could", "would",
    "tell", "about",
    "i", "it"
]);


// ==========================================
// TEXT NORMALIZATION
// ==========================================

function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}


// ==========================================
// TOKENIZATION
// ==========================================

function tokenize(text) {
    return normalizeText(text)
        .split(" ")
        .filter(word => word.length > 1);
}


// ==========================================
// IMPORTANT WORDS
// ==========================================

function getImportantWords(text) {
    return tokenize(text)
        .filter(word => !stopWords.has(word));
}


// ==========================================
// DIRECT INTENT DETECTION
// ==========================================

function detectDirectIntent(question) {

    const text = normalizeText(question);

    // Greeting
    const greetings = [
        "hello",
        "hi",
        "hey",
        "hii",
        "hallo",
        "good morning",
        "good afternoon",
        "good evening"
    ];

    if (greetings.includes(text)) {
        return "greeting";
    }


    // Goodbye
    const goodbyes = [
        "bye",
        "goodbye",
        "bye bye",
        "see you",
        "see you later"
    ];

    if (goodbyes.includes(text)) {
        return "goodbye";
    }


    // Thanks
    if (
        text === "thank" ||
        text === "thanks" ||
        text === "thank you"
    ) {
        return "thanks";
    }

    return null;
}


// ==========================================
// SPECIAL INTENT DETECTION
// ==========================================

function detectSpecialIntent(question) {

    const text = normalizeText(question);


    // SERVICE
    if (
        text.includes("what is this chatbot") ||
        text.includes("what is this service") ||
        text.includes("what is helpbot") ||
        text.includes("about this chatbot") ||
        text.includes("about chatbot")
    ) {
        return "service";
    }


    // FEATURES
    if (
        text.includes("what can you do") ||
        text.includes("what can this chatbot do") ||
        text.includes("what can chatbot do") ||
        text.includes("what does this chatbot do") ||
        text.includes("what are the features") ||
        text.includes("tell me about the features") ||
        text.includes("tell me your features") ||
        text.includes("chatbot features")
    ) {
        return "features";
    }


    // WORKING
    if (
        text.includes("how does it work") ||
        text.includes("how does this work") ||
        text.includes("how does chatbot work") ||
        text.includes("how this chatbot works") ||
        text.includes("how it works") ||
        text.includes("explain how it works") ||
        text.includes("explain how this chatbot works")
    ) {
        return "working";
    }


    // SUPPORT
    if (
        text.includes("contact support") ||
        text.includes("get support") ||
        text.includes("need support") ||
        text.includes("where can i get help") ||
        text.includes("how can i get help")
    ) {
        return "support";
    }


    // PRICING
    if (
        text.includes("what is the price") ||
        text.includes("how much") ||
        text.includes("how much does it cost") ||
        text.includes("pricing") ||
        text.includes("cost")
    ) {
        return "pricing";
    }


    // ACCOUNT
    if (
        text.includes("create account") ||
        text.includes("new account") ||
        text.includes("sign in") ||
        text.includes("login") ||
        text.includes("register")
    ) {
        return "account";
    }

    return null;
}


// ==========================================
// SIMILARITY CALCULATION
// ==========================================

function calculateSimilarity(question, keywords) {

    const questionWords = getImportantWords(question);

    const faqWords = getImportantWords(
        keywords.join(" ")
    );

    if (
        questionWords.length === 0 ||
        faqWords.length === 0
    ) {
        return 0;
    }

    let matchedWords = 0;

    questionWords.forEach(questionWord => {

        faqWords.forEach(faqWord => {

            // Exact match
            if (questionWord === faqWord) {
                matchedWords += 1;
            }

            // Word variation
            else if (
                questionWord.length >= 4 &&
                faqWord.length >= 4 &&
                (
                    questionWord.startsWith(faqWord) ||
                    faqWord.startsWith(questionWord)
                )
            ) {
                matchedWords += 0.7;
            }

        });

    });

    return matchedWords /
        Math.max(
            questionWords.length,
            faqWords.length
        );
}


// ==========================================
// FIND BEST ANSWER
// ==========================================

function findBestAnswer(question) {

    // 1. Direct intent
    const directIntent =
        detectDirectIntent(question);

    if (directIntent) {

        const faq =
            faqs.find(
                item => item.intent === directIntent
            );

        if (faq) {
            return faq.answer;
        }
    }


    // 2. Special intent
    const specialIntent =
        detectSpecialIntent(question);

    if (specialIntent) {

        const faq =
            faqs.find(
                item => item.intent === specialIntent
            );

        if (faq) {
            return faq.answer;
        }
    }


    // 3. Similarity matching
    let bestFaq = null;
    let bestScore = 0;

    faqs.forEach(faq => {

        const score =
            calculateSimilarity(
                question,
                faq.keywords
            );

        if (score > bestScore) {

            bestScore = score;
            bestFaq = faq;

        }
    });


    if (
        bestFaq &&
        bestScore >= 0.25
    ) {
        return bestFaq.answer;
    }


    // 4. Fallback
    return "I'm sorry, I couldn't find an answer to that question. 🤔 Please try asking about our service, features, pricing, account, or support.";
}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ==========================================
// ADD USER MESSAGE
// ==========================================

function addUserMessage(message) {

    const element =
        document.createElement("div");

    element.className =
        "message user-message";

    element.innerHTML = `
        <div class="avatar">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="message-content">

            <span class="message-name">
                You
            </span>

            <div class="bubble">
                ${escapeHTML(message)}
            </div>

        </div>
    `;

    chatMessages.appendChild(element);

    saveChat();

    scrollToBottom();
}


// ==========================================
// ADD BOT MESSAGE
// ==========================================

function addBotMessage(message) {

    const element =
        document.createElement("div");

    element.className =
        "message bot-message";

    element.innerHTML = `
        <div class="avatar">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="message-content">

            <span class="message-name">
                HelpBot
            </span>

            <div class="bubble">
                ${escapeHTML(message)}
            </div>

        </div>
    `;

    chatMessages.appendChild(element);

    saveChat();

    scrollToBottom();
}


// ==========================================
// TYPING INDICATOR
// ==========================================

function showTyping() {

    typingIndicator.style.display = "flex";

    scrollToBottom();
}


function hideTyping() {

    typingIndicator.style.display = "none";
}


// ==========================================
// SCROLL TO BOTTOM
// ==========================================

function scrollToBottom() {

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// ==========================================
// SEND MESSAGE
// ==========================================

function sendMessage() {

    const message =
        userInput.value.trim();

    if (!message) {

        userInput.focus();

        return;
    }


    addUserMessage(message);

    userInput.value = "";

    showTyping();


    setTimeout(() => {

        hideTyping();

        const answer =
            findBestAnswer(message);

        addBotMessage(answer);

    }, 700);
}


// ==========================================
// SEND BUTTON
// ==========================================

if (sendBtn) {

    sendBtn.addEventListener(
        "click",
        sendMessage
    );
}


// ==========================================
// ENTER KEY
// ==========================================

if (userInput) {

    userInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();
            }
        }
    );
}


// ==========================================
// QUICK QUESTIONS
// ==========================================

quickButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            userInput.value =
                this.textContent.trim();

            sendMessage();
        }
    );

});


// ==========================================
// THEME ICON
// ==========================================

function updateThemeIcon() {

    if (!themeBtn) return;

    const icon =
        themeBtn.querySelector("i");

    if (!icon) return;


    if (
        document.body.classList.contains("dark")
    ) {

        icon.className =
            "fa-solid fa-sun";

        themeBtn.title =
            "Switch to light mode";

    } else {

        icon.className =
            "fa-solid fa-moon";

        themeBtn.title =
            "Switch to dark mode";
    }
}


// ==========================================
// DARK MODE
// ==========================================

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function() {

            document.body.classList.toggle("dark");

            const theme =
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "helpbot-theme",
                theme
            );

            updateThemeIcon();
        }
    );
}


// ==========================================
// LOAD THEME
// ==========================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "helpbot-theme"
        );

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }

    updateThemeIcon();
}


// ==========================================
// CLEAR CHAT
// ==========================================

if (clearBtn) {

    clearBtn.addEventListener(
        "click",
        function() {

            const confirmClear =
                confirm(
                    "Are you sure you want to clear the conversation?"
                );

            if (!confirmClear) {
                return;
            }

            chatMessages.innerHTML = "";

            localStorage.removeItem(
                "helpbot-chat"
            );

            addBotMessage(
                "Chat cleared successfully. 👋 How can I help you?"
            );
        }
    );
}


// ==========================================
// SAVE CHAT
// ==========================================

function saveChat() {

    localStorage.setItem(
        "helpbot-chat",
        chatMessages.innerHTML
    );
}


// ==========================================
// LOAD CHAT
// ==========================================

function loadChat() {

    const savedChat =
        localStorage.getItem(
            "helpbot-chat"
        );

    if (savedChat) {

        chatMessages.innerHTML =
            savedChat;
    }
}


// ==========================================
// INITIALIZE
// ==========================================

window.addEventListener(
    "load",
    function() {

        loadTheme();

        loadChat();

        if (userInput) {
            userInput.focus();
        }

        scrollToBottom();

    }
);