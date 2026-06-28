const screens = [...document.querySelectorAll("[data-screen]")];
const navButtons = [...document.querySelectorAll("[data-nav]")];
const dots = [...document.querySelectorAll("[data-step-dot]")];

const stepMap = {
  home: 0,
  matching: 1,
  result: 2,
  ride: 3,
  settlement: 4,
  local: 4,
};

let matchTimer;

function showScreen(name) {
  clearTimeout(matchTimer);
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === name || (name === "matching" && button.dataset.nav === "result") || (name === "ride" && button.dataset.nav === "result"));
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index <= stepMap[name]);
  });
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  const nav = event.target.closest("[data-nav]")?.dataset.nav;

  if (nav) showScreen(nav);

  if (action === "start-match") {
    showScreen("matching");
    matchTimer = setTimeout(() => showScreen("result"), 2100);
  }
  if (action === "back-home") showScreen("home");
  if (action === "accept") showScreen("ride");
  if (action === "settle") showScreen("settlement");
  if (action === "local") showScreen("local");
  if (action === "restart") showScreen("home");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
