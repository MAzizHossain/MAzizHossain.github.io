// =========================================================
// Site configuration
// =========================================================

// Single source of truth for the site nav.
// To add a page: add one entry here and create the matching
// .html file.

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

// Applied immediately so the correct theme is set
// as early as possible.

function preferredTheme() {

  var stored = null;

  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch (e) {}

  if (
    stored === "dark" ||
    stored === "light"
  ) {
    return stored;
  }

  if (
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
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


applyTheme(
  preferredTheme()
);


// =========================================================
// Current page
// =========================================================

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

  var page =
    currentPage();


  var links =
    NAV_ITEMS.map(
      function (item) {

        var attrs = [
          'href="' + item.href + '"'
        ];


        if (
          item.href === page
        ) {

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

      }
    ).join("\n    ");


  return (

    '<div class="sidebar-top">\n' +

    '  <a class="wordmark" href="index.html">' +
    SITE_NAME +
    '</a>\n' +

    '  <button ' +
    'class="nav-toggle" ' +
    'id="navToggle" ' +
    'type="button" ' +
    'aria-expanded="false" ' +
    'aria-controls="nav-links">' +

    '    <span></span>' +
    '    <span></span>' +
    '    <span></span>' +

    '    <span class="sr-only">' +
    'Menu' +
    '</span>' +

    '  </button>\n' +

    '</div>\n' +

    '<nav ' +
    'class="nav-links" ' +
    'id="nav-links" ' +
    'aria-label="Main navigation">\n' +

    '    ' +

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
    document.getElementById(
      "navToggle"
    );

  var links =
    document.getElementById(
      "nav-links"
    );


  if (
    !toggle ||
    !links
  ) {
    return;
  }


  // -------------------------------------------------------
  // Open / close menu with the hamburger button.
  // -------------------------------------------------------

  toggle.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      var isOpen =
        links.classList.toggle(
          "open"
        );


      toggle.setAttribute(
        "aria-expanded",
        isOpen
          ? "true"
          : "false"
      );

    }
  );


  // -------------------------------------------------------
  // Close menu when a navigation link is clicked.
  // -------------------------------------------------------

  links
    .querySelectorAll("a")
    .forEach(
      function (link) {

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

      }
    );


  // -------------------------------------------------------
  // Close menu when clicking anywhere outside it.
  // -------------------------------------------------------

  document.addEventListener(
    "click",
    function (event) {

      var isOpen =
        links.classList.contains(
          "open"
        );


      if (!isOpen) {
        return;
      }


      var clickedInsideMenu =
        links.contains(
          event.target
        );


      var clickedToggle =
        toggle.contains(
          event.target
        );


      if (
        !clickedInsideMenu &&
        !clickedToggle
      ) {

        links.classList.remove(
          "open"
        );

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  // -------------------------------------------------------
  // Close menu with Escape.
  // -------------------------------------------------------

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        links.classList.contains("open")
      ) {

        links.classList.remove(
          "open"
        );

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        toggle.focus();

      }

    }
  );

}


// =========================================================
// Theme toggle
// =========================================================

function initThemeToggle() {

  var btn =
    document.getElementById(
      "themeToggle"
    );


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
          .getAttribute(
            "data-theme"
          ) === "dark"
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


// =========================================================
// Expandable News / Currently panels
// =========================================================

function initInfoPanels() {

  var buttons =
    document.querySelectorAll(
      ".info-toggle"
    );


  if (!buttons.length) {
    return;
  }


  buttons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          var panelId =
            button.getAttribute(
              "aria-controls"
            );


          var panel =
            document.getElementById(
              panelId
            );


          if (!panel) {
            return;
          }


          var isOpen =
            button.getAttribute(
              "aria-expanded"
            ) === "true";


          // Toggle the button state.

          button.setAttribute(
            "aria-expanded",
            isOpen
              ? "false"
              : "true"
          );


          // Show or hide the panel.

          panel.hidden =
            isOpen;

        }
      );

    }
  );

}


// =========================================================
// Dynamic Publications
// =========================================================

function loadPublications() {

  var container =
    document.getElementById(
      "publications"
    );


  // Only runs on publications.html.

  if (!container) {
    return;
  }


  fetch("publications.json")

    .then(
      function (response) {

        if (!response.ok) {

          throw new Error(
            "Could not load publications.json"
          );

        }

        return response.json();

      }
    )


    .then(
      function (data) {

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


            // Create publication row.

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

      }
    )


    .catch(
      function (error) {

        console.error(
          "Publication loading error:",
          error
        );


        container.innerHTML =
          '<p class="publication-error">' +
          'Unable to load publications.' +
          '</p>';

      }
    );

}


// =========================================================
// Gallery
// =========================================================


// ---------------------------------------------------------
// Guess the year
// ---------------------------------------------------------

