// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8sqRoCqN9Xx-XGhtKSrjFukT8uPI7Bl8",
    authDomain: "jounzarian.firebaseapp.com",
    projectId: "jounzarian",
    storageBucket: "jounzarian.firebaseapp.com",
    messagingSenderId: "917000531806",
    appId: "1:917000531806:web:6922c0fe593882921329cf",
    measurementId: "G-29GJ09DXWT"
    databaseURL: "https://jounzarian-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Manage news form submission
document.getElementById('news-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    const newsItem = { title, content };

    // Save news item to Firebase
    const newsRef = ref(database, 'news/');
    push(newsRef, newsItem);

    // Display new news item
    displayNewsItem(newsItem);

    // Reset form
    document.getElementById('news-form').reset();
});

// Display stored news items on page load
document.addEventListener('DOMContentLoaded', () => {
    const newsRef = ref(database, 'news/');
    onChildAdded(newsRef, (snapshot) => {
        const newsItem = snapshot.val();
        displayNewsItem(newsItem);
    });
});

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
    document.getElementById('news-list').appendChild(newsDiv);
}
