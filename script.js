// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8sqRoCqN9Xx-XGhtKSrjFukT8uPI7Bl8",
    authDomain: "jounzarian.firebaseapp.com",
    databaseURL: "https://jounzarian-default-rtdb.firebaseio.com",
    projectId: "jounzarian",
    storageBucket: "jounzarian.appspot.com",
    messagingSenderId: "917000531806",
    appId: "1:917000531806:web:6922c0fe593882921329cf",
    measurementId: "G-29GJ09DXWT"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Function to display news item
function displayNewsItem(newsItem) {
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

// Handle form submission to store the news in Firebase
document.getElementById('news-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get values from the input fields
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    // Validate inputs
    if (title.trim() === "" || content.trim() === "") {
        alert("لطفاً عنوان و متن خبر را وارد کنید.");
        return;
    }

    // Create a news item object
    const newsItem = { title, content };

    // Push the new news item to Firebase
    const newsRef = firebase.database().ref('news/');
    newsRef.push(newsItem)
        .then(() => {
            console.log("✅ ذخیره‌سازی موفق بود");
            // Display the new news item on the page
            displayNewsItem(newsItem);
            // Clear the form
            document.getElementById('news-form').reset();
        })
        .catch((error) => {
            console.error("❌ خطا در ذخیره‌سازی:", error);
        });
});

// Load existing news from Firebase and display them on the page
document.addEventListener('DOMContentLoaded', function() {
    const newsRef = firebase.database().ref('news/');
    newsRef.on('child_added', function(snapshot) {
        const newsItem = snapshot.val();
        displayNewsItem(newsItem);
    });
});
