const firebaseConfig = {
    apiKey: "AIzaSyCDLunNOxuRoJQzGmP2Wid2mHQYz4sG5XI",
    authDomain: "my-first-project-7ad41.firebaseapp.com",
    projectId: "my-first-project-7ad41",
    storageBucket: "my-first-project-7ad41.firebasestorage.app",
    messagingSenderId: "976716784305",
    appId: "1:976716784305:web:83d5543dc0dc68d4443890"
  };

// Import Firebase libraries
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the Firestore collection
const colRef = collection(db, 'posts');

// Fetch and display posts
const fetchData = async () => {
    try {
        const snapshot = await getDocs(colRef);
        const postsList = snapshot.docs.map(doc => doc.data());
        displayData(postsList);  // Ensure you're calling displayData, not displayPosts
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to display posts dynamically
const displayData = (postsList) => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear the content first
    postsList.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <span class="author">By ${post.author}</span>
            <p class="read-time">Read time: ${post.readTime}</p>
        `;
        contentDiv.appendChild(postElement);
    });
};

// Call the function to fetch and display posts when the page loads
fetchData();
