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
const database = firebase.database();

// Get elements
const newsForm = document.getElementById('news-form');
const newsList = document.getElementById('news-list');

// Form submit handler
newsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('news-title').value;
  const content = document.getElementById('news-content').value;

  // Push data to Firebase
  const newPostRef = database.ref('news').push();
  newPostRef.set({
    title: title,
    content: content,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  })
  .then(() => {
    newsForm.reset();
  })
  .catch((error) => {
    console.error('Error saving data:', error);
  });
});

// Fetch and display data
database.ref('news').orderByChild('timestamp').on('value', (snapshot) => {
  newsList.innerHTML = ''; // Clear previous content
  
  snapshot.forEach((childSnapshot) => {
    const newsItem = childSnapshot.val();
    const key = childSnapshot.key;
    
    // Create HTML elements
    const itemDiv = document.createElement('div');
    itemDiv.className = 'news-item';
    
    const contentDiv = document.createElement('div');
    
    const title = document.createElement('h2');
    title.textContent = newsItem.title;
    
    const content = document.createElement('p');
    content.textContent = newsItem.content;
    
    const readMore = document.createElement('button');
    readMore.className = 'read-more';
    readMore.textContent = 'مطالعه بیشتر';
    
    // Add click handler for read more
    readMore.addEventListener('click', () => {
      // Implement your read more functionality
      console.log('Read more clicked for:', key);
    });
    
    // Assemble elements
    contentDiv.appendChild(title);
    contentDiv.appendChild(content);
    contentDiv.appendChild(readMore);
    
    itemDiv.appendChild(contentDiv);
    newsList.appendChild(itemDiv);
  });
}, (error) => {
  console.error('Data retrieval failed:', error);
});
