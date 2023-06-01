const navList = document.querySelectorAll(".navigation ul li");
const indicator = document.querySelector(".indicator");
const itemWidth = navList[1].offsetWidth;

let prevIndex = 0;
navList.forEach((item, index) => {
  item.addEventListener("click", () => {
    let delay = -1;
    let diff; //The difference between previous and clicked index //
    if (prevIndex < index) {
      for (var i = prevIndex; i < index; i++) {
        delay++;
        setClass(i + 1, i, delay);
      }
      diff = index - prevIndex;
    }

    if (prevIndex > index) {
      for (var i = prevIndex; i > index; i--) {
        delay++;
        setClass(i - 1, i, delay);
      }
      diff = prevIndex - index;
    }

    indicator.setAttribute(
      "style",
      `--fromLeft: ${index * itemWidth}px; --diff: ${diff}`
    );
    prevIndex = index;
  });
});

const setClass = (currentIdx, prevIdx, delay) => {
  setTimeout(() => {
    navList[prevIdx].classList.remove("active");
    navList[currentIdx].classList.add("active");
  }, delay * 150);
};
