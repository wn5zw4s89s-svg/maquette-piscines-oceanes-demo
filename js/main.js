
(function () {
  var header = document.querySelector("header.site");
  var toggle = document.querySelector(".menu-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var form = document.getElementById("form-devis");
  var btn = document.getElementById("btn-devis");
  var feedback = document.getElementById("form-feedback");
  if (btn && feedback) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      feedback.hidden = false;
    });
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (feedback) feedback.hidden = false;
    });
  }
})();
