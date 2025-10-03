
//Hamburger
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const overlay = document.querySelector(".overlay");
const menuLinks = document.querySelectorAll(".off-screen-menu a");

// toggle when hamburger is clicked
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Safe forEach fallback
if (menuLinks.forEach) {
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamMenu.classList.remove("active");
      offScreenMenu.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
} else {
  // old browsers: use a simple for loop
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", () => {
      hamMenu.classList.remove("active");
      offScreenMenu.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
}

// close menu when overlay is clicked
overlay.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
  overlay.classList.remove("active");
});

//Search Bar
const searchToggle = document.getElementById("searchToggle");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const searchBtn = document.getElementById("searchBtn");
const voiceBtn = document.getElementById("voiceBtn");
const suggestionsList = document.getElementById("suggestionsList");

let isOpen = false;
let history = ["OpenAI ChatGPT", "JavaScript tutorial", "Latest tech news"];
let suggestions = ["OpenAI", "ChatGPT", "HTML CSS JS", "Voice search demo", "Google style search bar"];

// Toggle search open/close
searchToggle.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    searchContainer.classList.add("active");
    searchToggle.innerHTML = '<i class="fas fa-times"></i>'; // change to close
    searchInput.focus();
  } else {
    searchContainer.classList.remove("active");
    searchToggle.innerHTML = '<i class="fas fa-search"></i>'; // back to search
    suggestionsList.style.display = "none";
    searchInput.value = "";
  }
});




// Show/hide clear button
searchInput.addEventListener("input", () => {
  clearBtn.style.display = searchInput.value ? "inline" : "none";
  showSuggestions(searchInput.value);
});

// Clear input
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
  suggestionsList.style.display = "none";
  searchInput.focus();
});

// Show suggestions
function showSuggestions(query) {
  suggestionsList.innerHTML = "";

  if (!query) {
    if (history.length > 0) {
      suggestionsList.style.display = "block";
      suggestionsList.innerHTML = `<li class="history">Recent Searches</li>`;
      history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", () => selectSuggestion(item));
        suggestionsList.appendChild(li);
      });
    } else {
      suggestionsList.style.display = "none";
    }
    return;
  }

  const filtered = suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
  if (filtered.length > 0) {
    suggestionsList.style.display = "block";
    filtered.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      li.addEventListener("click", () => selectSuggestion(item));
      suggestionsList.appendChild(li);
    });
  } else {
    suggestionsList.style.display = "none";
  }
}

// Select suggestion
function selectSuggestion(value) {
  searchInput.value = value;
  suggestionsList.style.display = "none";
}

// Search button
searchBtn.addEventListener("click", () => {
  if (searchInput.value) {
    history.unshift(searchInput.value);
    alert("Searching for: " + searchInput.value);
    suggestionsList.style.display = "none";
  }
});

// Voice recognition
if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    clearBtn.style.display = "inline";
    showSuggestions(transcript);
  };
}

//Dark Mode Toggle
const themeToggle =
document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () =>{
  document.body.classList.toggle("dark-mode");

  // Change button icon
  if(document.body.classList.contains("dark-mode"))
  {
    themeToggle.textContent="Light";
  } else {
    themeToggle.textContent="Dark";
  }
});