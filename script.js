"use strict";

/*
    =========================================
    INTERNSHIP DATA
    =========================================
*/

const internships = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechNova Labs",
        domain: "Technology",
        location: "Remote",
        type: "Full-time",
        stipend: "₹15,000 / month",
        skills: ["HTML", "CSS", "JavaScript"],
        description:
            "Build responsive web interfaces and work with the product development team."
    },

    {
        id: 2,
        title: "UI/UX Design Intern",
        company: "PixelCraft Studio",
        domain: "Design",
        location: "Chennai",
        type: "Part-time",
        stipend: "₹10,000 / month",
        skills: ["Figma", "UI Design", "Prototyping"],
        description:
            "Create user-friendly interfaces, prototypes and visual experiences for digital products."
    },

    {
        id: 3,
        title: "Digital Marketing Intern",
        company: "GrowthWorks",
        domain: "Marketing",
        location: "Remote",
        type: "Full-time",
        stipend: "₹12,000 / month",
        skills: ["SEO", "Social Media", "Analytics"],
        description:
            "Support digital campaigns and help improve online reach through data-driven marketing."
    },

    {
        id: 4,
        title: "Data Analyst Intern",
        company: "DataBridge Solutions",
        domain: "Technology",
        location: "Bangalore",
        type: "Full-time",
        stipend: "₹18,000 / month",
        skills: ["Python", "SQL", "Excel"],
        description:
            "Analyze business data and create useful reports to support better decision making."
    },

    {
        id: 5,
        title: "Finance Intern",
        company: "FinEdge Partners",
        domain: "Finance",
        location: "Mumbai",
        type: "Full-time",
        stipend: "₹14,000 / month",
        skills: ["Excel", "Accounting", "Analysis"],
        description:
            "Assist the finance team with reporting, analysis and day-to-day financial operations."
    },

    {
        id: 6,
        title: "HR Operations Intern",
        company: "PeopleFirst",
        domain: "Human Resources",
        location: "Hyderabad",
        type: "Part-time",
        stipend: "₹9,000 / month",
        skills: ["Recruitment", "Communication", "HR"],
        description:
            "Support recruitment activities, employee coordination and human resource operations."
    },

    {
        id: 7,
        title: "Backend Developer Intern",
        company: "CodeSphere",
        domain: "Technology",
        location: "Remote",
        type: "Full-time",
        stipend: "₹17,000 / month",
        skills: ["Node.js", "Express", "SQL"],
        description:
            "Develop backend services and APIs while learning modern server-side development."
    },

    {
        id: 8,
        title: "Graphic Design Intern",
        company: "CreativeNest",
        domain: "Design",
        location: "Coimbatore",
        type: "Part-time",
        stipend: "₹8,000 / month",
        skills: ["Photoshop", "Illustrator", "Branding"],
        description:
            "Create visual assets for social media, marketing campaigns and brand communication."
    },

    {
        id: 9,
        title: "Content Marketing Intern",
        company: "BrandBoost",
        domain: "Marketing",
        location: "Remote",
        type: "Full-time",
        stipend: "₹11,000 / month",
        skills: ["Writing", "SEO", "Content"],
        description:
            "Write engaging content and help the marketing team improve organic search visibility."
    }
];


/*
    =========================================
    DOM ELEMENTS
    =========================================
*/

const internshipGrid =
    document.getElementById("internshipGrid");

const searchInput =
    document.getElementById("searchInput");

const domainFilter =
    document.getElementById("domainFilter");

const clearFilters =
    document.getElementById("clearFilters");

const emptyClearButton =
    document.getElementById("emptyClearButton");

const retryButton =
    document.getElementById("retryButton");

const emptyState =
    document.getElementById("emptyState");

const errorState =
    document.getElementById("errorState");

const resultCount =
    document.getElementById("resultCount");

const statusMessage =
    document.getElementById("statusMessage");


/*
    =========================================
    GET COMPANY INITIAL
    =========================================
*/

function getCompanyInitial(company) {
    return company.charAt(0).toUpperCase();
}


/*
    =========================================
    RENDER INTERNSHIP CARDS
    =========================================
*/

