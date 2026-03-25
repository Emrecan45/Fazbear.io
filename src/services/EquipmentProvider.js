import Equipment from "../models/Equipment.js";

export default class EquipmentProvider {
  static async fetchEquipments() {
    try {
      const response = await fetch("http://localhost:3000/equipment");
      const json = await response.json();

      const tableauObjets = [];
      for (let i = 0; i < json.length; i++) {
        const item = json[i];
        const nouvelEquipement = new Equipment(
          item.id,
          item.name,
          item.bonusStat,
          item.rarete,
        );
        tableauObjets.push(nouvelEquipement);
      }

      return tableauObjets;
    } catch (err) {
      console.error("Erreur EquipmentProvider :", err);
      return [];
    }
  }
}
