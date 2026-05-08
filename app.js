import { FeedView } from './Feedview.js';
import { Houseview } from './Houseview.js';
import { Mensajes } from './Mensajes.js';
import { Chat } from './Chat.js';
import { ProfileView } from './Profileview.js';
import { WelcomeView } from './WelcomeView.js'; // nueva vista
import { initNavigation } from './navigate.js';

const app = document.getElementById("app");

window.addEventListener("load", () => {
  setTimeout(() => {
    startApp();
    
    const splash = document.getElementById("splash-screen");

    if (!splash) return;

    splash.style.opacity = "0";

    setTimeout(() => {
      splash.style.display = "none";

      // 👇 decidir qué abrir después del splash


      

    }, 1000);

  }, 1500);
});

      function startApp() {
  const userId = localStorage.getItem("user_id");

  if (userId) {
    navigate("feed");
  } else {
    navigate("welcome");
  }
}

export function navigate(view, params = {}) {

  const nav = document.getElementById("nav");

  if (nav) {
    nav.style.display = (view === "chat" || view === "welcome")
      ? "none"
      : "block";
  }

  if (view === "mensajes") Mensajes(app);
  if (view === "feed") FeedView(app);
  if (view === "house") Houseview(app);
  if (view === "profile") ProfileView(app);
  if (view === "chat") Chat(app, params);
  if (view === "welcome") WelcomeView(app);
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
});