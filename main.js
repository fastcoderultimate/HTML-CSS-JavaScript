const signInBtn = document.querySelector(".signInBtn"),
  signUpBtn = document.querySelector(".signUpBtn"),
  formsBox = document.querySelector(".forms"),
  forms = formsBox.querySelectorAll("form");

const animateToSignUp = () => {
  signInBtn.classList.contains("active") &&
    signInBtn.classList.remove("active");
  signUpBtn.classList.add("active");

  formsBox.classList.contains("animateToSignIn") &&
    formsBox.classList.remove("animateToSignIn");
  formsBox.classList.add("animateToSignUp");
};
const animateToSignIn = () => {
  signUpBtn.classList.contains("active") &&
    signUpBtn.classList.remove("active");
  signInBtn.classList.add("active");

  formsBox.classList.contains("animateToSignUp") &&
    formsBox.classList.remove("animateToSignUp");
  formsBox.classList.add("animateToSignIn");
};

forms.forEach((form) => {
  const inputBoxs = form.querySelectorAll(".inputBox"),
    checkBox = form.querySelector(".checkBox"),
    passwordBox = form.querySelector(".passwordBox"),
    confirmPasswordBox = form.querySelector(".confirmPasswordBox");

  inputBoxs.forEach((item) => {
    const input = item.querySelector("input"),
      icon = item.querySelector("i");

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
    if (item === passwordBox || item === confirmPasswordBox) {
      input.addEventListener("input", () => checkBoxToggle());
      icon.addEventListener("click", () => checkBoxToggle());
      checkBox.querySelector("input").addEventListener("change", function () {
        input.type = this.checked ? "text" : "password";
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
