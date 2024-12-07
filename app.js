// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3upVUWWkbVAc_cZlYGAp6aZeeIt3XG9M",
    authDomain: "my-first-web-app-project-230e5.firebaseapp.com",
    databaseURL: "https://my-first-web-app-project-230e5-default-rtdb.firebaseio.com",
    projectId: "my-first-web-app-project-230e5",
    storageBucket: "my-first-web-app-project-230e5.firebasestorage.app",
    messagingSenderId: "183438165410",
    appId: "1:183438165410:web:ce73eaa56069742c7b5efb",
    measurementId: "G-KS2M8J1Y6S"
};

// Import Firebase libraries
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the Firestore collection
const colRef = collection(db, 'posts');

// Fetch data from Firestore
const fetchData = async () => {
    try {
        const snapshot = await getDocs(colRef);
        const postsList = snapshot.docs.map(doc => doc.data());
        displayData(postsList);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};



// Function to add new post to Firestore
const addPostToFirestore = async (event) => {
    event.preventDefault();  // Prevent the default form submission

    // Get the values from the form fields
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const readTime = document.getElementById('readTime').value;

    // Add a new document to the "posts" collection in Firestore
    try {
       
        await addDoc(colRef, {
            title: title,
            description: description,
            author: author,
            readTime: readTime
        });
        console.log("Post added successfully!");

        window.location.href = "index.html";
      
        // fetchData(); // Re-fetch data to show the new post
    } catch (error) {
        console.error("Error adding post: ", error);
    }

    // Clear the form after submission
    document.getElementById('addToolForm').reset();
};

// Add event listener for form submission
document.getElementById('addToolForm').addEventListener('submit', addPostToFirestore);

// Fetch data on page load

fetchData();


