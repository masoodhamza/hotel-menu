const items = [
  {
    id: 1,
    title: "Chicken Biryani",
    category: "Lunch",
    price: 250,
    img: "chicken-biryani.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 2,
    title: "Sada Biryani",
    category: "Lunch",
    price: 150,
    img: "sada-biryani.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 3,
    title: "Chiken Biryani",
    category: "Lunch",
    price: 300,
    img: "karachi-chiken.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 4,
    title: "Chapal Kabab",
    category: "Dinner",
    price: 100,
    img: "chapal-kabab.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 5,
    title: "Tika BarBQ",
    category: "Dinner",
    price: 200,
    img: "tika-barbq.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 6,
    title: "Chicken Sajji",
    category: "Dinner",
    price: 800,
    img: "saji.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 7,
    title: "Halwa Puri",
    category: "Breakfast",
    price: 730,
    img: "halwa-puri.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 8,
    title: "Siri Paya",
    category: "Breakfast",
    price: 500,
    img: "Paya_Curry.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 9,
    title: "Mutton Nihari",
    category: "Breakfast",
    price: 500,
    img: "mutton-nihari.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
  {
    id: 10,
    title: "Milk Shake",
    category: "Shakes",
    price: 100,
    img: "milkshake.jpg",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad dolorum sed consequatur.",
  },
];

//card to display menues
const menu = document.querySelector(".menu");

//buttons
const all = document.querySelector(".all");
const breakfast = document.querySelector(".breakfast");
const lunch = document.querySelector(".lunch");
const shakes = document.querySelector(".shakes");
const dinner = document.querySelector(".dinner");

const loadPage = () => {
  items.forEach((item) => {
    generateHTML(item);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loadPage();
});

//eventer linster on all button
all.addEventListener("click", () => {
  menu.innerHTML = "";
  loadPage();
});

//eventer linster on breakfast button
breakfast.addEventListener("click", () => {
  menu.innerHTML = "";
  items.filter((item) => {
    if (item.category === "Breakfast") {
      return generateHTML(item);
    }
  });
});

//eventer linster on lunch button
lunch.addEventListener("click", () => {
  menu.innerHTML = "";
  items.filter((item) => {
    if (item.category === "Lunch") {
      return generateHTML(item);
    }
  });
});

//eventer linster on dinner button
dinner.addEventListener("click", () => {
  menu.innerHTML = "";
  items.filter((item) => {
    if (item.category === "Dinner") {
      return generateHTML(item);
    }
  });
});

//eventer linster on shakes button
shakes.addEventListener("click", () => {
  menu.innerHTML = "";
  items.filter((item) => {
    if (item.category === "Shakes") {
      return generateHTML(item);
    }
  });
});

const generateHTML = (item) => {
  console.log(item);
  menu.innerHTML += `
    <div class="col-md-6">
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
