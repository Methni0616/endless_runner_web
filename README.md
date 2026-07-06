
# Bunny Endless Runner

![Bunny Runner](assets/bunny1_stand.png)

**Bunny Endless Runner** is a mobile-friendly endless runner game built with **HTML, CSS, and JavaScript**.  
It features a cute bunny that can **run, jump, and avoid obstacles**, with **scoring** and **offline support** as a PWA (Progressive Web App).

---

## 🎮 Features

- Smooth **run animation** (walk1 ↔ walk2)
- **Jump animation** to avoid obstacles
- **Hurt animation** on collision
- **Obstacles:** Boxes and spikes
- **Scrolling background**
- **Score counter** increments over time
- **Mobile-friendly controls** (tap/click to jump)
- **PWA-ready:** installable on Android/iOS
- **Offline support** via Service Worker

---

## 🗂 Project Structure

```

endless-runner-web/
├── index.html         # Main HTML file
├── style.css          # CSS for layout, background, player
├── script.js          # Game logic and animations
├── manifest.json      # PWA manifest
├── sw.js              # Service Worker for caching
└── assets/            # All images and icons
├── bunny1_stand.png
├── bunny1_walk1.png
├── bunny1_walk2.png
├── bunny1_jump.png
├── bunny1_hurt.png
├── background.png
├── box.png
├── spike.png


````
## 🌐 Play Online

Try the game live here: [Play Bunny Endless Runner](https://endless-runner-web-uiqt.vercel.app/)  

Open the link on your **mobile browser** and tap **Add to Home Screen** to install it like a real app!


---

## 🚀 How to Run Locally

1. Clone this repository:

```bash
git clone https://github.com/Methni0616/endless_runner_web.git
````

2. Open the project folder.
3. Launch `index.html` in a browser.
4. On mobile: click the screen (or tap) to make the bunny jump.

> For best experience, use **Chrome on Android**.

---


## 🖼 Assets

All assets are included in the `assets/` folder:

* Bunny animations: `bunny1_stand`, `bunny1_walk1`, `bunny1_walk2`, `bunny1_jump`, `bunny1_hurt`
* Obstacles: `box`, `spike`
* Background: `background.png`
* PWA icons: `icon-192.png`, `icon-512.png`

---

## 📄 License

This project is **free to use** for personal and educational purposes.

---

## ✨ Credits

* Bunny and tileset from **Kenney.nl** free platformer asset pack
* PWA and Service Worker implementation by **Methni Manarandi**

```

Git practice