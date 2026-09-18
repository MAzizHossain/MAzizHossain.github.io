// Single source of truth for the site nav.
// To add a page: add one entry here and create the matching .html file.
// You never need to touch the nav markup in any individual page again.

var NAV_ITEMS = [
  { href: "index.html", label: "Home" },
  { href: "publications.html", label: "Publications" },
  { href: "gaming.html", label: "Gaming", section: "gaming" },
  { href: "teaching.html", label: "Teaching" },
  { href: "gallery.html", label: "Gallery" },
  { href: "contact.html", label: "Contact" }
];

var SITE_NAME = "Mohammed Aziz Hossain";

var FOOTER_HTML =
  "<p>&copy; 2026 Aziz Hossain. Built with GitHub Pages.</p>";

var THEME_KEY = "site-theme";


// =========================================================
// Theme
// =========================================================

// Applied immediately (not waiting for DOMContentLoaded) so
// the correct theme is set as early as possible.

function preferredTheme() {

  var stored = null;

  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch (e) {}

  if (stored === "dark" || stored === "light") {
    return stored;
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}


function applyTheme(theme) {

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  var btn =
    document.getElementById("themeToggle");

  if (btn) {

    btn.textContent =
      theme === "dark"
        ? "Light"
        : "Dark";

    btn.setAttribute(
      "aria-pressed",
      theme === "dark"
        ? "true"
        : "false"
    );
  }
}


applyTheme(preferredTheme());


function currentPage() {

  var path =
    window.location.pathname
      .split("/")
      .pop();

  return path === ""
    ? "index.html"
    : path;
}


// =========================================================
// Header
// =========================================================

function renderHeader() {

  var page = currentPage();

  var links =
    NAV_ITEMS.map(function (item) {

      var attrs = [
        'href="' + item.href + '"'
      ];


      if (item.href === page) {

        attrs.push(
          'class="active"'
        );

      }


      if (item.section) {

        attrs.push(
          'data-section="' +
          item.section +
          '"'
        );

      }


      return (
        "<a " +
        attrs.join(" ") +
        ">" +
        item.label +
        "</a>"
      );

    }).join("\n    ");


  return (

    '<div class="sidebar-top">\n' +

    '  <a class="wordmark" href="index.html">' +
    SITE_NAME +
    '</a>\n' +

    '  <button class="nav-toggle" id="navToggle" ' +
    'aria-expanded="false" aria-controls="nav-links">\n' +

    '    <span></span>' +
    '<span></span>' +
    '<span></span>\n' +

    '    <span class="sr-only">Menu</span>\n' +

    '  </button>\n' +

    '</div>\n' +

    '<nav class="nav-links" id="nav-links">\n    ' +

    links +

    '\n</nav>'

  );

}


// =========================================================
// Theme tab
// =========================================================

function renderThemeTab() {

  return (

    '<button ' +
    'class="theme-tab" ' +
    'id="themeToggle" ' +
    'type="button" ' +
    'aria-pressed="false" ' +
    'aria-label="Switch color theme">' +

    'Dark' +

    '</button>'

  );

}


// =========================================================
// Mobile navigation
// =========================================================

function initToggle() {

  var toggle =
    document.getElementById("navToggle");

  var links =
    document.getElementById("nav-links");


  if (!toggle || !links) {
    return;
  }


  toggle.addEventListener(
    "click",
    function () {

      var isOpen =
        links.classList.toggle("open");


      toggle.setAttribute(
        "aria-expanded",
        isOpen
          ? "true"
          : "false"
      );

    }
  );


  links
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          links.classList.remove(
            "open"
          );

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


// =========================================================
// Theme toggle
// =========================================================

function initThemeToggle() {

  var btn =
    document.getElementById("themeToggle");


  if (!btn) {
    return;
  }


  applyTheme(
    preferredTheme()
  );


  btn.addEventListener(
    "click",
    function () {

      var current =
        document.documentElement
          .getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";


      var next =
        current === "dark"
          ? "light"
          : "dark";


      applyTheme(next);


      try {

        localStorage.setItem(
          THEME_KEY,
          next
        );

      } catch (e) {}

    }
  );

}


/* =========================================================
   Dynamic Publications
   ========================================================= */

function loadPublications() {

  var container =
    document.getElementById(
      "publications"
    );


  // This means the code only runs
  // on publications.html.

  if (!container) {
    return;
  }


  fetch("publications.json")

    .then(function (response) {

      if (!response.ok) {

        throw new Error(
          "Could not load publications.json"
        );

      }

      return response.json();

    })


    .then(function (data) {

      var publications =
        data.publications || [];


      // Newest publications first.

      publications.sort(
        function (a, b) {

          return b.year - a.year;

        }
      );


      container.innerHTML = "";


      var currentYear = null;

      var rowList = null;


      publications.forEach(
        function (publication) {


          // Create a new year heading
          // when the year changes.

          if (
            publication.year !==
            currentYear
          ) {

            currentYear =
              publication.year;


            var yearHeading =
              document.createElement(
                "p"
              );


            yearHeading.className =
              "year-heading";


            yearHeading.textContent =
              currentYear;


            container.appendChild(
              yearHeading
            );


            rowList =
              document.createElement(
                "div"
              );


            rowList.className =
              "row-list";


            container.appendChild(
              rowList
            );

          }


          // Create the publication row.

          var row =
            document.createElement(
              "div"
            );


          row.className =
            "row";


          row.innerHTML = `

            <div class="row-head">

              <span class="row-title">

                <a
                  href="${publication.doi}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${publication.title}
                </a>

              </span>

              <span class="row-meta">
                ${publication.journal}
              </span>

            </div>


            <p class="row-desc">
              ${publication.authors}
            </p>


            <div class="row-links">

              <a
                href="${publication.doi}"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>

            </div>

          `;


          rowList.appendChild(
            row
          );

        }
      );

    })


    .catch(function (error) {

      console.error(
        "Publication loading error:",
        error
      );


      container.innerHTML =
        '<p class="publication-error">' +
        'Unable to load publications.' +
        '</p>';

    });

}


/* =========================================================
   Initialize the site
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {


    var headerSlot =
      document.getElementById(
        "site-header"
      );


    if (headerSlot) {

      headerSlot.innerHTML =
        renderHeader();

    }


    var footerSlot =
      document.getElementById(
        "site-footer"
      );


    if (footerSlot) {

      footerSlot.innerHTML =
        FOOTER_HTML;

    }


    document.body.insertAdjacentHTML(
      "beforeend",
      renderThemeTab()
    );


    initToggle();

    initThemeToggle();


    // Load publications if this is
    // publications.html.

    loadPublications();

  }
);
