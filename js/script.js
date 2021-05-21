// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBZSmkniySXnZlg1NBxB_xCROBf_QNaox4",
  authDomain: "hotel-menu-757dd.firebaseapp.com",
  projectId: "hotel-menu-757dd",
  storageBucket: "hotel-menu-757dd.appspot.com",
  messagingSenderId: "1031882448774",
  appId: "1:1031882448774:web:57c49ef65e950b78009607",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const db = firebase.firestore();

//card to display menues
const menu = document.querySelector(".menu");

//buttons
const category = document.querySelectorAll(".category");

const loadPage = (category) => {
  db.collection("menu")
    .get()
    .then((snapshot) => {
      snapshot.forEach((item) => {
        if (category === "all") {
          generateHTML(item.id, item.data());
        } else {
          if (category === item.data().category) {
            generateHTML(item.id, item.data());
          }
        }
      });
    })
    .catch((err) => console.log(err));
};

document.addEventListener("DOMContentLoaded", () => {
  loadPage("all");
});

category.forEach((cat) => {
  cat.addEventListener("click", (e) => {
    menu.innerHTML = "";
    const category = e.target.dataset.category;

    if (category === "breakfast") {
      loadPage("Breakfast");
    } else if (category === "lunch") {
      loadPage("Lunch");
    } else if (category === "dinner") {
      loadPage("Dinner");
    } else if (category === "shakes") {
      loadPage("Shakes");
    } else {
      loadPage("all");
    }
  });
});

const generateHTML = (id, item) => {
  menu.innerHTML += `
    <div class="col-md-6" data-id="${id}">
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="images/${item.img}" alt="${item.title}" width="190px" height="210px">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}<span class="float-right">Rs.
                                ${item.price}</span></h5>
                        <hr>
                        <p class="card-text">${item.desc}</p>
                        <p class="card-text"><small class="text-muted">${item.category}</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `;
};
