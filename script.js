const menuTrack = document.getElementById("menuTrack");
const items = document.querySelectorAll(".menu-item");

let currentIndex = 0;
let locked = false;

function updateMenu() {
  const itemHeight = 70;
  menuTrack.style.transform = `translateY(${-currentIndex * itemHeight}px)`;

  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
}

function fadeThenGo(url) {
  const fade = document.getElementById("fade");

  if (fade) {
    fade.classList.add("active");
  }

  setTimeout(() => {
    window.location.href = url;
  }, 500);
}

function goToPage(page) {
  if (page === "world") {
    fadeThenGo("WebBuild182/index.html");
  }

  if (page === "contact") {
    fadeThenGo("contact.html");
  }
}

window.addEventListener("wheel", (e) => {
  if (locked) return;

  locked = true;

  if (e.deltaY > 0) {
    currentIndex = Math.min(currentIndex + 1, items.length - 1);
  } else {
    currentIndex = Math.max(currentIndex - 1, 0);
  }

  updateMenu();

  setTimeout(() => {
    locked = false;
  }, 450);
});

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (index === currentIndex) {
      goToPage(item.dataset.page);
    } else {
      currentIndex = index;
      updateMenu();
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    currentIndex = Math.min(currentIndex + 1, items.length - 1);
    updateMenu();
  }

  if (e.key === "ArrowUp") {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateMenu();
  }

  if (e.key === "Enter") {
    goToPage(items[currentIndex].dataset.page);
  }
});

updateMenu();

let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {

    const touchEndY = e.changedTouches[0].clientY;
    const difference = touchStartY - touchEndY;

    // Ignore tiny swipes
    if (Math.abs(difference) < 40) return;

    if (difference > 0) {
        // Swipe up
        currentIndex = Math.min(currentIndex + 1, items.length - 1);
    } else {
        // Swipe down
        currentIndex = Math.max(currentIndex - 1, 0);
    }

    updateMenu();

});