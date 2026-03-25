import Utils from "./services/Utils.js";
import CharacterProvider from "./services/CharacterProvider.js";
import EquipmentProvider from "./services/EquipmentProvider.js";

function cacherToutesLesSections() {
  let sections = document.querySelectorAll(".section-page");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
}

async function afficherSectionAccueil() {
  cacherToutesLesSections();
  document.getElementById("accueil").style.display = "block";
  const personnages = await CharacterProvider.fetchCharacters();
}

async function afficherSectionInventaire() {
  cacherToutesLesSections();
  document.getElementById("inventaire").style.display = "block";
}

async function afficherSectionBoutique() {
  cacherToutesLesSections();
  document.getElementById("boutique").style.display = "block";
  const equipements = await EquipmentProvider.fetchEquipments();
}

async function afficherDetailPersonnage(id) {
  cacherToutesLesSections();
  // TODO: afficher la section de détail du personnage et charger les données du personnage avec l'id fourni
}

async function router() {
  const request = Utils.parseRequestURL();

  if (
    request.resource === "accueil" ||
    request.resource === "" ||
    !request.resource
  ) {
    await afficherSectionAccueil();
  } else if (request.resource === "inventaire") {
    await afficherSectionInventaire();
  } else if (request.resource === "boutique") {
    await afficherSectionBoutique();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
