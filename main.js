const signInBtn = document.querySelector(".signInBtn");
const signUpBtn = document.querySelector(".signUpBtn");
const formsBox = document.querySelector(".forms");
const forms = formsBox.querySelectorAll("form");

const animateToSignUp = () => {
  signInBtn.classList.contains("active") &&
    signInBtn.classList.remove("active");

  formsBox.classList.contains("animateToSignIn") &&
    formsBox.classList.remove("animateToSignIn");
  formsBox.classList.add("animateToSignUp");

  signUpBtn.classList.add("active");
};
const animateToSignIn = () => {
  signUpBtn.classList.contains("active") &&
    signUpBtn.classList.remove("active");

  formsBox.classList.contains("animateToSignUp") &&
    formsBox.classList.remove("animateToSignUp");
  formsBox.classList.add("animateToSignIn");

  signInBtn.classList.add("active");
};

forms.forEach((form) => {
  const inputBoxs = form.querySelectorAll(".inputBox");
  const checkBox = form.querySelector(".checkBox");
  const passwordBox = form.querySelector(".passwordBox");
  const confirmPasswordBox = form.querySelector(".confirmPasswordBox");

  inputBoxs.forEach((item) => {
    const input = item.querySelector("input");
    const icon = item.querySelector("i");

    input.addEventListener("focus", () => item.classList.add("active"));
    input.addEventListener(
      "blur",
      () => input.value === "" && item.classList.remove("active")
    );
    input.addEventListener("input", () =>
      input.value === ""
        ? icon.classList.remove("active")
        : icon.classList.add("active")
    );
    icon.addEventListener("click", () => {
      input.focus();
      input.value = "";
      icon.classList.remove("active");
    });
    if (item === passwordBox || confirmPasswordBox) {
      input.addEventListener("input", () => checkBoxToggle());
      icon.addEventListener("click", () => checkBoxToggle());
      checkBox.querySelector("input").addEventListener("change", function () {
        this.checked ? (input.type = "text") : (input.type = "password");
      });
    }
  });
  const checkBoxToggle = () => {
    const passwordInput = passwordBox.querySelector("input");
    if (!confirmPasswordBox) {
      passwordInput.value === ""
        ? checkBox.classList.remove("active")
        : checkBox.classList.add("active");
    } else {
      const confirmPasswordInput = confirmPasswordBox.querySelector("input");
      passwordInput.value === "" && confirmPasswordInput.value === ""
        ? checkBox.classList.remove("active")
        : checkBox.classList.add("active");
    }
  };
});
