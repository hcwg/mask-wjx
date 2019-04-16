import React, { Component } from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import FileInput from './components/FileInput';
import ColorPicker from './components/ColorPicker';
import mask from './lib/mask'

const RootGrid = styled(Grid)`
  text-align: center;
  .canvas {
    margin: 10px;
    max-width: calc(100% - 20px);
    &.source {
      cursor: crosshair;
    }
  }
`

const TolerancePicker = styled(Slider)`
  padding: 20px;
  margin: auto;
  max-width: 200px;
`

const StyledButton = styled(Button)`
  margin: 10px;
`

const DownloadIcon = styled(CloudDownloadIcon)`
  margin-left: 10px;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      img: null,
      width: 0,
      height: 0,
      colorSource: Uint8ClampedArray.from([0, 0, 0, 255]),
      colorTarget: Uint8ClampedArray.from([255, 255, 255, 255]),
      tolerance: 0,
    };
    this.canvasSource = React.createRef();
    this.canvasTarget = React.createRef();
  }

  componentDidMount () {
    this.contextSource = this.canvasSource.current.getContext('2d');
    this.contextTarget = this.canvasTarget.current.getContext('2d');
    this.canvasSource.current.addEventListener('click', (e) => {
      const x = e.layerX;
      const y = e.layerY;
      this.setState({ colorSource: this.contextSource.getImageData(x, y, 1, 1).data });
    })
  }

  handleImageChange (file) {
    if (file.type.match(/image.*/)) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const width = img.width
          const height = img.height
          this.canvasSource.current.setAttribute('width', width)
          this.canvasSource.current.setAttribute('height', height)
          this.canvasTarget.current.setAttribute('width', width)
          this.canvasTarget.current.setAttribute('height', height)
          this.contextSource.drawImage(img, 0, 0, width, height);
          this.contextTarget.drawImage(img, 0, 0, width, height);
          const colorSource = this.contextSource.getImageData(0, 0, 1, 1).data
          this.setState({ file, img, width, height, colorSource });
        }
      }

      reader.readAsDataURL(file);
    } else {
      // file type error
    }
  }

  handleMask () {
    const imageData = this.contextSource.getImageData(0, 0, this.state.width, this.state.height);
    const imageDataMask = mask(imageData, this.state.colorSource, this.state.colorTarget, this.state.tolerance);
    this.contextTarget.putImageData(imageDataMask, 0, 0);
  }

  handleDownload () {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.canvasTarget.current.toDataURL(this.state.file.type)
    downloadLink.download = `mask_${this.state.file.name}`;
    const clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click')
    downloadLink.dispatchEvent(clickEvent)
  }

  render() {
    return (
      <RootGrid container>
        <CssBaseline />

        <Grid item xs={12}>
          <TheHeader />
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item lg={1} xl={2} />

            <Grid item xs={12} lg={10} xl={8}>
              <Grid container>
                {/* File input */}
                <Grid item xs={12}>
                  <FileInput
                    dropHandler={files => this.handleImageChange(files[0])}
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
                    <ColorPicker
                      colorSource={this.state.colorSource}
                      colorTarget={this.state.colorTarget}
                      onColorSourceChange={color => this.setState({ colorSource: color })}
                      onColorTargetChange={color => this.setState({ colorTarget: color })}
                    />
                    {/* Color Picker */}

                    {/* Parameters */}
                    <Grid item xs={12}>
                      <p>Color Tolerance: {this.state.tolerance * 100}%</p>

                      <TolerancePicker
                        value={this.state.tolerance * 100}
                        min={0}
                        max={100}
                        step={5}
                        onChange={(e, v) => this.setState({ tolerance: v / 100 })}
                      />
                    </Grid>
                    {/* Parameters */}

                    {/* Mask */}
                    <Grid item xs={12}>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={e => this.handleMask(e)}
                      >
                        Mask
                      </StyledButton>
                    </Grid>
                    {/* Mask */}

                    {/* Download */}
                    <Grid item xs={12}>
                      <StyledButton
                        variant="text"
                        color="default"
                        size="large"
                        onClick={e => this.handleDownload(e)}
                      >
                        Download
                        <DownloadIcon/>
                      </StyledButton>
                    </Grid>
                    {/* Download */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={1} xl={2} />
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
