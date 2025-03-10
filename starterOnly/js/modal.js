// Function to check if an element is valid, to avoid the script to crash if an error occured.
const isNil = (element) => {
  return element === undefined || element === null;
};

// Regexp to check if an email is valid. Src : mailchimp documentation
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
  try {
    const width = window.innerWidth;
    // I check if the view is mobile
    if (width <= 500) {
      // If the modal is open on mobile view, I scroll top 0 to see the header
      // Logicaly, the button of menu is unaccessible even if we close modal
      // It's related to bground element.
      // For the moment, I consider this behaviour as expected
      // If needed, apply pointer-events: none; to bground on mobile
      // But you will have to manage the display of menu with open modal
      window.scrollTo({
        top: 0,
      });
      // Disable scrolling when modal is open on mobile
      document.body.style.position = "fixed";
    }
  } catch (err) {
    console.error(err);
  }
};

// DOM Elements
const modalBg = getModalBackground();
const modalBtn = getOpenModalButton();
const closeBtn = getCloseModalButton();
const openMenuBtn = getOpenMenuButton();
const menu = getMenu();

const formData = document.querySelectorAll(".formData");
const modalForm = document.querySelector("#form");
const modalBody = document.querySelector(".modal-body");

// Function to close the modal form
const closeModal = () => {
  const successContainer = document.querySelector(".thanks-container");
  if (!isNil(successContainer)) successContainer.remove();

  if (!isNil(modalBg)) modalBg.style.display = "none";
  if (!isNil(modalForm)) modalForm.style.display = "block";
  if (!isNil(modalBody)) modalBody.style["justify-content"] = "unset";

  // No need to check for mobile : if we close the modal
  // Apply relative position to active the scroll on body
  document.body.style.position = "relative";
};

// Function to open the menu
const openMenu = (menuComponent) => {
  if (!isNil(menuComponent)) menuComponent.style.display = "flex";
};

// Function to close the menu
const closeMenu = (menuComponent) => {
  if (!isNil(menuComponent)) menuComponent.style.display = "none";
};

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
    closeModal();
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

const createSpanErrorMessage = (message) => {
  const span = document.createElement("span");
  span.className = "input-error-messages";
  span.innerHTML = message;
  return span;
};

const createElementSuccess = () => {
  if (!isNil(modalBody)) modalBody.style["justify-content"] = "center";

  const div = document.createElement("div");
  div.className = "thanks-container";
  div.innerHTML = `
  <p class="thanks-message">Merci pour votre inscription !</p>
  <button class="btn-submit thanks-close-btn" onclick="closeModal();">Fermer</button>
  `;
  return div;
};

const checkInputs = (inputs) => {
  let errors = false;

  // Get the previous error messages
  const previousMessagesError = document.querySelectorAll(
    ".input-error-messages"
  );
  // Remove the previous error messages
  previousMessagesError.forEach((element) => element.remove());

  // Create a span to display error messages

  if (
    inputs.first.value.match(/^[A-Za-z]+$/) === false ||
    inputs.first.value.length >= 2 === false
  ) {
    inputs.first.node.after(
      createSpanErrorMessage(
        "Ce champs doit contenir au minimun 2 caractères alphabétiques."
      )
    );
    errors = true;
  }
  if (
    inputs.last.value.match(/^[A-Za-z]+$/) === false ||
    inputs.last.value.length >= 2 === false
  ) {
    inputs.last.node.after(
      createSpanErrorMessage(
        "Ce champs doit contenir au minimun 2 caractères alphabétiques."
      )
    );
    errors = true;
  }
  if (
    emailRegex.test(inputs.email.value) === false ||
    inputs.email.value.length > 0 === false
  ) {
    inputs.email.node.after(
      createSpanErrorMessage(
        "Ce champs doit contenir une adresse email valide."
      )
    );
    errors = true;
  }
  if (inputs.birthdate.value.length > 0 === false) {
    inputs.birthdate.node.after(
      createSpanErrorMessage("Ce champs doit contenir une date valide.")
    );
    errors = true;
  }

  if (
    inputs.quantity.value >= 0 === false ||
    inputs.quantity.value <= 99 === false
  ) {
    inputs.quantity.node.after(
      createSpanErrorMessage(
        "Ce champs doit contenir un nombre compris entre 0 et 99."
      )
    );
    errors = true;
  }

  if (inputs.location.value.length === 0) {
    inputs.location.node.after(
      createSpanErrorMessage(
        "Sélectionnez la ville où participer au tournoi GameOn."
      )
    );
    errors = true;
  }

  if (inputs.cgu.value === false) {
    inputs.cgu.node.after(
      createSpanErrorMessage(
        "Vous devez accepter les conditions d'utilisation."
      )
    );
    errors = true;
  }

  return errors;
};

document.addEventListener(
  "invalid",
  // Change the callback for invalid form to disable the native process
  (() => (e) => {
    // Prevent the browser from showing default error bubble
    e.preventDefault();
  })(),
  true
);

const validate = () => {
  // This is the object with all informations of form.
  // Next step, fill it.
  const inputs = {
    first: {
      value: "",
      node: null,
    },
    last: {
      value: "",
      node: null,
    },
    email: {
      value: "",
      node: null,
    },
    birthdate: {
      value: "",
      node: null,
    },
    quantity: {
      value: 0,
      node: null,
    },
    location: {
      value: "",
      node: null,
    },
    cgu: {
      value: false,
      node: null,
    },
    eventReminder: {
      value: false,
      node: null,
    },
  };

  const checkboxContainer = document.querySelector(".checkbox-container");
  const locationContainer = document.querySelector(".location-container");

  inputs.cgu.node = checkboxContainer;
  inputs.location.node = locationContainer;

  // I loop on all the form data block
  formData.forEach((data) => {
    // I get the childNodes element inside the form data block
    const childNodes = data.childNodes;

    childNodes.forEach((node) => {
      // I am interessted only by INPUT elements to get informations and content
      if (node.nodeName === "INPUT") {
        switch (node.name) {
          case "first":
          case "last":
          case "email":
          case "birthdate":
            inputs[node.name].value = node.value; // It's text value here, so I just take value
            inputs[node.name].node = node;
            break;
          case "quantity":
            // For quantity, I automaticaly convert into integer
            // If the field is empty, I consider the value as 0
            const quantity = node.value;
            if (quantity === "") inputs.quantity.value = 0;
            else inputs.quantity.value = parseInt(quantity, 10);
            inputs.quantity.node = node;
          case "location":
            // I push the locations inside an array if the radio is checked
            if (node.checked) inputs.location.value = node.value;
            break;
          case "":
            // The node.name for the checkboxes is empty
            // (I could modify the HTML but let's take the challenge to take as it is for the exercise :) )
            // So, I look the id, it is different for cgu and eventReminder
            // The default value in inputs object is false, so I just change if it's checked

            if (node.id === "checkbox1" && node.checked)
              inputs.cgu.value = true;
            else if (node.id === "checkbox2" && node.checked)
              inputs.eventReminder.value = true;

            break;
          default:
            break;
        }
      }
    });
  });

  const errors = checkInputs(inputs);
  if (errors) {
    // If there is an error, I scroll to the top.
    const modalContent = document.querySelector(".content");
    modalContent.scrollTo({
      top: 0,
    });
  } else {
    modalForm.style.display = "none";
    modalForm.after(createElementSuccess());
  }
  return false;
};
