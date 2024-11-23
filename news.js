function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}


const JSONlink = "https://api.jsonbin.io/v3/b/6740a756acd3cb34a8ace6b3/latest"; //! Put this in a secretfile
const MasterKey = "$2a$10$Nw5w99yUhPd2NbbboBHYx.QwVJbr4z4F4c1JKbcabMaD/oOofya3q"; //! Put this in a secretfile


let req = new XMLHttpRequest();
let response

const pageName = "news"

const requestButton = document.getElementById("request-button");

const username = document.getElementById("username-h1");
const comment = document.getElementById("comment-p");
const timestampTxt = document.getElementById("timestamp");
const profilePicture = document.getElementById("profile-image");

const submitForm = document.getElementById("submit-button");
const usernameForm = document.getElementById("name-input-field")
const contentForm = document.getElementById("commment-input-field")
const commentInfo = document.getElementById("comment-info")


req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
            console.log("Response:", req.responseText);
            response = JSON.parse(req.responseText);
            requestButton.click();
        } else {
            console.error("Error:", req.status, req.statusText);
        }
    }
};

req.onerror = () => {
    console.error("Network error occurred");
};

req.open("GET", JSONlink, true);
req.setRequestHeader("X-Master-Key", MasterKey); // Replace with actual key
req.send();

submitForm.addEventListener("click", () => {
    if (!contentForm.value == "") {
        if (!usernameForm.value == "") {
            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    if (req.status === 200) {
                        console.log("Response:", req.responseText);
                        response = JSON.parse(req.responseText);
                        requestButton.click();
                    } else {
                        console.error("Error:", req.status, req.statusText);
                        commentInfo.innerHTML = "Error:", req.status, req.statusText;
                    }
                }

            };
            commentInfo.innerHTML = "";
            let info = "good"
            req.open("PUT", "https://api.jsonbin.io/v3/b/6740a756acd3cb34a8ace6b3", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("X-Master-Key", "$2a$10$Nw5w99yUhPd2NbbboBHYx.QwVJbr4z4F4c1JKbcabMaD/oOofya3q");
            req.send(`
    {"${pageName}": {
        "author": "${usernameForm.value}",
        "timestamp": "${GetTime(timestamp)}",
        "comment": "${contentForm.value}"
}}`);
        } else {
            usernameForm.value = "Anonym User"
            submitForm.click()
        }
    } else {
        commentInfo.innerHTML = "Comment field should not be empty";
    }

});

const timestamp = Math.floor(new Date().getTime() / 1000.0)
console.warn(timestamp)

requestButton.addEventListener("click", () => {
    response = response["record"]["news"]
    console.log(response);
    username.innerHTML = response["author"];
    console.log(response["author"])
    comment.innerHTML = response["comment"];
    timestampTxt.innerHTML = GetTime(timestamp)
    //profilePicture.src = response[""];
    console.log(GetTime(timestamp));



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
    var formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
}