function renderInternships(list) {

    internshipGrid.innerHTML = "";

    if (list.length === 0) {

        internshipGrid.hidden = true;
        emptyState.hidden = false;

        resultCount.textContent = "0 internships found";

        return;
    }

    internshipGrid.hidden = false;
    emptyState.hidden = true;

    resultCount.textContent =
        `${list.length} ${list.length === 1 ? "internship" : "internships"} found`;


    list.forEach((internship) => {

        const card =
            document.createElement("article");

        card.className = "internship-card";


        const skillsHTML =
            internship.skills
                .map(
                    (skill) =>
                        `<span class="detail">${skill}</span>`
                )
                .join("");


        card.innerHTML = `
            <div class="card-top">

                <div
                    class="company-logo"
                    aria-hidden="true"
                >
                    ${getCompanyInitial(internship.company)}
                </div>

                <span class="domain-tag">
                    ${internship.domain}
                </span>

            </div>


            <h3>
                ${internship.title}
            </h3>


            <p class="company-name">
                ${internship.company}
            </p>


            <p class="card-description">
                ${internship.description}
            </p>


            <div class="card-details">

                <span class="detail">
                    📍 ${internship.location}
                </span>

                <span class="detail">
                    💼 ${internship.type}
                </span>

                ${skillsHTML}

            </div>


            <div class="card-footer">

                <span class="stipend">
                    ${internship.stipend}
                </span>

                <button
                    type="button"
                    class="apply-button"
                    data-id="${internship.id}"
                    aria-label="Apply for ${internship.title} at ${internship.company}"
                >
                    View Details →
                </button>

            </div>
        `;


        internshipGrid.appendChild(card);

    });


    addApplyButtonListeners();
}


/*
    =========================================
    SEARCH + FILTER
    =========================================
*/

function filterInternships() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedDomain =
        domainFilter.value;


    const filtered =
        internships.filter((internship) => {

            const searchableText = `
                ${internship.title}
                ${internship.company}
                ${internship.domain}
                ${internship.location}
                ${internship.skills.join(" ")}
            `.toLowerCase();


            const matchesSearch =
                searchableText.includes(searchTerm);


            const matchesDomain =
                selectedDomain === "all" ||
                internship.domain === selectedDomain;


            return matchesSearch && matchesDomain;
        });


    statusMessage.textContent =
        searchTerm || selectedDomain !== "all"
            ? `Showing results for your filters.`
            : "";


    renderInternships(filtered);
}


/*
    =========================================
    CLEAR FILTERS
    =========================================
*/

function clearAllFilters() {

    searchInput.value = "";
    domainFilter.value = "all";

    statusMessage.textContent = "";

    renderInternships(internships);

    searchInput.focus();
}


/*
    =========================================
    APPLY / DETAILS BUTTON
    =========================================
*/

function addApplyButtonListeners() {

    const buttons =
        document.querySelectorAll(".apply-button");


    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const internshipId =
                Number(button.dataset.id);


            const internship =
                internships.find(
                    (item) =>
                        item.id === internshipId
                );


            if (!internship) {
                showError();
                return;
            }


            alert(
                `Internship Details\n\n` +
                `${internship.title}\n` +
                `${internship.company}\n\n` +
                `Location: ${internship.location}\n` +
                `Type: ${internship.type}\n` +
                `Stipend: ${internship.stipend}\n\n` +
                `Skills: ${internship.skills.join(", ")}`
            );

        });

    });
}


/*
    =========================================
    ERROR STATE
    =========================================
*/

function showError() {

    internshipGrid.hidden = true;
    emptyState.hidden = true;
    errorState.hidden = false;

    resultCount.textContent =
        "Unable to load internships";

    statusMessage.textContent =
        "An error occurred while loading internship data.";
}


/*
    =========================================
    RETRY
    =========================================
*/

function retryLoading() {

    errorState.hidden = true;
    internshipGrid.hidden = false;

    statusMessage.textContent =
        "Internships loaded successfully.";

    renderInternships(internships);

    setTimeout(() => {
        statusMessage.textContent = "";
    }, 2500);
}


/*
    =========================================
    EVENT LISTENERS
    =========================================
*/

searchInput.addEventListener(
    "input",
    filterInternships
);

domainFilter.addEventListener(
    "change",
    filterInternships
);

clearFilters.addEventListener(
    "click",
    clearAllFilters
);

emptyClearButton.addEventListener(
    "click",
    clearAllFilters
);

retryButton.addEventListener(
    "click",
    retryLoading
);


/*
    =========================================
    INITIAL LOAD
    =========================================
*/

function initializeApp() {

    try {

        if (!Array.isArray(internships)) {
            throw new Error(
                "Internship data is invalid."
            );
        }

        renderInternships(internships);

    } catch (error) {

        console.error(error);

        showError();
    }
}


initializeApp();
