export default function mask (imageData, colorSource, colorTarget) {
  const data = imageData.data
  const max = colorSource.indexOf(Math.max(...colorSource.slice(0, 3)))
  const min = colorSource.indexOf(Math.min(...colorSource.slice(0, 3)))

  for (let i = 0; i < data.length; i += 4) {
    const m = (data[i + max] - data[i + min]) * 1.0 / (colorSource[max] - colorSource[min])
    if (m < 0) continue

    data[i] += (255 - data[i]) * m
    data[i + 1] += (255 - data[i + 1]) * m
    data[i + 2] += (255 - data[i + 2]) * m
  }

  return imageData
}
