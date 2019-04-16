export const colorArrayToObject = (color) => ({
  r: color[0],
  g: color[1],
  b: color[2],
  a: color[3] / 255,
})

export const colorObjectToArray = (color) => Uint8ClampedArray.from([
  color['r'],
  color['g'],
  color['b'],
  color['a'] * 255,
])

export default {
  colorArrayToObject,
  colorObjectToArray,
}
