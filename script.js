// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8sqRoCqN9Xx-XGhtKSrjFukT8uPI7Bl8",
  authDomain: "jounzarian.firebaseapp.com",
  projectId: "jounzarian",
  storageBucket: "jounzarian.firebasestorage.app",
  messagingSenderId: "917000531806",
  appId: "1:917000531806:web:6922c0fe593882921329cf",
  measurementId: "G-29GJ09DXWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// نمایش/پنهان کردن صفحات
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// مدیریت فرم اخبار
document.getElementById('news-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    const newsItem = { title, content };

    // ذخیره خبر در Firebase
    const newsRef = ref(database, 'news/');
    push(newsRef, newsItem);

    // نمایش خبر جدید
    displayNewsItem(newsItem);

    // پاک کردن فرم
    document.getElementById('news-form').reset();
});

// نمایش اخبار ذخیره شده هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    const newsRef = ref(database, 'news/');
    onChildAdded(newsRef, (snapshot) => {
        const newsItem = snapshot.val();
        displayNewsItem(newsItem);
    });
});

function displayNewsItem(newsItem) {
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.content}</p><hr>`;
    document.getElementById('news-list').appendChild(newsDiv);
}
