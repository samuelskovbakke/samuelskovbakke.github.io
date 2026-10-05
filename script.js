// Manual light/dark toggle. Sits on top of the automatic
// prefers-color-scheme behaviour defined in style.css: as long as no
// choice is saved, the site follows the visitor's system setting.
// Once they click the toggle, that choice is remembered in localStorage
// and overrides the system setting on every later visit.

(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return systemPrefersDark() ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
  }

  applyTheme(currentTheme());

  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
})();
