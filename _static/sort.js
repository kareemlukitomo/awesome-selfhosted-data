function sortProjectsAlphabetically() {
    // Get the list of project elements
    const projectsList = document.querySelectorAll("#software section");

    // Convert the NodeList to an array for sorting
    const projectsArray = Array.from(projectsList);

    // Sort the projects alphabetically based on the titles (from elements with <h3>)
    projectsArray.sort((a, b) => {
        const titleA = a.querySelector("h3").textContent.toLowerCase();
        const titleB = b.querySelector("h3").textContent.toLowerCase();

        return titleA.localeCompare(titleB); // Sort alphabetically
    });

    // Create a new container to hold the sorted projects
    const sortedContainer = document.createElement("div");

    // Get the first <h2>, <p>, and <hr> elements and clone them to preserve at the top
    const firstHeading = document.querySelector("#software h2");
    const firstParagraph = document.querySelector("#software p");
    const firstHr = document.querySelector("#software hr");

    sortedContainer.appendChild(firstHeading.cloneNode(true));
    sortedContainer.appendChild(firstParagraph.cloneNode(true));
    sortedContainer.appendChild(firstHr.cloneNode(true));

    // Append the sorted projects and <hr class="docutils"> between them to the container
    projectsArray.forEach((project, index) => {
        sortedContainer.appendChild(project.cloneNode(true));

        // Add <hr class="docutils"> after each sorted item except the last one
        if (index < projectsArray.length - 1) {
            const hr = document.createElement("hr");
            hr.classList.add("docutils");
            sortedContainer.appendChild(hr);
        }
    });

    // Replace the existing projects container with the sorted one
    const softwareSection = document.getElementById("software");
    softwareSection.innerHTML = "";
    softwareSection.appendChild(sortedContainer);
}

function sortProjectsByStars() {
    // Get the list of project elements
    const projectsList = document.querySelectorAll("#software section");

    // Convert the NodeList to an array for sorting
    const projectsArray = Array.from(projectsList);

    // Sort the projects based on the number of stars (from elements with class .stars)
    projectsArray.sort((a, b) => {
        const starsA = parseInt(a.querySelector(".stars").textContent.match(/\d+/));
        const starsB = parseInt(b.querySelector(".stars").textContent.match(/\d+/));

        // Handle NaN values (elements with "?" stars)
        if (isNaN(starsA)) {
            return 1; // Move elements with "?" stars to the end
        }
        if (isNaN(starsB)) {
            return -1; // Move elements with "?" stars to the end
        }

        return starsB - starsA; // Sort in descending order by stars
    })

    // Create a new container to hold the sorted projects
    const sortedContainer = document.createElement("div");

    // Get the first <h2>, <p>, and <hr> elements and clone them to preserve at the top
    const firstHeading = document.querySelector("#software h2");
    const firstParagraph = document.querySelector("#software p");
    const firstHr = document.querySelector("#software hr");

    sortedContainer.appendChild(firstHeading.cloneNode(true));
    sortedContainer.appendChild(firstParagraph.cloneNode(true));
    sortedContainer.appendChild(firstHr.cloneNode(true));

    // Append the sorted projects and <hr class="docutils"> between them to the container
    projectsArray.forEach((project, index) => {
        sortedContainer.appendChild(project.cloneNode(true));

        // Add <hr class="docutils"> after each sorted item except the last one
        if (index < projectsArray.length - 1) {
            const hr = document.createElement("hr");
            hr.classList.add("docutils");
            sortedContainer.appendChild(hr);
        }
    });

    // Replace the existing projects container with the sorted one
    const softwareSection = document.getElementById("software");
    softwareSection.innerHTML = "";
    softwareSection.appendChild(sortedContainer);
}

// Count the number of items under the "software" section
const softwareSection = document.getElementById("software");
const projectsList = softwareSection.querySelectorAll("section");

if (projectsList.length > 1) {
    // Add HTML elements for sorting options only if there is more than one item to sort
    const sidebar = document.querySelector(".sidebar-container");

    if (sidebar) {
        const sortingOptionsHTML = `
        <div style="margin: 16px">
          <label>
            <input type="radio" name="sorting" value="alphabetical" onclick="sortProjectsAlphabetically()" checked>
            Alphabetical
          </label>
          <label>
            <input type="radio" name="sorting" value="stars" onclick="sortProjectsByStars()">
            Stars
          </label>
        </div>
      `;
        const searchContainer = sidebar.querySelector(".sidebar-search-container");
        searchContainer.insertAdjacentHTML("afterend", sortingOptionsHTML);
    }
}
