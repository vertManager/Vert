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

async function init() {
    try {
        const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
        const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
        if (localStorage.getItem("transport") == "epoxy") {
            if (await connection.getTransport() !== "/epoxy/index.mjs") {
                await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
                console.log("Using websocket transport. Wisp URL is: " + wispUrl);
            }
        }
        else {
            if (await connection.getTransport() !== "/libcurl/index.mjs") {
                await connection.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
                console.log("Using websocket transport. Wisp URL is: " + wispUrl);
            }
        }

    } catch (err) {
        console.error("An error occurred while setting up baremux:", err);
    }
    document.getElementById("frame").src = localStorage.getItem("url");
}

init().then(() => {
});

var reload = document.getElementById("reload");
reload.addEventListener("click", function () {
    document.getElementById("frame").contentWindow.location.reload();
});

var oin = document.getElementById("oin");
oin.addEventListener("click", function () {
    window.open(document.getElementById("frame").src);
});

var home = document.getElementById("ghome");
home.addEventListener("click", function () {
    window.location.href = "/";

});

var py = document.getElementById("py");
py.addEventListener("click", function () {
    if (localStorage.getItem("proxy") == "uv") {

        localStorage.setItem("currenturl", (__uv$config.decodeUrl(document.getElementById("frame").src.replace(window.location.origin, "").substring(12))));
        localStorage.setItem("url", "/scram/service/" + encodeURIComponent(localStorage.getItem("currenturl")));
    }
    else if (localStorage.getItem("proxy") == "sj") {
        localStorage.setItem("currenturl", decodeURIComponent(document.getElementById("frame").src).replace(window.location.origin, "").substring(15));
        localStorage.setItem("url", __uv$config.prefix + __uv$config.encodeUrl(localStorage.getItem("currenturl")));
    }
    localStorage.setItem("proxy", localStorage.getItem("proxy") == "uv" ? "sj" : "uv");
    alert("Proxy set to " + localStorage.getItem("proxy"));
    window.location.reload();


});
