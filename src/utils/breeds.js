export function camelCase(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export function formatBreedName(breed) {
  let name = breed.name.slice(0);
  name = camelCase(name);

  if (breed.parentBreed) {
    const parentBreed = breed.parentBreed.slice(0);
    name = `${name} (${camelCase(parentBreed)})`;
  }

  return name;
}

export function sortBreedsByFormattedName(breeds) {
  return breeds.sort((a, b) => {
    let toRet = 0;
    const nameA = formatBreedName(a);
    const nameB = formatBreedName(b);
    if (nameA < nameB) {
      toRet = -1;
    }
    if (nameA > nameB) {
      toRet = 1;
    }

    return toRet;
  });
}

export function filterByFormattedName(breeds, searchText = '') {
  return breeds.filter(breed =>
    formatBreedName(breed).toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
}
