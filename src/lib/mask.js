export default function mask (imageData, colorSource, colorTarget, tolerance = 0) {
  const imageDataMask = new ImageData(imageData.width, imageData.height)
  const dataSource = imageData.data
  const dataTarget = imageDataMask.data
  const max = colorSource.indexOf(Math.max(...colorSource.slice(0, 3)))
  const min = colorSource.indexOf(Math.min(...colorSource.slice(0, 3)))

  for (let i = 0; i < dataSource.length; i += 4) {
    let m = (dataSource[i + max] - dataSource[i + min]) / (colorSource[max] - colorSource[min]) * (1 + tolerance)
    if (m < 0) m = 0
    if (m > 1) m = 1

    dataTarget[i] = dataSource[i] + (colorTarget[0] - dataSource[i]) * m
    dataTarget[i + 1] = dataSource[i + 1] + (colorTarget[1]  - dataSource[i + 1]) * m
    dataTarget[i + 2] = dataSource[i + 2] + (colorTarget[2]  - dataSource[i + 2]) * m
    dataTarget[i + 3] = dataSource[i + 3]
  }

  return imageDataMask
}
