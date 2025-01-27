function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQxAm3LZjTREygOWuX1h5voag5rvfMjaU",
  authDomain: "pedroacostafan.firebaseapp.com",
  databaseURL:
    "https://pedroacostafan-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pedroacostafan",
  storageBucket: "pedroacostafan.firebasestorage.app",
  messagingSenderId: "636133728649",
  appId: "1:636133728649:web:1801fb8809015b7f2c0158",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

async function getdata() {
  onValue(ref(db, "news/"), (snapshot) => {
    const data = snapshot.val();
    const commentsContainer = document.getElementById("comments-container");
    RenderComments(data, commentsContainer);
  });
}

function RenderComments(data, commentsContainer) {
  const dynamicComments = Object.entries(data).map(([key, element], i) => ({
    username: element.author,
    timestamp: element.timestamp,
    comment: element.comment || `This is a sample comment for user ${i}.`,
    profileImage: `https://imgs.search.brave.com/UV-1RWFf-UhxdYFC9GLszWqPy6K2zDEdcVtOaAcXcrQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzExLzU0LzMz/LzM2MF9GXzgxMTU0/MzMzMF9LZk5ZdWtw/RFVRZG1YSUt6Y005/Z2tLOU12dHdPTzhC/ai5qcGc`,
  }));
  console.log(dynamicComments);

  // Render comments
  dynamicComments.forEach((comment, index) => {
    const commentHTML = `
        <div class="comment">
            <div>
                <img class="profile-image" id="profile-image-${index}"
                     src="${comment.profileImage}" alt="User ${index}">
            </div>
            <div class="comment-content">
                <div class="post-details">
                    <h4 id="username-h1-${index}">${comment.username}</h4>
                    <time id="timestamp-${index}">${comment.timestamp}</time>
                </div>
                <button id="request-button-${index}" style="display: none;">Request</button>
                <p id="comment-p-${index}">${comment.comment}</p>
            </div>
        </div>`;

    // Append the comment to the container
    commentsContainer.innerHTML += commentHTML;
  });
}

function uuidv4() {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function writeUserData(username, timestamp, comment) {
  const db = getDatabase();
  const random_uuid = uuidv4();
  set(ref(db, "news/" + random_uuid), {
    author: username,
    timestamp: timestamp,
    comment: comment,
  });
  getdata();
}

const pageName = "news";

const requestButton = document.getElementById("request-button");

const username = document.getElementById("username-h1");
const comment = document.getElementById("comment-p");
const timestampTxt = document.getElementById("timestamp");
const profilePicture = document.getElementById("profile-image");

const submitForm = document.getElementById("submit-button");
const usernameForm = document.getElementById("name-input-field");
const contentForm = document.getElementById("commment-input-field");
const commentInfo = document.getElementById("comment-info");

submitForm.addEventListener("click", () => {
  if (!contentForm.value == "") {
    if (!usernameForm.value == "") {
      commentInfo.innerHTML = "";
      writeUserData(usernameForm, GetTime(timestamp), contentForm);
    } else {
      usernameForm.value = "Anonym User";
      submitForm.click();
    }
  } else {
    commentInfo.innerHTML = "Section commentaire vide";
  }
});

const timestamp = Math.floor(new Date().getTime() / 1000.0);
console.warn(timestamp);

requestButton.addEventListener("click", () => {
  /* response = response["record"]["news"]
    console.log(response);
    username.innerHTML = response["author"];
    console.log(response["author"])
    comment.innerHTML = response["comment"];
    timestampTxt.innerHTML = response["timestamp"];
    //profilePicture.src = response[""];
    console.log(GetTime(timestamp)); */
  getdata();
});

function GetTime(timestamp) {
  let unix_timestamp = timestamp;

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  var date = new Date(unix_timestamp * 1000);

  // Hours part from the timestamp
  var hours = date.getHours();

  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  // Seconds part from the timestamp

  // Will display time in 10:30:23 format
  var formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}
