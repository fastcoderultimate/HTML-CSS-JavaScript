const imgContainer = document.querySelector(".container");

const containerSize = imgContainer.getAttribute("size");
const imgSize = imgContainer.getAttribute("imgSize");
const centerSize = imgContainer.getAttribute("centerSize");
const raySize = imgContainer.getAttribute("raySize");

const images = [
  "images/01.jpg",
  "images/02.jpg",
  "images/03.jpg",
  "images/04.jpg",
  "images/05.jpg",
  "images/06.jpg",
  "images/07.jpg",
  "images/08.jpg",
];

// The gap as degree between the images
const initialRotation = 360 / images.length;
imgContainer.setAttribute(
  "style",
  `
    --container_size: ${containerSize}px;
    --imgSize: ${imgSize}px;
    --initial_rotation: ${initialRotation}deg; 
    --center_size: ${centerSize}px;
    --ray_size: ${raySize}px
  `
);

imgContainer.innerHTML = `
<div class="img_box">
        <div class="center">
          <div class="back"></div>
          <div class="top"></div>
          <div class="left"></div>
        </div>
        ${images
          .map(
            (img, index) =>
              `<div class="item" style="--i: ${index}">
              <img src=${img} alt="image" />
              <div class="ray">
                <div class="top"></div>
                <div class="left"></div>
              </div>
            </div>`
          )
          .join("")}
      </div>
`;
