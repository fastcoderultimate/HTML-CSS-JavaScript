const stairsContainer = document.querySelector(".stairs_container");

const size = Number(stairsContainer.getAttribute("size")); // Convert to Number //
const itemQty = Number(stairsContainer.getAttribute("itemQty"));

const stairsItemSize = size / itemQty;

stairsContainer.setAttribute(
  "style",
  `--stairs_size: ${size}px; --stair_item_size: ${stairsItemSize}px`
);

const stairs = document.createElement("div");
stairs.classList.add("stairs");

stairsContainer.appendChild(stairs);

// Create stairs item
for (var i = 1; i <= itemQty; i++) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.setAttribute("style", `--i: ${i}`);

  const childDiv = document.createElement("div");
  item.appendChild(childDiv);

  stairs.appendChild(item);
}
