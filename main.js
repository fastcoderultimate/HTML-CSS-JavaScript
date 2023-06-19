const body = qs("body"),
  root = qs(":root"),
  overlay = qs(".overlay"),
  keyboard = qs(".keyboard"),
  typingBox = qs(".typingBox"),
  paragraph = qs(".typingBox p"),
  paragraphsBtn = qs(".paragraphsBtn"),
  paragraphBox = qs(".paragraphBox"),
  playBtn = qs(".playBtn"),
  playIcon = qs(".playBtn i"),
  inputBox = qs(".inputBox"),
  showInputBtn = qs(".showInputBtn"),
  paragraphList = qs(".paragraphList"),
  titleInput = qs(".titleInput"),
  textInput = qs(".textInput"),
  resultBox = qs(".resultBox"),
  duration = qs(".duration span"),
  typedChars = qs(".typedChars span"),
  errors = qs(".errors span"),
  input = qs(".typingText");

let paragraphItems,
  currentId = getLocal("currentId"),
  activeIndex = getLocalNum("activeIndex"),
  fromLeft = getLocalNum("fromLeft"),
  errorsQty = getLocalNum("errorsQty"),
  seconds = getLocalNum("seconds"),
  typedCharsQty = getLocalNum("typedCharsQty"),
  timer,
  allSpans;

duration.textContent = durationText(seconds);
typedChars.textContent = typedCharsQty;
errors.textContent = errorsQty;

const defaultParagraphs = [
  {
    id: "1",
    title: "Paragraph 01",
    paragraph:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: "2",
    title: "Paragraph 02",
    paragraph:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
  {
    id: "3",
    title: "Paragraph 03",
    paragraph: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  },
  {
    id: "4",
    title: "Paragraph 04",
    paragraph: `"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"`,
  },
];

body.addEventListener("keydown", (e) => handleKey(e, "keydown"));
body.addEventListener("keyup", (e) => {
  handleKey(e, "keyup");
  e.code === "F8" && startPause();
  e.code === "F9" && resetValues();
});

let allParagraphs;
setParagraphs();

let text =
  currentId > 0
    ? allParagraphs.filter((item) => item.id == currentId)[0].paragraph
    : "";
setText(text);

input.addEventListener("input", (e) => {
  let currentSpan = allSpans[activeIndex];
  if (e.target.value === currentSpan.textContent) {
    typedCharsQty++;
    setLocal("typedCharsQty", typedCharsQty);
    typedChars.textContent = typedCharsQty;
    currentSpan.className = "typed";

    fromLeft += currentSpan.offsetWidth;
    setLocal("fromLeft", fromLeft);
    paragraph.style.setProperty("--fromLeft", `${fromLeft}px`);

    activeIndex++;
    setLocal("activeIndex", activeIndex);

    if (activeIndex < allSpans.length)
      allSpans[activeIndex].className = "active";

    if (activeIndex === allSpans.length) {
      qs(".totalDuration span").textContent = durationText(seconds);
      qs(".totalTyped span").textContent = typedCharsQty;
      qs(".typedSpeed span").textContent = `${Math.round(
        typedCharsQty / seconds
      )} letters/s`;
      qs(".totalErrors span").textContent = `${errorsQty}`;
      showBox(resultBox);
      resetValues();
      setText(text);
    }
  } else {
    errorsQty++;
    setLocal("errorsQty", errorsQty);
    errors.textContent = errorsQty;
    currentSpan.classList.add("error");
  }
  input.value = "";
});

paragraphsBtn.addEventListener("click", () => showBox(paragraphBox));
