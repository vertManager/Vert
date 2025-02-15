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

fetch('/assets/json/apps.json')
    .then(response => response.json())
    .then(apps => {
        const appsContainer = document.querySelector('.apps');

        apps.forEach(app => {
            const appElement = document.createElement('div');
            appElement.className = 'app';

            appElement.innerHTML = `
        <img src="${app.image}" alt="${app.name}">
        <h3>${app.name}</h3>
      `;

            appElement.addEventListener('click', async () => {
                var ute = app.url;
                if (localStorage.getItem("proxy") == "uv") {
                    ute = __uv$config.prefix + __uv$config.encodeUrl(ute);
                    localStorage.setItem('url', ute);
                    window.location.href = '/browser';
                }
                else if (localStorage.getItem("proxy") == "sj") {
                    sjEncode();
                }
                else if (localStorage.getItem("proxy") == "rammerhead") {
                    rhEncode();
                }


                async function rhEncode() {
                    ute = await RammerheadEncode(ute);
                    window.location.href = "/" + ute;
                }
                async function sjEncode() {
                    ute = "/scram/service/" + encodeURIComponent(ute);
                    localStorage.setItem("url", ute);
                    window.location.href = "/browser";
                }
            });

            appsContainer.appendChild(appElement);
        });
    });

