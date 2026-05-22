// CUSTOM CURSOR
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
});
function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animateRing);
}
animateRing();
document
    .querySelectorAll(
        "a, button, .service-card, .menu-item, .gallery-item",
    )
    .forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            ring.style.width = "56px";
            ring.style.height = "56px";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.width = "12px";
            cursor.style.height = "12px";
            ring.style.width = "36px";
            ring.style.height = "36px";
        });
    });

// NAV SCROLL
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    document
        .getElementById("backTop")
        .classList.toggle("visible", window.scrollY > 400);
});

// BACK TO TOP
document
    .getElementById("backTop")
    .addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
    );

// HAMBURGER
const ham = document.getElementById("hamburger");
const mob = document.getElementById("mobileMenu");
ham.addEventListener("click", () => {
    ham.classList.toggle("open");
    mob.classList.toggle("open");
});
document.querySelectorAll(".mobile-link").forEach((l) => {
    l.addEventListener("click", () => {
        ham.classList.remove("open");
        mob.classList.remove("open");
    });
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                observer.unobserve(e.target);
            }
        });
    },
    { threshold: 0.12 },
);
reveals.forEach((el) => observer.observe(el));

// CONTACT FORM
// ── CONFIG — fill these in ──
const EMAILJS_PUBLIC_KEY = "Ac_EjujBGZUbW8X65"; // EmailJS public key
const EMAILJS_SERVICE_ID = "service_ca8who8"; //  service_abc123
const EMAILJS_TEMPLATE_ID = "template_sca6mwr"; //  template_xyz456
const WHATSAPP_NUMBER = "2349029740054";

// Init EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

document
    .getElementById("contactForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const firstName = document
            .getElementById("firstName")
            .value.trim();
        const lastName = document
            .getElementById("lastName")
            .value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const message = document
            .getElementById("message")
            .value.trim();

        if (!firstName || !email) {
            // alert("Please fill in at least your name and email.");

            let formReqire = document.getElementById("formReqire");
            formReqire.style.display = "block";
            setTimeout(() => {
                formReqire.style.display = "none";
            }, 3000);
            return;
        }

        const btn = this.querySelector(".form-submit");
        btn.textContent = "Sending…";
        btn.disabled = true;

        // ── 1. SEND TO GMAIL via EmailJS ──
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    firstName,
                    lastName,
                    email,
                    phone: phone || "Not provided",
                    service: service || "Not specified",
                    date: date || "Not specified",
                    message: message || "No additional message",
                },
            );
        } catch (err) {
            console.error("EmailJS error:", err);
            btn.textContent = "Send Enquiry →";
            btn.disabled = false;
            // alert("Could not send email. Please try again.");

            let formError = document.getElementById("formError");
            formError.style.display = "block";
            setTimeout(() => {
                formError.style.display = "none";
            }, 3000);
            return;
        }

        // ── 2. OPEN WHATSAPP with pre-filled message ──
        const waText = [
            "🍽️ *New Enquiry — Lades_Delish*",
            "─────────────────────",
            `👤 *Name:* ${firstName} ${lastName}`,
            `📧 *Email:* ${email}`,
            `📞 *Phone:* ${phone || "Not provided"}`,
            `🛎️ *Service:* ${service || "Not specified"}`,
            `📅 *Date:* ${date || "Not specified"}`,
            `💬 *Message:* ${message || "No additional message"}`,
            "─────────────────────",
            "_Sent via ladesdelish.com_",
        ].join("\n");

        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`,
            "_blank",
        );

        // ── 3. SUCCESS ──
        document.getElementById("formSuccess").style.display =
            "block";
        btn.textContent = "✓ Enquiry Sent!";
        this.reset();

        setTimeout(() => {
            document.getElementById("formSuccess").style.display =
                "none";
            btn.textContent = "Send Enquiry →";
            btn.disabled = false;
        }, 6000);
    });

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120)
            current = s.getAttribute("id");
    });
    navLinks.forEach((a) => {
        a.style.color =
            a.getAttribute("href") === "#" + current
                ? "var(--gold)"
                : "";
    });
});

// PLAY VIDEO ON HOVER
const videos = document.querySelectorAll(".hover-video");
videos.forEach((video) => {
    video.addEventListener("mouseenter", () => {
        video.play();
    });

    video.addEventListener("mouseleave", () => {
        video.pause();
        video.cerrentTime = 0;
    });
});

// ── MENU MODAL ──
const menuModal = document.getElementById("menuModal");

// Open on any "Request a Full Menu" link
document
    .querySelectorAll('a[href="#menu-modal"], .menu-modal-trigger')
    .forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            menuModal.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

// Close on X button
document
    .getElementById("menuModalClose")
    .addEventListener("click", () => {
        menuModal.classList.remove("open");
        document.body.style.overflow = "";
    });

// Close on backdrop click
menuModal.addEventListener("click", (e) => {
    if (e.target === menuModal) {
        menuModal.classList.remove("open");
        document.body.style.overflow = "";
    }
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        menuModal.classList.remove("open");
        document.body.style.overflow = "";
    }
});