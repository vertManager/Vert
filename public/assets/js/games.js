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

fetch('/assets/json/games.json')
    .then(response => response.json())
    .then(games => {
        const appsContainer = document.querySelector('.games');

        games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.className = 'game';

            gameElement.innerHTML = `
        <img src="${game.image}" alt="${game.name}">
        <h3>${game.name}</h3>
      `;

            gameElement.addEventListener('click', async () => {
                if (game.name == "Fortnite") {
                    alert("To play Fortnite, you must set your proxy to Scramjet. Go to settings and make sure your proxy is Scramjet, then reload.");
                    open("/scram/service/" + encodeURIComponent("https://play.geforcenow.com/mall/#/deeplink?game-id=46bfab06-d864-465d-9e56-2d9e45cdee0a"), '_blank');
                    return;
                }
                if (game.name == "Bloons TD Battles 2") {
                    alert("To play BTDB2, you must set your proxy to Scramjet. Go to settings and make sure your proxy is Scramjet, then reload.");
                    open("/scram/service/" + encodeURIComponent("https://play.geforcenow.com/mall/#/deeplink?game-id=d3b8fd6f-cad3-4779-94c3-b4617714de0c"), '_blank');
                    return;
                }
                var ute = game.url;
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

            appsContainer.appendChild(gameElement);
        });
    });


