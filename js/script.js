const PRIVATE_KEY = 'ed215109d48981d9f1febd916ab58e1b3c762fce';
const PUBLIC_KEY = 'ee0e90b9c927a7c7e69bb3e7754ba31f';

const HTMLcontent = document.querySelector('#app');

const getDataMarvelAPI = () => {
    const timestamp = Date.now();
    const hashAuth = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
    const API_URL = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hashAuth}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(element => {

                    renderElements(element);

                })
                .catch(element => console.log(element));
        });
}

const renderElements = e => {
    const imageMarvelHero = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const marvelHero = `
        <div class="hero-content">
            <h3>${e.name}</h3>
            <img src="${imageMarvelHero}" title="${e.name}" alt="${e.name}"> 
            <p>${e.description}</p>    
        </div>
    `;
    //HTMLcontent.appendChild(marvelHero);
    HTMLcontent.insertAdjacentHTML('beforeEnd', marvelHero);
};

getDataMarvelAPI();