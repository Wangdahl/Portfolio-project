

/* Download CV pdf */
document.getElementById("cv-btn").addEventListener("click", function() {
    const pdfPath = "../images/cv-melker-wangdahl.pdf";
    const a = document.createElement("a");
    a.href = pdfPath;
    a.download = "cv-melker-wangdahl.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});


/* Resume section - SHOW / HIDE content below H3 headings */

const headings = document.querySelectorAll(".toggle-heading");
const contents = document.querySelectorAll(".content");

function updateActiveClass(clickHeading, targetContent) {
    headings.forEach(h => h.classList.remove("active"));
    contents.forEach(c => c.classList.remove("visible"))

    clickHeading.classList.add("active");
    targetContent.classList.add("visible");
}

headings.forEach(heading => {
    heading.addEventListener("click", () => {
        const targetId = heading.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);

        // If the target content is already visible, toggle it off
        if (targetContent.classList.contains("visible")) {
            heading.classList.remove("active");
            targetContent.classList.remove("visible");
        } else {
            // Otherwise, activate the clicked heading and show its content
            updateActiveClass(heading, targetContent);
        }
    });
});

// smooth transition


function addSmoothTransitionToContent(contentElement) {
    if (contentElement.classList.contains("visible")) {
        // Expanding content
        contentElement.style.height = `${contentElement.scrollHeight}px`;
        contentElement.style.transition = "height 0.3s ease";
        contentElement.addEventListener(
            "transitionend",
            () => {
                contentElement.style.height = "auto"; // Reset height to natural flow
            },
            { once: true }
        );
    } else {
        // Collapsing content
        contentElement.style.height = `${contentElement.scrollHeight}px`; // Start at full height
        
        requestAnimationFrame(() => {
            contentElement.style.height = "0"; // Collapse to zero height
        });
    }
}

contents.forEach(content => {
    content.addEventListener("classChange", () => {
        addSmoothTransitionToContent(content);
    });

    // Monitor visibility changes
    const observer = new MutationObserver(() => {
        addSmoothTransitionToContent(content);
    });

    observer.observe(content, { attributes: true, attributeFilter: ["class"] });
});

