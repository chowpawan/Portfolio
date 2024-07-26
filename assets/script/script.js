// Preloader
window.addEventListener("load", function () {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.classList.add("opacity-0");
    setTimeout(function () {
      preloader.style.display = "none";
    }, 1000);
  }
});

// Aside Navbar
const nav = document.querySelector(".nav");
const navList = nav ? nav.querySelectorAll("li") : [];
const totalNavList = navList.length;
const allSection = document.querySelectorAll(".section");
const totalSection = allSection.length;

if (navList.length > 0) {
  navList.forEach((navItem, index) => {
    const a = navItem.querySelector("a");
    if (a) {
      a.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Remove active class from all sections and add back-section class where needed
        allSection.forEach(section => section.classList.remove("back-section"));
        navList.forEach(navItem => {
          const link = navItem.querySelector("a");
          if (link && link.classList.contains("active")) {
            const sectionId = link.getAttribute("href").split("#")[1];
            const section = document.querySelector(`#${sectionId}`);
            if (section) {
              section.classList.add("back-section");
            }
          }
          if (link) {
            link.classList.remove("active");
          }
        });

        // Add active class to the clicked link and show the corresponding section
        this.classList.add("active");
        showSection(this);

        // Toggle the aside if viewport is less than 1200px
        if (window.innerWidth < 1200) {
          asideSectionTogglerBtn();
        }
      });
    }
  });
}

function showSection(element) {
  if (element) {
    allSection.forEach(section => section.classList.remove("active"));
    const targetId = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector(`#${targetId}`);
    if (targetSection) {
      targetSection.classList.add("active");
    }
  }
}

const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

if (navTogglerBtn && aside) {
  navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
  });
}

function asideSectionTogglerBtn() {
  if (aside && navTogglerBtn) {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSection.forEach(section => section.classList.toggle("open"));
  }
}
