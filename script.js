const images = document.querySelectorAll(".images .img");
const magnifiedImgBox = document.querySelector(".magnifiedImgBox");
const magnifiedImg = magnifiedImgBox.querySelector("img");

const magnifyScale = 4;
magnifiedImgBox.setAttribute("style", `--magnifyScale: ${magnifyScale}`);

const handleMagnify = () => {
  const screenWidth = window.screen.width;

  images.forEach((item) => {
    const img = item.querySelector("img");
    const magnifierBox = item.querySelector(".magnifierBox");

    const magnifierBoxWidthHalf = magnifierBox.offsetWidth / 2;
    const magnifierBoxHeightHalf = magnifierBox.offsetHeight / 2;

    item.addEventListener("mouseenter", () => {
      magnifiedImgBox.classList.add("active");
      magnifiedImg.src = img.src;
    });
    item.addEventListener("mouseleave", () => {
      magnifiedImgBox.classList.remove("active");
      magnifiedImg.src = "";
    });
    item.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // The distance between img and window top
      const imgFromTop = item.offsetTop - window.scrollY;
      // The distance between img top and mouse pointer
      const pointerTop = y - imgFromTop;
      // The distance between img left and mouse pointer
      const pointerLeft = x - item.offsetLeft;

      magnifierBox.style.left = `${pointerLeft - magnifierBoxWidthHalf}px`;
      magnifierBox.style.top = `${pointerTop - magnifierBoxHeightHalf}px`;

      magnifiedImg.style.left = `-${
        (pointerLeft - magnifierBoxWidthHalf) * magnifyScale
      }px`;
      magnifiedImg.style.top = `-${
        (pointerTop - magnifierBoxHeightHalf) * magnifyScale
      }px`;

      // Set the position of magnifiedimgBox
      // The distance between window right and mouse pointer
      const pointerFromWindowRight = screenWidth - x;

      let fromLeft;
      if (x > pointerFromWindowRight) {
        fromLeft = `${
          x - (magnifiedImgBox.offsetWidth + magnifierBoxWidthHalf + 10)
        }px`;
      } else {
        fromLeft = `${x + magnifierBoxWidthHalf + 10}px`;
      }
      magnifiedImgBox.style.left = fromLeft;
      magnifiedImgBox.style.top = `${y}px`;
    });
  });
};
handleMagnify();

// To prevent the calculation problems on window resize, just call the function on window resize
window.addEventListener("resize", handleMagnify);
