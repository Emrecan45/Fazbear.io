export default class CharacterProvider {
  // Récupère tous les personnages
  static fetchCharacters = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:3000/characters", options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.error("Erreur lors de la récupération des personnages :", err);
    }
  };

  // Récupère un  personnage grace a son id
  static getCharacter = async (id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`http://localhost:3000/characters/${id}`, options,
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.error("Erreur lors de la récupération du personnage :", err);
    }
  };
}
