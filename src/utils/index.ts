function getImageUrl(name: string) {
  return new URL(`/src/assets/${name}.png`, import.meta.url).href // 这部/src/assets/ 不能使用变量
}

export { getImageUrl }
