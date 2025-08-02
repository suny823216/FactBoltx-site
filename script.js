document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.getElementById("arrow");
  const subscribeBtn = document.getElementById("subscribe-btn");

  // Remove auto click — arrow stays just for decoration/cue
  arrow.addEventListener("click", () => {
    // Optional: make it pulse or bounce again if clicked
    arrow.style.animation = "bounce 0.5s";
  });

  subscribeBtn.addEventListener("click", () => {
    const box = document.querySelector(".channel-box");
    box.style.transition = "transform 1.2s ease";
    box.style.transform = "scale(1.3)";

   setTimeout(() => {
  window.location.href = "home.html";
}, 200); // faster load
subscribeBtn.addEventListener("click", () => {
  window.location.href = "home.html";
});

  });
});
const tagline = document.getElementById("tagline");
const text = "Daily Mind-Blowing Facts 🔥";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    tagline.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 60);
  }
}

typeWriter();
