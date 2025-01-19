// BLOGS PAGE
let row = null;

function Submit() {
    let dataEntered = retrieveData();
    if (dataEntered === false) {
        document.getElementById("msg").innerHTML = "Please enter all data!";
    } else {
        if (row === null) {
            insert(dataEntered);
            document.getElementById("msg").innerHTML = "Data Inserted!";
        } else {
            update(dataEntered);
            document.getElementById("msg").innerHTML = "Data Updated!";
        }
    }
    document.getElementById("form").reset();
}

function retrieveData() {
    let blog = document.getElementById("blog").value;
    let message = document.getElementById("message").value;
    let imageFile = document.getElementById("image").files[0];

    if (blog === "" || message === "" || !imageFile) {
        return false;
    } else {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function() {
                resolve([blog, message, reader.result]);
            };
            reader.onerror = function() {
                reject("Error reading file");
            };
            reader.readAsDataURL(imageFile);
        });
    }
}

function insert(dataEnteredPromise) {
    dataEnteredPromise.then(dataEntered => {
        let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
        existingData.push(dataEntered);
        localStorage.setItem("blogData", JSON.stringify(existingData));
        window.location.href = "main.html";
    }).catch(error => {
        console.error(error);
    });
}

function loadData() {
    let dataContainer = document.getElementById("dataContainer");
    if (!dataContainer) return;

    dataContainer.innerHTML = "";

    let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
    existingData.forEach((data, index) => {
        let entryDiv = document.createElement("div");
        entryDiv.className = "entry";

        let blogElement = document.createElement("p");
        blogElement.innerHTML = `<strong>Blog Post:</strong> ${data[0]}`;
        let messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>Travel Description:</strong> ${data[1]}`;
        let imageElement = document.createElement("img");
        imageElement.src = data[2];
        imageElement.alt = data[0];
        imageElement.style.maxWidth = '100%';

        let actionsElement = document.createElement("p");
        actionsElement.innerHTML = `
            <button onclick="edit(${index})">Edit</button>
            <button onclick="remove(${index})">Delete</button>
        `;

        entryDiv.appendChild(blogElement);
        entryDiv.appendChild(messageElement);
        entryDiv.appendChild(imageElement);
        entryDiv.appendChild(actionsElement);

        dataContainer.appendChild(entryDiv);
    });
}

function edit(index) {
    let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
    row = index;
    window.location.href = "blogs.html";
    document.getElementById("blog").value = existingData[index][0];
    document.getElementById("message").value = existingData[index][1];
}

function update(dataEnteredPromise) {
    dataEnteredPromise.then(dataEntered => {
        let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
        existingData[row] = dataEntered; 
        localStorage.setItem("blogData", JSON.stringify(existingData));
        window.location.href = "main.html";
        row = null;
    }).catch(error => {
        console.error(error);
    });
}

function remove(index) {
    let ans = confirm("Are you sure you want to delete this record?");
    if (ans) {
        let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
        existingData.splice(index, 1); 
        localStorage.setItem("blogData", JSON.stringify(existingData));
        loadData();
    }
}

document.addEventListener('DOMContentLoaded', loadData);


// ABOUT ME PAGE
let row1 = null;

function Submit1() {
    let dataEntered1 = retrieveData1();
    let readData1 = readingDataFromLocalStorage1(dataEntered1);
    if (dataEntered1 == false) {
        msgs.innerHTML = "Please Enter Data!";
    } else {
        if (row1 == null) {
            insert1(readData1);
            msgs.innerHTML = "Data Inserted!";
        } else {
            update1();
            msgs.innerHTML = "Data Updated!";
        }
    }
}

function Reset() {
    document.getElementById("form").reset();
}

function retrieveData1() {
    let cname = document.getElementById("cname").value;
    let course = document.getElementById("course").value;
    let instructor = document.getElementById("instructor").value;
    let term = document.getElementById("term").value;

    let array = [cname, course, instructor, term];
    if (array.includes("")) {
        return false;
    } else {
        return array;
    }
}

function readingDataFromLocalStorage1(dataEntered1) {
    let cn = localStorage.setItem("Course Name", dataEntered1[0]);
    let cc = localStorage.setItem("Course Code", dataEntered1[1]);
    let is = localStorage.setItem("Instructor", dataEntered1[2]);
    let t = localStorage.setItem("Term", dataEntered1[3]);

    let cn1 = localStorage.getItem("Course Name", cn);
    let cc1 = localStorage.getItem("Course Code", cc);
    let is1 = localStorage.getItem("Instructor", is);
    let t1 = localStorage.getItem("Term", t);

    let array = [cn1, cc1, is1, t1];
    return array;
}

function insert1(readData1) {
    let row1 = table.insertRow();
    row1.insertCell(0).innerHTML = readData1[0];
    row1.insertCell(1).innerHTML = readData1[1];
    row1.insertCell(2).innerHTML = readData1[2];
    row1.insertCell(3).innerHTML = readData1[3];
    row1.insertCell(4).innerHTML = `<button onclick="edit1(this)">Edit</button> 
                                   <button onclick="remove1(this)">Delete</button>`;
}

function edit1(td) {
    row1 = td.parentElement.parentElement;
    document.getElementById("cname").value = row1.cells[0].innerHTML;
    document.getElementById("course").value = row1.cells[1].innerHTML;
    document.getElementById("instructor").value = row1.cells[2].innerHTML;
    document.getElementById("term").value = row1.cells[3].innerHTML;
}

function update1() {
    row1.cells[0].innerHTML = document.getElementById("cname").value;
    row1.cells[1].innerHTML = document.getElementById("course").value;
    row1.cells[2].innerHTML = document.getElementById("instructor").value;
    row1.cells[3].innerHTML = document.getElementById("term").value;
    row1 = null;
}

function remove1(td) {
    let ans1 = confirm("Are you sure you want to delete this record?");
    if (ans1 == true) {
        let row2 = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row2.rowIndex);
    }
}


// CONTACT ME PAGE
let row2 = null;

function Submit2() {
    let dataEntered2 = retrieveData2();
    if (dataEntered2 === false) {
        document.getElementById("msges").innerHTML = "Please enter all data!";
    } else {
        if (row2 === null) {
            insert2(dataEntered2);
            document.getElementById("msges").innerHTML = "Data Inserted!";
        } else {
            update2s(dataEntered);
            document.getElementById("msges").innerHTML = "Data Updated!";
        }
    }
    document.getElementById("form").reset();
}

function retrieveData2() {
    let name1 = document.getElementById("name1").value;
    let subject = document.getElementById("subject").value;
    let message1 = document.getElementById("message1").value;

    if (name1 === "" || subject === "" || message1 === "") {
        return false;
    } else {
        return [name1, subject, message1];
    }
}

function insert2(dataEntered2) {
    let existingData2 = JSON.parse(localStorage.getItem("contactData")) || [];
    existingData2.push(dataEntered2);
    localStorage.setItem("contactData", JSON.stringify(existingData2));
    window.location.href = "inbox.html";
}

function loadData2() {
    let dataContainer2 = document.getElementById("dataContainer2");
    if (!dataContainer2) return; 

    dataContainer2.innerHTML = ""; 

    let existingData2 = JSON.parse(localStorage.getItem("contactData")) || [];
    existingData2.forEach((data, index) => {
        let entryDiv2 = document.createElement("div");
        entryDiv2.className = "entry";

        let name1Element = document.createElement("p");
        name1Element.innerHTML = `<strong>Name:</strong> ${data[0]}`;
        let subjectElement = document.createElement("p");
        subjectElement.innerHTML = `<strong>Subject:</strong> ${data[1]}`;
        let message1Element = document.createElement("p");
        message1Element.innerHTML = `<strong>Message:</strong> ${data[2]}`;

        let actions1Element = document.createElement("p");
        actions1Element.innerHTML = `
            <button onclick="edit2(${index})">Edit</button>
            <button onclick="remove2(${index})">Delete</button>
        `;

        entryDiv2.appendChild(name1Element);
        entryDiv2.appendChild(subjectElement);
        entryDiv2.appendChild(message1Element);
        entryDiv2.appendChild(actions1Element);

        dataContainer2.appendChild(entryDiv2);
    });
}

function edit2(index) {
    let existingData2 = JSON.parse(localStorage.getItem("contactData")) || [];
    row2 = index;
    window.location.href = "contact.html";
    document.getElementById("name1").value = existingData2[index][0];
    document.getElementById("subject").value = existingData2[index][1];
    document.getElementById("message1").value = existingData2[index][2];
}

function update2(dataEntered2) {
    let existingData2 = JSON.parse(localStorage.getItem("contactData")) || [];
    existingData2[row2] = dataEntered2; 
    localStorage.setItem("contactData", JSON.stringify(existingData2));
    window.location.href = "inbox.html";
    row2 = null;
}

function remove2(index) {
    let ans2 = confirm("Are you sure you want to delete this record?");
    if (ans2) {
        let existingData2 = JSON.parse(localStorage.getItem("contactData")) || [];
        existingData2.splice(index, 1); 
        localStorage.setItem("contactData", JSON.stringify(existingData2));
        loadData2();
    }
}

document.addEventListener('DOMContentLoaded', loadData2);

// FARE CALCULATION
function calculate() {
    const destination = parseFloat(document.getElementById('buskm').value);
    const busFare = destination * 1.23;
    document.getElementById('result').innerHTML = `Result: $${busFare.toFixed(2)}`;
}

function calculate1() {
    const destination1 = parseFloat(document.getElementById('trainkm').value);
    const promo = parseFloat(document.getElementById('promo').value);
    const trainFare = destination1 * 1.23;
    const promotion = trainFare * (promo / 100);
    const totalAmount = trainFare - promotion;
    document.getElementById('result1').innerHTML = `Result: $${totalAmount.toFixed(2)}`;
}

// REGISTRATION 
function register() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;

    if (password !== confirmpassword) {
        alert('Passwords do not match.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('Username already exists.');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
}

// LOGIN
function login() {
    const username = document.getElementById('username1').value;
    const password = document.getElementById('password1').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'main.html'; 
    } else {
        alert('Invalid username or password.');
    }
}

function checkLogin() {
    if (!localStorage.getItem('loggedInUser')) {
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = 'login.html'; 
    }
        }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html'; 
}

function updateNavLinks() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('login-link').style.display = loggedInUser ? 'none' : 'inline';
    document.getElementById('register-link').style.display = loggedInUser ? 'none' : 'inline';
    document.getElementById('logout-button').style.display = loggedInUser ? 'inline' : 'none';
}

window.onload = function() {
    checkLogin();
    updateNavLinks();

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.onclick = function() {
            logout();
        };
    }
}