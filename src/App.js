import React, { Component } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FileInput from './components/FileInput';
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';

const RootGrid = styled(Grid)`
  text-align: center;

  .canvas {
    margin: 10px;
  }

  .canvas.source {
    cursor: pointer;
  }
`

const ColorPicker = styled(SketchPicker)`
  margin: auto;
`

const normalizeColor = color => {
  if (ArrayBuffer.isView(color)) {
    return color;
  } else {
    return [
      color.r,
      color.g,
      color.b,
      color.a,
    ]
  }
}

const colorToRGB = color => {
  return {
    r: color[0],
    g: color[1],
    b: color[2],
    z: color[3],
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceColor: [0, 0, 0, 0],
      targetColor: [0, 0, 0, 0],
      img: null,
      width: 0,
      height: 0,
    };
    this.canvasSource = React.createRef();
    this.canvasTarget = React.createRef();
  }

  componentDidMount () {
    this.contextBefore = this.canvasSource.current.getContext('2d');
    this.contextAfter = this.canvasTarget.current.getContext('2d');
    this.canvasSource.current.addEventListener('click', (e) => {
      const x = e.layerX;
      const y = e.layerY;
      this.setSourceColor(this.contextBefore.getImageData(x, y, 1, 1).data);
    })
  }

  setSourceColor (color) {
    this.setState({ sourceColor: normalizeColor(color) });
  }

  setTargetColor (color) {
    this.setState({ targetColor: normalizeColor(color) });
  }

  handleImageChange (file) {
    if (file.type.match(/image.*/)) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const width = 400
          const height = img.height * width / img.width
          this.canvasSource.current.setAttribute('width', width)
          this.canvasSource.current.setAttribute('height', height)
          this.canvasTarget.current.setAttribute('width', width)
          this.canvasTarget.current.setAttribute('height', height)
          this.contextBefore.drawImage(img, 0, 0, width, height);
          this.contextAfter.drawImage(img, 0, 0, width, height);
          this.setSourceColor(this.contextBefore.getImageData(0, 0, 1, 1).data);
          this.setState({
            img,
            width,
            height,
          });
        }
      }

      reader.readAsDataURL(file);
    } else {
      // file type error
    }
  }

  handleMask () {
    const imageData = this.contextBefore.getImageData(0, 0, this.state.width, this.state.height)
    const removeColor = this.state.sourceColor
    const max = removeColor.indexOf(Math.max(...removeColor.slice(0, 3)))
    const min = removeColor.indexOf(Math.min(...removeColor.slice(0, 3)))

    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const m = (data[i + max] - data[i + min]) * 1.0 / (removeColor[max] - removeColor[min])
      if (m < 0) continue

      data[i] += (255 - data[i]) * m
      data[i + 1] += (255 - data[i + 1]) * m
      data[i + 2] += (255 - data[i + 2]) * m
    }

    this.contextAfter.putImageData(imageData, 0, 0)
  }

  render() {
    return (
      <RootGrid container>
        <Grid item xs={12}>
          <TheHeader />
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item md={3} lg={2} />

            <Grid item md={6} lg={8}>
              <Grid container>
                {/* File input */}
                <Grid item xs={12}>
                  <FileInput
                    onDrop={files => this.handleImageChange(files[0])}
                    image={this.state.img}
                  />
                </Grid>
                {/* File input */}

                <Grid item xs={12} style={this.state.img ? {} : { display: 'none' }}>
                  <Grid container>
                    {/* Image Viewer */}
                    <Grid item xs={12} lg={6}>
                      <canvas
                        ref={this.canvasSource}
                        className="canvas source"
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <canvas
                        ref={this.canvasTarget}
                        className="canvas target"
                      />
                    </Grid>
                    {/* Image Viewer */}

                    {/* Color Picker */}
                    <Grid item xs={12} md={6}>
                      <p>Source Color</p>

                      <ColorPicker
                        color={ colorToRGB(this.state.sourceColor) }
                        onChangeComplete ={ color => { this.setSourceColor(color.rgb)} }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <p>Target Color</p>

                      <ColorPicker
                        color={ colorToRGB(this.state.targetColor) }
                        onChangeComplete ={ color => this.setTargetColor(color.rgb) }
                      />
                    </Grid>
                    {/* Color Picker */}

                    {/* Mask */}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={e => this.handleMask(e)}
                      >
                        Mask
                      </Button>
                    </Grid>
                    {/* Mask */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={3} lg={2} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TheFooter />
        </Grid>
      </RootGrid>
    );
  }
}

export default App;
