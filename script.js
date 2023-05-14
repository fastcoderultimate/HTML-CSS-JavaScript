const stairsContainer = document.querySelector(".stairs_container");

const size = Number(stairsContainer.getAttribute("size"));
const itemQty = Number(stairsContainer.getAttribute("itemQty"));

const itemSpacious = size / (itemQty + 1);

stairsContainer.setAttribute(
  "style",
  `--size: ${size}px; --item_spacious: ${itemSpacious}px`
);

const stairs = document.createElement("div");
stairs.classList.add("stairs");

// Create items
for (var i = 0; i < itemQty; i++) {
  const item = document.createElement("div");
  item.classList.add("item");

  item.setAttribute("style", `--i: ${i}`);

  const div1 = document.createElement("div");
  const div2 = document.createElement("div");

  item.appendChild(div1);
  item.appendChild(div2);

  stairs.appendChild(item);
}
stairsContainer.appendChild(stairs);
