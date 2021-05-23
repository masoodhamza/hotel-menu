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
const menuitemform = document.querySelector("#menuitemform");
const menuitems = document.querySelector("#menuitems");

menuitemform.addEventListener("submit", (e) => {
  e.preventDefault();

  uploadImage(menuitemform);

  $("#addItemModal").modal("hide");
  menuitemform.reset();
});

menuitems.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const storage = firebase.storage();
    const storageRef = storage.ref();

    const parent =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement;

    const id = parent.dataset.id;
    const img = parent.dataset.img;

    // Create a reference to the file to delete
    // const imgRef = storageRef.child(img);

    // Delete the file
    // storageRef
    //   .child(img)
    //   .delete()
    //   .then(() => {
    db.collection("menu")
      .doc(id)
      .delete()
      .then(() => console.log("item deleted"))
      .catch((err) => console.log(err));
    console.log("image deleted");
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }
});

const uploadImage = (form) => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const now = new Date();
  const image = form.img.files[0];
  const imageName =
    firebase.firestore.Timestamp.fromDate(now) + "-" + image.name;
  const metadata = {
    contentType: image.type,
  };

  let item = {
    title: form.title.value,
    desc: form.desc.value,
    price: form.price.value,
    category: form.category.value,
  };

  storageRef
    .child(imageName)
    .put(image, metadata)
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      item.img = url;
      console.log(item);
      db.collection("menu")
        .add(item)
        .then(() => {
          console.log("menu item has been added");
        })
        .catch((err) => console.log(err));

      console.log("image uploaded");
    })
    .catch((error) => console.log(error));

  return item;
};

//add new item in menu
const addItem = (id, item) => {
  menu.innerHTML += `
    <div class="col-md-6 item" data-id="${id}" data-img="${item.img}">
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${item.img}" alt="${item.title}" class="menuimg">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}<span class="float-right">Rs.
                                ${item.price}</span></h5>
                        <hr>
                        <p class="card-text">${item.desc}</p>
                        <p class="card-text">
                        <small class="text-muted">${item.category}</small>
                        <button class="btn btn-sm btn-danger float-right" id="deleteBtn">Delete</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `;
};

const removeItem = (id) => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    if (item.dataset.id === id) {
      item.remove();
    }
  });
};

db.collection("menu").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === "added") {
      addItem(doc.id, doc.data());
    } else if (change.type === "removed") {
      removeItem(doc.id);
    }
  });
});
