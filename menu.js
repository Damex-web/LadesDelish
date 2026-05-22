// Smooth scroll to section
function scrollTo(id) {
    document
        .getElementById(id)
        .scrollIntoView({ behavior: "smooth", block: "start" });
}

// Highlight active nav tab on scroll
const sections = [
    "rice",
    "stew",
    "soups",
    "sauces",
    "peppersoup",
    "yam",
    "beans",
    "sides",
];
const btns = document.querySelectorAll(".menu-nav-btn");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const idx = sections.indexOf(entry.target.id);
                btns.forEach((b) => b.classList.remove("active"));
                if (idx >= 0) btns[idx].classList.add("active");
            }
        });
    },
    { rootMargin: "-30% 0px -60% 0px" },
);

sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
});