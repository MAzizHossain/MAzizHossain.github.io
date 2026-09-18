// Single source of truth for the site nav.
// To add a page: add one entry here and create the matching .html file.
// You never need to touch the nav markup in any individual page again.
var NAV_ITEMS = [
  { href: "index.html", label: "Home" },
  { href: "publications.html", label: "Publications" },
  { href: "gaming.html", label: "Gaming", section: "gaming" },
  { href: "teaching.html", label: "Teaching" },
  { href: "contact.html", label: "Contact" }
];

var SITE_NAME = "Mohammed Aziz Hossain";
var FOOTER_HTML = "<p>&copy; 2026 Aziz Hossain. Built with GitHub Pages.</p>";

function currentPage() {
  var path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function renderHeader() {
  var page = currentPage();

  var links = NAV_ITEMS.map(function (item) {
    var attrs = ['href="' + item.href + '"'];
    if (item.href === page) attrs.push('class="active"');
    if (item.section) attrs.push('data-section="' + item.section + '"');
    return "<a " + attrs.join(" ") + ">" + item.label + "</a>";
  }).join("\n    ");

  return (
    '<div class="sidebar-top">\n' +
    '  <a class="wordmark" href="index.html">' + SITE_NAME + '</a>\n' +
    '  <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="nav-links">\n' +
    '    <span></span><span></span><span></span>\n' +
    '    <span class="sr-only">Menu</span>\n' +
    '  </button>\n' +
    '</div>\n' +
    '<nav class="nav-links" id="nav-links">\n    ' + links + '\n</nav>'
  );
}

function initToggle() {
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var headerSlot = document.getElementById("site-header");
  if (headerSlot) headerSlot.innerHTML = renderHeader();

  var footerSlot = document.getElementById("site-footer");
  if (footerSlot) footerSlot.innerHTML = FOOTER_HTML;

  initToggle();
});
