// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8sqRoCqN9Xx-XGhtKSrjFukT8uPI7Bl8",
    authDomain: "jounzarian.firebaseapp.com",
    projectId: "jounzarian",
    storageBucket: "jounzarian.appspot.com",
    messagingSenderId: "917000531806",
    appId: "1:917000531806:web:6922c0fe593882921329cf",
    measurementId: "G-29GJ09DXWT",
    databaseURL: "https://jounzarian-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Select DOM elements
const newsForm = document.getElementById('news-form');
const newsTitle = document.getElementById('news-title');
const newsContent = document.getElementById('news-content');
const newsList = document.getElementById('news-list');

// Function to display news
function displayNewsItem(newsItem) {
    console.log("News Item from Firebase:", newsItem);
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('news-item');
    newsDiv.innerHTML = `
        <img src="https://via.placeholder.com/120" alt="${newsItem.title}">
        <div>
            <h2>${newsItem.title}</h2>
            <p>${newsItem.content}</p>
        </div>
    `;
    newsList.appendChild(newsDiv);
}

// Submit news form
newsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = newsTitle.value.trim();
    const content = newsContent.value.trim();

    if (title && content) {
        const newsItem = { title, content };

        // Save to Firebase
        const newsRef = ref(database, 'news/');
        push(newsRef, newsItem).then(() => {
            console.log("News saved successfully!");
        }).catch((error) => {
            console.error("Error saving news:", error);
        });

        // Reset form
        newsForm.reset();
    }
});

// Load news on page load
document.addEventListener('DOMContentLoaded', () => {
    const newsRef = ref(database, 'news/');
    newsList.innerHTML = ""; // جلوگیری از نمایش تکراری

    onChildAdded(newsRef, (snapshot) => {
        const newsItem = snapshot.val();
        displayNewsItem(newsItem);
    });
});
