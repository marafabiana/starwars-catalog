document.addEventListener('DOMContentLoaded', () => {
    const charactersListElement = document.querySelector("#characters-name");
    const charactersDetailsElement = document.querySelector("#details");


fetch('https://swapi.dev/api/people/')
.then(res => res.json())
.then(data => {

    const characters = data.results;

    characters.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person.name;
        listItem.addEventListener('click', () => showCharacterDetails(person));
        charactersListElement.appendChild(listItem);
    });

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
        
    }
})
.catch(error => console.log.error('Erro ao buscar dados:'));

});