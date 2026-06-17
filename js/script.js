import axios from "axios";

const header = document.getElementById("header");
const hero = document.getElementById("hero");
const backToTop = document.getElementById("backToTop");

const trendingCard = document.getElementById("trendingCard");
const creatorCard = document.getElementById("creatorCard");
const categoryCard = document.getElementById("categoryCard");
const nftCard = document.getElementById("nftCard");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

const headerHeight = header.offsetHeight;

menuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");

  if (mobileMenu.classList.contains("hidden")) {
    menuIcon.src = "./assets/icons/List.svg";
  } else {
    menuIcon.src = "./assets/icons/close.svg";
  }
});

const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    const heroVisible = entry.isIntersecting;

    if (!heroVisible) {
      header.classList.add(
        "bg-secondary/50",
        "shadow-lg",
        "sticky",
        "top-0",
        "left-0",
        "w-full",
        "z-50",
      );
      header.classList.remove("bg-transparent");
      header.classList.add("sticky");

      backToTop.classList.remove("hidden");
    } else {
      header.classList.remove("bg-secondary", "shadow-lg");
      header.classList.add("bg-transparent");
      header.classList.remove("sticky");

      backToTop.classList.add("hidden");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  },
);

observer.observe(hero);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

async function renderAllCards() {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/mmhosseinzadeh9190/mft-final/refs/heads/main/assets/data/data.json",
    );

    const data = response.data;

    data.collections.forEach((collection, index) => {
      const creator = data.creators.find(
        (creator) => creator.id === collection.creator_id,
      );

      renderCollection(collection, creator, index);
    });

    data.creators.forEach((creator, index) => {
      renderCreator(creator, index);
    });

    data.categories.forEach((category) => {
      renderCategory(category);
    });

    data.nfts.forEach((nft, index) => {
      const creator = data.creators.find(
        (creator) => creator.id === nft.creator_id,
      );

      renderNfts(nft, creator, index);
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
}

const renderCollection = function (collection, creator, index) {
  let responsiveClass = "";

  if (index === 1) {
    responsiveClass = "hidden md:flex";
  }
  if (index === 2) {
    responsiveClass = "hidden xl:flex";
  }

  const html = `
    <div class="flex flex-col gap-4 w-full ${responsiveClass}">
      <div>
        <img
          src="${collection.images[0]}"
          alt="${collection.name}"
          class="h-80 w-80 rounded-2xl"
        />
      </div>
      <div class="flex gap-4">
        <img
          src="${collection.images[1]}"
          alt="${collection.name}"
          class="h-24 w-24 rounded-2xl"
        />
        <img
          src="${collection.images[2]}"
          alt="${collection.name}"
          class="h-24 w-24 rounded-2xl"
        />
        <span class="font-space bg-actions flex h-24 w-24 items-center justify-center rounded-3xl px-4 py-8 text-2xl font-bold">
          ${collection.total_items}+
        </span>
      </div>
      <div class="flex flex-col gap-2.5">
        <span class="text-2xl font-semibold">${collection.name}</span>
        <div class="flex items-center gap-3">
          <img
            src="${creator.image}"
            alt="${creator.name}"
            class="h-6 w-6"
          />
          <span class="text-base font-normal">${creator.name}</span>
        </div>
      </div>
    </div>`;
  trendingCard.innerHTML += html;
};

const renderCreator = function (creator, index) {
  let responsiveClass = "";

  if (index >= 5) {
    responsiveClass = "hidden xl:flex";
  }
  if (index >= 6) {
    responsiveClass = "hidden xl:flex";
  }
  if (index === 5) {
    responsiveClass = "hidden md:flex";
  }

  const html = `
    <div class="bg-secondary relative flex xl:flex-col  items-center gap-5 rounded-3xl p-5 ${responsiveClass}">
      <span
        class="bg-primary font-space text-caption absolute xl:top-4 xl:left-5 top-5 left-3.5 flex h-7 w-7 items-center justify-center rounded-full text-base font-normal"
      >${creator.id}</span>
      <img
        src="${creator.image}"
        alt="${creator.name}"
        class="flex xl:h-32 xl:w-32 w-14 h-14"
      />
      <div class="flex flex-col gap-1.5 text-center">
        <span class="text-2xl font-semibold">${creator.name}</span>
        <div class="flex gap-2.5">
          <span class="text-caption text-base font-normal"
          >Total Sales:</span>
          <span class="font-space text-base font-normal"
          >${creator.total_sales}</span>
        </div>
      </div>
    </div>`;
  creatorCard.innerHTML += html;
};

const renderCategory = function (category) {
  const html = `
    <div class="bg-secondary flex flex-col overflow-hidden rounded-3xl w-full">
      <div class="relative">
        <img
            src="${category.image}"
            alt="${category.name}"
            class="w-full object-cover"
        />
        <div
          class="bg-caption/30 absolute inset-0 backdrop-blur-sm"
        ></div>
        <div class="absolute inset-0 flex items-center justify-center">
            <img
                src="${category.icon}"
                alt="${category.name}"
                class="w-24"
            />
        </div>
      </div>
      <div class="bg-secondary w-full px-7 py-5 backdrop-blur-md">
          <span class="text-2xl font-semibold">${category.name}</span>
      </div>
    </div>`;
  categoryCard.innerHTML += html;
};

const renderNfts = function (nft, creator, index) {
  let responsiveClass = "";

  if (index === 2) {
    responsiveClass = "md:hidden xl:flex";
  }

  const html = `
    <div class="bg-secondary flex flex-col rounded-3xl ${responsiveClass}">
      <div>
        <img
          src="${nft.image}"
          alt="${nft.name}"
          class="w-full rounded-t-3xl"
        />
      </div>
      <div class="flex flex-col gap-6 px-6 py-8">
        <div class="flex flex-col gap-1.5">
          <span class="text-2xl font-semibold">${nft.name}</span>
          <div class="flex items-center gap-3">
            <img
              src="${creator.image}"
              alt="${creator.name}"
              class="h-6 w-6"
            />
            <span class="font-space font-normal">${creator.name}</span>
          </div>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col gap-2">
            <span class="font-space text-caption text-xs font-normal">Price</span>
            <span class="font-space text-base font-normal">${nft.price.amount} ${nft.price.currency}</span>
          </div>
          <div class="flex flex-col gap-2">
            <span class="font-space text-caption text-xs font-normal">
              Highest Bid
            </span>
            <span class="font-space text-base font-normal">${nft.highest_bid.amount} ${nft.highest_bid.currency}</span>
          </div>
        </div>
      </div>
    </div>`;
  nftCard.innerHTML += html;
};

renderAllCards();

let hour = 1;
let minute = 59;
let second = 59;

setInterval(function () {
  second--;

  if (second < 0) {
    second = 59;
    minute--;
  }

  if (minute < 0) {
    minute = 59;
    hour--;
  }

  if (hour < 0) {
    hour = 0;
    minute = 0;
    second = 0;
  }

  hours.textContent = String(hour).padStart(2, "0");
  minutes.textContent = String(minute).padStart(2, "0");
  seconds.textContent = String(second).padStart(2, "0");
}, 1000);
