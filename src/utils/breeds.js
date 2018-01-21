function camelCase(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export default function formatBreedName(breed) {
  let name = breed.name.slice(0);
  name = camelCase(name);

  if (breed.parentBreed) {
    const parentBreed = breed.parentBreed.slice(0);
    name = `${name} (${camelCase(parentBreed)})`;
  }

  return name;
}
