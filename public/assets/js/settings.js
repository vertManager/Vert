var proxySelect = document.getElementById("proxy-select");
var transSelect = document.getElementById("trans-select");
var sl = document.getElementById("sl");
var gc = document.getElementById("gc");
var blooket = document.getElementById("blooket");
var gimkit = document.getElementById("gimkit");
var tab = 0;
var ptab = document.getElementById("ptab");
var ttab = document.getElementById("ttab");
var etab = document.getElementById("etab");
var themeselect = document.getElementById("theme-select");
var bginput = document.getElementById("bginput");
var bgset = document.getElementById("bgset");
var engineSelect = document.getElementById("engine-select");
var particlesSelect = document.getElementById("p-select");
var cloak = localStorage.getItem("cloak");
if (!cloak == "sl" || !cloak == "gc") {
    localStorage.setItem("cloak", "gc");
    cloak = "gc";
    document.title = "Home";
} else if (cloak == "sl") {
    document.title = "Home | Schoology";
    document.getElementById("favicon").href = "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico";
} else if (cloak == "gc") {
    document.title = "Home";
    document.getElementById("https://lh5.googleusercontent.com/5hLYmh0QhidGyUgqZaWlIndtUDk5Cxs-wBEHdABAfLouLKXv3_WX7N0Z630VCmKIEqYa6y75mjR-5EwWsNTg14_l6gsFYHJXyMXwMVGc8M3u5Ht6").href = "https://lh5.googleusercontent.com/5hLYmh0QhidGyUgqZaWlIndtUDk5Cxs-wBEHdABAfLouLKXv3_WX7N0Z630VCmKIEqYa6y75mjR-5EwWsNTg14_l6gsFYHJXyMXwMVGc8M3u5Ht6";
}

if (proxySelect) {
  proxySelect.value = localStorage.getItem("proxy") || "uv";
  proxySelect.addEventListener("change", function () {
    localStorage.setItem("proxy", proxySelect.value);
  });
}

if (localStorage.getItem("transport") == null) {
  localStorage.setItem("transport", "epoxy");
}
if (transSelect) {
  transSelect.value = localStorage.getItem("transport") || "epoxy";
  transSelect.addEventListener("change", function () {
    localStorage.setItem("transport", transSelect.value);
  });
}

if (sl) {
  sl.addEventListener("click", function () {
    localStorage.setItem("cloak", "sl")
    location.reload();
  });
}

if (gc) {
  gc.addEventListener("click", function () {
    localStorage.setItem("cloak", "gc")
    location.reload();
  });
}

if (blooket) {
  blooket.addEventListener("click", async function () {
    try {
      const response = await fetch('/assets/cheats/blooket.txt');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy cheats");
    }
  });
}

if (gimkit) {
  gimkit.addEventListener("click", async function () {
    try {
      const response = await fetch('/assets/cheats/gimkit.txt');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy cheats");
    }
  });
}

if (themeselect) {
  themeselect.value = localStorage.getItem("theme") || "default";
  themeselect.addEventListener("change", function () {
    localStorage.setItem("theme", themeselect.value);
    location.reload();
  });
}

if (bginput && bgset) {
  bginput.value = localStorage.getItem("custombg") || "";
  bgset.addEventListener("click", function () {
    localStorage.setItem("custombg", bginput.value);
    location.reload();
  });
}



if (engineSelect) {
  engineSelect.value = localStorage.getItem("engine") || "google";
  engineSelect.addEventListener("change", function () {
    localStorage.setItem("engine", engineSelect.value);
  });
}

if (particlesSelect) {
  particlesSelect.value = localStorage.getItem("particles") || "true";
  particlesSelect.addEventListener("change", function () {
    localStorage.setItem("particles", particlesSelect.value);
    location.reload();
  });
}
