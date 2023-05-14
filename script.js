const leftLight = document.querySelector(".left_light .front_site");
const rightLight = document.querySelector(".right_light .front_site");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const z = x + y;

  leftLight.style.transform = `translate(-50%, -50%) rotate(${z / 20}deg)`;
  rightLight.style.transform = `translate(-50%, -50%) rotate(-${z / 20}deg)`;
});
