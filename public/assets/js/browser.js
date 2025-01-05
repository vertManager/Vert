document.getElementById("frame").src = localStorage.getItem("url");

if (localStorage.getItem("load") == "quick") {
    document.getElementById("particles-js").remove();
    document.getElementById("wrapper").remove();
    document.getElementById("bga").remove();
}