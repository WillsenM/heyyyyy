onload = () => {
  document.body.classList.remove("container");
};

window.addEventListener("DOMContentLoaded", () => {
  const gift = document.getElementById("gift");
  const textElement = document.getElementById("text");
  const messageBox = document.querySelector(".message");
  const bgMusic = document.getElementById("bgMusic"); // ✅ FIX penting

  const message1 = "Have a great day, Cadd!";
  const message2 = `"Semangat nugasnya ya!"`;
  // const message3 = "Happy Valentine’s Day, Brenda!";

  function typeWriterFade(text, speed, fontSize, callback) {
    const fragment = document.createDocumentFragment();

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      span.style.transition = "opacity 0.6s ease";
      if (fontSize) span.style.fontSize = fontSize;
      fragment.appendChild(span);

      setTimeout(() => {
        span.style.opacity = "1";
      }, index * speed);
    });

    textElement.appendChild(fragment);

    if (callback) {
      const totalDuration = text.length * speed + 300;
      setTimeout(callback, totalDuration);
    }
  }

  function fadeOutText(duration, callback) {
    textElement.style.transition = `opacity ${duration}ms ease`;
    textElement.style.opacity = "0";
    setTimeout(() => {
      textElement.innerHTML = "";
      textElement.style.opacity = "1";
      if (callback) callback();
    }, duration);
  }

  // ✅ SINGLE CLICK HANDLER (yang benar)
  gift.addEventListener("click", () => {
    document.body.classList.add("play");
    gift.style.display = "none";

    // ✅ play music
    bgMusic.play().catch(() => {});

    setTimeout(() => {
      messageBox.style.opacity = "1";
      messageBox.style.transform = "translate(-50%, 0)";
      textElement.innerHTML = "";

      // teks pertama
      typeWriterFade(message1, 60, "14px", () => {
        textElement.innerHTML += "<br style='line-height:1.2'>";

        // teks kedua
        typeWriterFade(message2, 90, "16px", () => {
          setTimeout(() => {
            fadeOutText(900, () => {
              // teks terakhir
              typeWriterFade(message3, 80, "18px");
            });
          }, 1200);
        });
      });
    }, 1000);
  });
});
