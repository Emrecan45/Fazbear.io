import CharacterProvider from "../services/CharacterProvider.js";

export default class CharacterAll{
    async render(){
    let characters = await CharacterProvider.fetchCharacters(50);
    console.log("tout rendre");
    console.log(characters);
    let view = /*html*/`
            <h2 class="mb-4">Tous les Personnages</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                ${ characters.map(character => 
                    /*html*/`
                    <div class="col">
                        <div class="card shadow-sm h-100">
                            <img class="bd-placeholder-img card-img-top" style="object-fit: cover; height: 250px;" data-src="${character.image}" alt="${character.name}" />
                            
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-uppercase fw-bold">${character.name}</h5>
                                <h6 class="card-subtitle mb-3 text-muted">${character.title}</h6>
                                <p class="card-text">${character.description}</p>
                                
                                <div class="mt-auto">
                                    <div class="d-flex justify-content-between mb-3 border-top pt-2">
                                        <small class="text-danger" title="Force">⚔️ ${character.stats.force}</small>
                                        <small class="text-success" title="Agilité">🍃 ${character.stats.agilite}</small>
                                        <small class="text-info" title="Intelligence">🔮 ${character.stats.intelligence}</small>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <a href="#/characters/${character.id}" class="btn btn-sm btn-outline-primary">Voir le profil</a>
                                        </div>
                                        <small class="text-warning fw-bold fs-6">
                                            ${character.note} <i class="bi bi-star-fill"></i>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                ).join('\n ')}
            </div>
        `;
        return view;
    }

    //faire en sorte d'etre en lazy loading
    async after_render(){
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        };

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.target.src === '' && entry.intersectionRatio === 1){
                    entry.target.src = entry.target.dataset.src;
                }
            })
        }, options);

        let collections = document.querySelectorAll('img.card-img-top');
        collections.forEach((entry) => {
            observer.observe(entry);
        })

    }

}