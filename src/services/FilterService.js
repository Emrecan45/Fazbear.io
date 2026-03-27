let modeVue = 'characters';

export default class FilterService {
  static init(onChange, mode) {
    if (mode) modeVue = mode;

    let filters = FilterService.loadFilters(modeVue);
    FilterService.setFilters(filters);

    function update() {
      let filter = FilterService.getFilters();
      FilterService.saveFilters(modeVue, filter);
      onChange();
    }

    document.getElementById("searchInput").oninput = update;
    document.getElementById("rareteFilter").onchange = update;
    document.getElementById("noteFilter").onchange = update;
    document.getElementById("favorisFilter").onchange = update;

    let resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) {
      resetBtn.onclick = function() {
        FilterService.setFilters({ search: "", rarete: "", note: "", favoris: false, favorisList: [] });
        update();
      };
    }
  }

  static setMode(mode) {
    modeVue = mode;
  }

  static loadFilters(mode) {
    let key;
    if (mode === 'equipment') {
      key = 'equipmentFilters';
    } else {
      key = 'characterFilters';
    }

    let str = localStorage.getItem(key);
    if (str !== null) {
      return JSON.parse(str);
    }
    return { search: "", rarete: "", note: "", favoris: false, favorisList: [] };
  }

  static saveFilters(mode, filters) {
    let key;
    if (mode === 'equipment') {
      key = 'equipmentFilters';
    } else {
      key = 'characterFilters';
    }
    localStorage.setItem(key, JSON.stringify(filters));
  }

  static getFilters() {
    const search = document.getElementById("searchInput").value;
    const rarete = document.getElementById("rareteFilter").value;
    const note = document.getElementById("noteFilter").value;
    const favoris = document.getElementById("favorisFilter").checked;

    const favorisList = JSON.parse(localStorage.getItem("favorisPersonnages")) || []; // Recuperer la liste des favoris depuis le localStorage ou alor un tableau vide si elle n'existe pas

    return { search: search, rarete: rarete, note: note, favoris: favoris, favorisList: favorisList };
  }

  static setFilters(filters) {
    document.getElementById("searchInput").value = filters.search;
    document.getElementById("rareteFilter").value = filters.rarete;
    document.getElementById("noteFilter").value = filters.note;
    document.getElementById("favorisFilter").checked = filters.favoris;
  }
}
