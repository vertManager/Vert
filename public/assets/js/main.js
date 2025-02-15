var form = document.getElementById("form");
var input = document.getElementById("input");
var discord = document.getElementById("discord");
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
    try {
        const scramjet = new ScramjetController({
            prefix: "/scram/service/",
            files: {
                wasm: "/scram/scramjet.wasm.js",
                worker: "/scram/scramjet.worker.js",
                client: "/scram/scramjet.client.js",
                shared: "/scram/scramjet.shared.js",
                sync: "/scram/scramjet.sync.js"
            },
            flags: {
                syncxhr: true
            }
        });
        window.sj = scramjet;
        scramjet.init("/sw.js");


    } catch (error) {
        console.error("Error setting up uv & sj:", error);
    }
    if (!localStorage.getItem("proxy")) {
        localStorage.setItem("proxy", "uv");
    }

    try {
        await navigator.serviceWorker.register("/sw.js");
        console.log("Registering service worker...");
    } catch (err) {
        throw new Error(err)
    }
}
init();

if (form && input) {
    form.addEventListener("submit", async (event) => {
        function isUrl(val = "") {
            if (
                /^http(s?):\/\//.test(val) ||
                (val.includes(".") && val.substr(0, 1) !== " ")
            ) {
                return true;
            }
            return false;
        }

        event.preventDefault();

        if (!localStorage.getItem("proxy")) {
            localStorage.setItem("proxy", "uv");
        }

        try {
            await navigator.serviceWorker.register("/sw.js");
            console.log("Registering service worker...");
        } catch (err) {
            throw new Error(err)
        }

        var url = input.value.trim();

        if (!isUrl(url)) {
            if (localStorage.getItem("engine") == "google") {
                url = "https://www.google.com/search?q=" + url;
            }
            else {
                url = "https://duckduckgo.com/?t=h_&q=" + url;
            }

        } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
            url = `https://${url}`;
        }

        if (localStorage.getItem("proxy") == "uv") {
            uvEncode();
        }
        else if (localStorage.getItem("proxy") == "sj") {
            sjEncode();
        }
        else if (localStorage.getItem("proxy") == "rammerhead") {
            rhEncode();
        }


        async function rhEncode() {
            url = await RammerheadEncode(url);
            window.location.href = "/" + url;
        }
        async function uvEncode() {
            url = __uv$config.prefix + __uv$config.encodeUrl(url);
            localStorage.setItem("url", url);
            window.location.href = "/browser";
        }
        async function sjEncode() {
            url = "/scram/service/" + encodeURIComponent(url);
            localStorage.setItem("url", url);
            window.location.href = "/browser";
        }
    });

}

if (discord) {
    discord.addEventListener("click", async (event) => {
        await navigator.clipboard.writeText("https://www.guilded.gg/i/EN54yvXp");
        alert('💪🔥 Invite link copied to clipboard!');
    });
}

