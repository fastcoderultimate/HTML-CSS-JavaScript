const boardContainer = document.querySelector(".board_container");

const size = boardContainer.getAttribute("size");
const boardSpacious = boardContainer.getAttribute("boardSpacious");

boardContainer.setAttribute(
  "style",
  `--board_size: ${size}; --board_spacious: ${boardSpacious}`
);

// Let's make a function to create element and add class easily
const createChildElement = (elementTag, className) => {
  const element = document.createElement(elementTag);
  element.classList.add(className);

  return element;
};

const board = createChildElement("div", "board");
boardContainer.appendChild(board);

const leftDiv = createChildElement("div", "left");
const rightDiv = createChildElement("div", "right");

// let's append same elements into left and right div
[leftDiv, rightDiv].forEach((item) => {
  board.appendChild(item);

  const topLayer = createChildElement("div", "top_layer");
  const leftlayer = createChildElement("div", "left_layer");

  item.appendChild(topLayer);
  item.appendChild(leftlayer);

  // for left and right div, add 4 rows
  for (var i = 0; i <= 3; i++) {
    const row = createChildElement("div", "row");
    row.setAttribute("style", `--i: ${i}`);
    item.appendChild(row);

    // for each rows, add 8 divs
    for (var j = 1; j <= 8; j++) {
      const rowChild = document.createElement("div");
      row.appendChild(rowChild);
    }
  }
});
