// function editNav() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

// Function to check if an element is valid, to avoid the script to crash if an error occured.
const isNil = (element) => {
  return element === undefined || element === null;
};

// Functions to get the elements of DOM
// Advantage of this process, we can check quickly if an error occured.
const getModalBackground = () => {
  try {
    const modalBg = document.querySelector(".bground");
    return modalBg;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getOpenModalButton = () => {
  try {
    const modalBtn = document.querySelectorAll(".modal-btn");
    return modalBtn;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getCloseModalButton = () => {
  try {
    const closeButton = document.querySelector(".close");
    return closeButton;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getOpenMenuButton = () => {
  try {
    const openMenuButton = document.querySelector("#menu-button");
    return openMenuButton;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getMenu = () => {
  try {
    const menu = document.querySelector("#menu");
    return menu;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Function to launch the modal form
const launchModal = (modalBg) => {
  if (!isNil(modalBg)) modalBg.style.display = "block";
};

// Function to close the modal form
const closeModal = (modalBg) => {
  if (!isNil(modalBg)) modalBg.style.display = "none";
};

// Function to open the menu
const openMenu = (menuComponent) => {
  if (!isNil(menuComponent)) menuComponent.style.display = "flex";
};

// Function to close the menu
const closeMenu = (menuComponent) => {
  if (!isNil(menuComponent)) menuComponent.style.display = "none";
};

// DOM Elements
const modalBg = getModalBackground();
const modalBtn = getOpenModalButton();
const closeBtn = getCloseModalButton();
const openMenuBtn = getOpenMenuButton();
const menu = getMenu();
// const formData = document.querySelectorAll(".formData");

// Add listener to all the modal buttons.
// Attached the function to lauchn the modal with the click event.
if (!isNil(modalBtn)) {
  modalBtn.forEach((btn) => {
    if (!isNil(btn))
      btn.addEventListener("click", () => {
        launchModal(modalBg);
      });
  });
} else {
  console.error("No modals button detected.");
}

// Add listener to close button on modal.
// Attached the function to close the modal with the click event.
if (!isNil(closeBtn)) {
  closeBtn.addEventListener("click", () => {
    closeModal(modalBg);
  });
} else {
  console.error("No close button detected.");
}

// Add listener to open / close menu.
// Attached the function to open and close the menu with the click event.
if (!isNil(openMenuBtn)) {
  openMenuBtn.addEventListener("click", () => {
    try {
      const style = getComputedStyle(menu); // Get styles of menu
      // If menu is hidden, display it, else hide it
      if (style.display === "none") {
        menu.style.display = "flex";
      } else if (style.display === "flex") {
        menu.style.display = "none";
      }
    } catch (err) {
      console.error(err);
    }
  });
} else {
  console.error("No menu button detected.");
}

// Add an event listener to check if window is resized.
// This function is used to display the menu in case of resize from mobile size to desktop
// Because, with the function to open the menu, it wrotes inline style and it has the priority on style
// So the display: none; can stay on the menu and hide it on desktop.
// This function prevent that.
window.addEventListener("resize", () => {
  try {
    const width = window.innerWidth;
    if (width > 768) {
      menu.style.display = "flex";
    }
    // Here, it hide automaticaly on resize because, the menu appear automaticaly because of inline style
    if (width <= 768) {
      menu.style.display = "none";
    }
  } catch (err) {
    console.error(err);
  }
});