function initGalleryYearGuess() {

  var buttons =
    document.querySelectorAll(
      ".guess-year"
    );


  if (!buttons.length) {
    return;
  }


  buttons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          var galleryItem =
            button.closest(
              ".gallery-item"
            );


          if (!galleryItem) {
            return;
          }


          var year =
            galleryItem.dataset.year;


          var yearDisplay =
            galleryItem.querySelector(
              ".gallery-year"
            );


          if (!yearDisplay) {
            return;
          }


          var isRevealed =
            button.getAttribute(
              "aria-expanded"
            ) === "true";


          // -------------------------------------------------
          // Reveal the year.
          // -------------------------------------------------

          if (!isRevealed) {

            yearDisplay.textContent =
              year;

            button.textContent =
              "Hide year";

            button.setAttribute(
              "aria-expanded",
              "true"
            );

          }


          // -------------------------------------------------
          // Hide the year and restore the button.
          // -------------------------------------------------

          else {

            yearDisplay.textContent =
              "";

            button.textContent =
              "Guess the year";

            button.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }
      );

    }
  );

}


// ---------------------------------------------------------
// Gallery shuffle
// ---------------------------------------------------------

function shuffleGallery() {

  var gallery =
    document.querySelector(
      ".gallery-grid"
    );


  if (!gallery) {
    return;
  }


  var items =
    Array.from(
      gallery.querySelectorAll(
        ".gallery-item"
      )
    );


  // Fisher-Yates shuffle.

  for (
    var i = items.length - 1;
    i > 0;
    i--
  ) {

    var j =
      Math.floor(
        Math.random() * (i + 1)
      );


    var temp =
      items[i];

    items[i] =
      items[j];

    items[j] =
      temp;

  }


  // Reinsert shuffled items.

  items.forEach(
    function (item) {

      gallery.appendChild(
        item
      );

    }
  );

}


// ---------------------------------------------------------
// Lightbox
// ---------------------------------------------------------

var lightbox = null;
var lightboxImage = null;
var lightboxClose = null;

var previousFocusedElement = null;


function initLightbox() {

  lightbox =
    document.getElementById(
      "lightbox"
    );

  lightboxImage =
    document.getElementById(
      "lightbox-image"
    );

  lightboxClose =
    document.querySelector(
      ".lightbox-close"
    );


  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxClose
  ) {
    return;
  }


  var galleryImages =
    document.querySelectorAll(
      ".gallery-item img"
    );


  galleryImages.forEach(
    function (image) {

      image.addEventListener(
        "click",
        function () {

          openLightbox(image);

        }
      );


      image.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            openLightbox(image);

          }

        }
      );

    }
  );


  lightboxClose.addEventListener(
    "click",
    function () {

      closeLightbox();

    }
  );


  lightbox.addEventListener(
    "click",
    function (event) {

      if (
        event.target === lightbox
      ) {

        closeLightbox();

      }

    }
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        !lightbox.hidden
      ) {

        closeLightbox();

      }

    }
  );

}


function openLightbox(image) {

  if (
    !lightbox ||
    !lightboxImage
  ) {
    return;
  }


  previousFocusedElement =
    document.activeElement;


  lightboxImage.src =
    image.currentSrc ||
    image.src;


  lightboxImage.alt =
    image.alt;


  lightbox.hidden =
    false;


  // Force the browser to recognize
  // the visible state before applying
  // the active class.

  requestAnimationFrame(
    function () {

      lightbox.classList.add(
        "active"
      );

    }
  );


  document.body.classList.add(
    "lightbox-open"
  );


  lightboxClose.focus();

}


function closeLightbox() {

  if (
    !lightbox ||
    !lightboxImage
  ) {
    return;
  }


  lightbox.classList.remove(
    "active"
  );


  document.body.classList.remove(
    "lightbox-open"
  );


  lightboxImage.src =
    "";

  lightboxImage.alt =
    "";


  // Wait for the opacity transition
  // before hiding the element.

  setTimeout(
    function () {

      if (
        lightbox &&
        !lightbox.classList.contains(
          "active"
        )
      ) {

        lightbox.hidden =
          true;

      }

    },
    160
  );


  if (
    previousFocusedElement &&
    typeof previousFocusedElement.focus ===
      "function"
  ) {

    previousFocusedElement.focus();

  }

}


// =========================================================
// Initialize the site
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  function () {


    // -------------------------------------------------------
    // Header
    // -------------------------------------------------------

    var headerSlot =
      document.getElementById(
        "site-header"
      );


    if (headerSlot) {

      headerSlot.innerHTML =
        renderHeader();

    }


    // -------------------------------------------------------
    // Footer
    // -------------------------------------------------------

    var footerSlot =
      document.getElementById(
        "site-footer"
      );


    if (footerSlot) {

      footerSlot.innerHTML =
        FOOTER_HTML;

    }


    // -------------------------------------------------------
    // Theme tab
    // -------------------------------------------------------

    // Prevent duplicate theme buttons if this script
    // is accidentally loaded more than once.

    if (
      !document.getElementById(
        "themeToggle"
      )
    ) {

      document.body.insertAdjacentHTML(
        "beforeend",
        renderThemeTab()
      );

    }


    // -------------------------------------------------------
    // Shared site features
    // -------------------------------------------------------

    initToggle();

    initThemeToggle();

    initInfoPanels();

    loadPublications();


    // -------------------------------------------------------
    // Gallery features
    // -------------------------------------------------------

    shuffleGallery();

    initGalleryYearGuess();

    initLightbox();

  }
);
