export const colorArrayToObject = (color) => ({
  r: color[0],
  g: color[1],
  b: color[2],
  a: color[3],
})

export const colorObjectToArray = (color) => Uint8ClampedArray.from(Object.values(color))

export default {
  colorArrayToObject,
  colorObjectToArray,
}
