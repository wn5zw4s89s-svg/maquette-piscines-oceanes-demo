(function () {
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.querySelector("nav.menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var form = document.querySelector("form.demo-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = form.querySelector(".form-ok");
      if (ok) ok.classList.add("is-on");
    });
  }

  var filters = document.querySelectorAll(".filters button");
  var items = document.querySelectorAll(".gallery figure");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      var cat = btn.getAttribute("data-filter");
      items.forEach(function (fig) {
        var show = cat === "all" || fig.getAttribute("data-cat").indexOf(cat) !== -1;
        fig.hidden = !show;
      });
    });
  });

  var lb = document.querySelector(".lightbox");
  if (!lb) return;
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("p");
  var figs = Array.prototype.slice.call(document.querySelectorAll(".gallery figure"));
  var idx = 0;

  function openAt(i) {
    idx = (i + figs.length) % figs.length;
    var fig = figs[idx];
    if (fig.hidden) {
      var n = 0;
      do { idx = (idx + 1) % figs.length; fig = figs[idx]; n++; } while (fig.hidden && n < figs.length);
    }
    var btn = fig.querySelector("button");
    lbImg.src = btn.getAttribute("data-full");
    lbImg.width = btn.getAttribute("data-w") || "";
    lbImg.height = btn.getAttribute("data-h") || "";
    lbImg.alt = btn.querySelector("img").alt;
    lbCap.textContent = btn.querySelector("img").alt;
    if (typeof lb.showModal === "function") lb.showModal();
  }
  function close() { if (lb.open) lb.close(); }
  figs.forEach(function (fig, i) {
    fig.querySelector("button").addEventListener("click", function () { openAt(i); });
  });
  var prev = lb.querySelector(".lb-prev");
  var next = lb.querySelector(".lb-next");
  var x = lb.querySelector(".lb-close");
  if (prev) prev.addEventListener("click", function () { openAt(idx - 1); });
  if (next) next.addEventListener("click", function () { openAt(idx + 1); });
  if (x) x.addEventListener("click", close);
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.open) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") openAt(idx + 1);
    if (e.key === "ArrowLeft") openAt(idx - 1);
  });
})();
