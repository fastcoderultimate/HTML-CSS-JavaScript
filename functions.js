const qs = (selector) => document.querySelector(selector);

const getLocal = (key) => localStorage.getItem(key);
const getLocalNum = (key) => {
  if (localStorage.getItem(key)) {
    return Number(localStorage.getItem(key));
  } else {
    return 0;
  }
};
const setLocal = (key, value) => localStorage.setItem(key, value);
const handleKey = (e, keyEvent) => {
  keyboard.querySelectorAll(".row").forEach((row) => {
    row.querySelectorAll("span").forEach((button) => {
      if (button.getAttribute("code") === e.code) {
        keyEvent === "keydown" && button.classList.add("active");
        keyEvent === "keyup" && button.classList.remove("active");
      }
    });
  });
};
const setParagraphs = () => {
  const externals = JSON.parse(getLocal("paragraphs"));
  if (externals) {
    allParagraphs = externals;
  } else {
    allParagraphs = defaultParagraphs;
    setLocal("paragraphs", JSON.stringify(allParagraphs));
    currentId = allParagraphs[0].id;
    setLocal("currentId", currentId);
  }
  const items = allParagraphs
    .map((item, index) => {
      const class_name = item.id == currentId ? "active" : "";
      return `<div class="item ${class_name}">
                <h4 class="dfsb">
                    <span class="title" onClick="handleClick(${index})">${item.title}</span>
                    <div class="btns dfc">
                        <i class="trash fa-solid fa-trash-can" onClick="deleteParagraph(${item.id})"></i>
                        <i class="toggle fa-solid fa-plus" onClick="toggleParagraph(${index})"></i>
                    </div>
                </h4>
                <p onClick="handleClick(${index})">${item.paragraph}</p>
              </div>`;
    })
    .join("");
  paragraphList.innerHTML = items;
  paragraphItems = paragraphList.querySelectorAll(".item");
};
const handleClick = (index) => {
  resetValues();
  paragraphItems[index].classList.add("active");
  paragraphItems.forEach((item) => {
    if (item !== paragraphItems[index] && item.classList.contains("active"))
      item.classList.remove("active");
  });
  setText(allParagraphs[index].paragraph);
  setLocal("currentId", allParagraphs[index].id);
  currentId = allParagraphs[index].id;
  hideBox();
};
const toggleParagraph = (index) => {
  const item = paragraphItems[index];
  const toggleBtn = item.querySelector(".toggle");
  item.classList.toggle("show");
  toggleBtn.classList.contains("fa-plus")
    ? toggleBtn.classList.replace("fa-plus", "fa-minus")
    : toggleBtn.classList.replace("fa-minus", "fa-plus");

  paragraphItems.forEach((itm) => {
    if (itm.classList.contains("show") && itm !== item) {
      itm.classList.remove("show");
      itm.querySelector(".toggle").classList.replace("fa-minus", "fa-plus");
    }
  });
};
const deleteParagraph = (deleteId) => {
  allParagraphs = allParagraphs.filter((item) => item.id != deleteId);
  localStorage.setItem("paragraphs", JSON.stringify(allParagraphs));
  setParagraphs();
  if (currentId == deleteId) {
    if (allParagraphs[0]) {
      currentId = allParagraphs[0].id;
      paragraphItems[0].classList.add("active");
    } else {
      currentId = "";
    }
    localStorage.setItem("currentId", currentId);
    resetValues();
    currentId ? setText(allParagraphs[0].paragraph) : setText("");
  }
};
const setText = (textContent) => {
  text = textContent;
  const length = text?.length;
  let spans = ``;
  if (length > 0) {
    playBtn.disabled = false;
    // Let's insert every letter in seperate span tag for separate detector design
    let class_name;
    for (var i = 0; i < length; i++) {
      class_name = i < activeIndex ? "typed" : "";
      spans += `<span class="${class_name}">${text.charAt(i)}</span>`;
    }
    paragraph.innerHTML = spans;
    allSpans = qs(".typingBox p").querySelectorAll("span");
    allSpans[activeIndex].className = "active";
    paragraph.style.setProperty("--fromLeft", `${fromLeft}px`);
  } else {
    playBtn.disabled = true;
    paragraph.innerHTML = "";
  }
};
const startTiming = () => {
  timer = setInterval(() => {
    seconds++;
    setLocal("seconds", seconds);
    duration.textContent = durationText(seconds);
  }, 1000);
};
const start = () => {
  playIcon.classList.replace("fa-circle-play", "fa-circle-pause");
  input.disabled = false;
  input.focus();
  body.addEventListener("click", () => input.focus());
  typingBox.classList.add("active");
  paragraphsBtn.disabled = true;
  startTiming();
};
const pause = () => {
  playIcon.classList.replace("fa-circle-pause", "fa-circle-play");
  input.disabled = true;
  typingBox.classList.remove("active");
  paragraphsBtn.disabled = false;
  clearInterval(timer);
};
const startPause = () => {
  if (playBtn.disabled === false) {
    playIcon.classList.contains("fa-circle-play") ? start() : pause();
  }
};
const durationText = (seconds) => {
  const ss = seconds % 60;
  const m = (seconds - ss) / 60;
  const mm = Math.trunc(m % 60);
  const hh = Math.trunc(m / 60);

  const secondsText = ss <= 9 ? `0${ss}` : `${ss}`;
  const minutesText = mm <= 9 ? `0${mm}` : `${mm}`;
  const hoursText = hh <= 9 ? `0${hh}` : `${hh}`;

  return `${hoursText} : ${minutesText} : ${secondsText}`;
};
const resetValues = () => {
  activeIndex = 0;
  setLocal("activeIndex", 0);
  fromLeft = 0;
  setLocal("fromLeft", 0);
  seconds = 0;
  setLocal("seconds", 0);
  typedCharsQty = 0;
  setLocal("typedCharsQty", 0);
  errorsQty = 0;
  setLocal("errorsQty", 0);
  input.disabled = true;
  typingBox.classList.contains("active") &&
    typingBox.classList.remove("active");
  paragraphsBtn.disabled = false;
  duration.textContent = durationText(0);
  typedChars.textContent = 0;
  errors.textContent = 0;
  playIcon.classList.contains("fa-circle-pause") &&
    playIcon.classList.replace("fa-circle-pause", "fa-circle-play");
  clearInterval(timer);
  setText(text);
};
const hideBox = () => {
  overlay.classList.remove("show");
  paragraphBox.classList.contains("show") &&
    paragraphBox.classList.remove("show");
  resultBox.classList.contains("show") && resultBox.classList.remove("show");
};
const showInputBox = () => {
  inputBox.classList.add("show");
  showInputBtn.classList.add("hide");
};
const showBox = (selector) => {
  overlay.classList.add("show");
  selector.classList.add("show");
  console.log("add");
};
const hideInputBox = () => {
  inputBox.classList.remove("show");
  showInputBtn.classList.remove("hide");
};
const addParagraph = () => {
  const titleValue = titleInput.value;
  const paragraphValue = textInput.value;
  if (titleValue.length !== 0 && paragraphValue.length !== 0) {
    const id = new Date().getTime().toString(); //Unique id
    allParagraphs.push({ id, title: titleValue, paragraph: paragraphValue });
    localStorage.setItem("paragraphs", JSON.stringify(allParagraphs));
    setParagraphs();
  }
  titleInput.value = "";
  textInput.value = "";
};
