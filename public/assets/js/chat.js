var chatframe = document.getElementById("chatframe");
var url;
url = __uv$config.prefix + __uv$config.encodeUrl("https://e.widgetbot.io/channels/1297323622024609874/1307106191821897831");
localStorage.setItem("url", url);

chatframe.setAttribute("src", "/browser.html");