function getImageUrl(name: string) {
  return new URL(`/src/assets/${name}.png`, import.meta.url).href
}

export { getImageUrl }
