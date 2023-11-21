const charactersListElement = document.querySelector("#characters-name");
const charactersDetailsElement = document.querySelector("#details");
const planetListElement = document.querySelector("#planet");
const paginationElement = document.querySelector("#pagination");
const currentPageElement = document.querySelector("#currentPage");
const totalPagesElement = document.querySelector("#totalPages");

const charactersPerPage = 6;
let currentPage = 1;
let allCharacters = [];

function displayCharacters(page) {
    const start = (page - 1) * charactersPerPage;
    const end = start + charactersPerPage;
    const charactersToShow = allCharacters.slice(start, end);

    charactersListElement.innerHTML = '';
    charactersToShow.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person.name;
        listItem.addEventListener('click', () => showCharacterDetails(person));
        charactersListElement.appendChild(listItem);
    });

    currentPageElement.textContent = page;
}

function showCharacterDetails(character) {
    const detailsHTML = `
        <h3>${character.name}</h3>
        <p>Height: ${character.height} cm</p>
        <p>Mass: ${character.mass}kg</p>
        <p>Hair color: ${character.hair_color}</p>
        <p>Skin color: ${character.skin_color}</p>
        <p>Eye color: ${character.eye_color}</p>
        <p>Birth_year: ${character.birth_year}</p>
        <p>Gender: ${character.gender}</p>
    `;

    charactersDetailsElement.innerHTML = detailsHTML;

    if (character.homeworld) {
        fetch(character.homeworld)
            .then(res => res.json())
            .then(planetData => {
                const planetItem = document.createElement('li');
                planetItem.innerHTML = `
                    <h3>${planetData.name}</h3>
                    <p>Rotation period: ${planetData.rotation_period}
                    <p>Orbital period: ${planetData.orbital_period}
                    <p>Diameter: ${planetData.diameter}
                    <p>Climate: ${planetData.climate}</p>
                    <p>Gravity: ${planetData.gravity}</p>
                    <p>Terrain: ${planetData.terrain}</p>
                `;
                planetListElement.innerHTML = ''; // Limpa planetas anteriores
                planetListElement.appendChild(planetItem);
            })
            .catch(error => console.error("Erro ao buscar dados do planeta:", error));
    } else {
        planetListElement.innerHTML = '<li>No planet information available</li>';
    }
}

function nextPage() {
    if (currentPage < Math.ceil(allCharacters.length / charactersPerPage)) {
        currentPage++;
        displayCharacters(currentPage);
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayCharacters(currentPage);
    }
}

// Fetch para obter informações sobre todos os personagens
fetch('https://swapi.dev/api/people/')
    .then(res => res.json())
    .then(data => {
        allCharacters = data.results;
        displayCharacters(currentPage);
        totalPagesElement.textContent = `/${Math.ceil(allCharacters.length / charactersPerPage)}`;
    })
    .catch(error => console.error('Erro ao buscar dados:', error));