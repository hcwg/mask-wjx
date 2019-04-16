import React from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {
  colorArrayToObject,
  colorObjectToArray,
} from '../lib/util'

const Picker = styled(SketchPicker)`
  margin: auto;
`

export default function ColorPicker (props) {
  return (
    <React.Fragment>
      <Grid item xs={12} md={6}>
        <p>Source Color</p>

        <Picker
          color={ colorArrayToObject(props.colorSource) }
          onChangeComplete ={ color => { props.onColorSourceChange(colorObjectToArray(color.rgb))} }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <p>Target Color</p>

        <Picker
          color={ colorArrayToObject(props.colorTarget) }
          onChangeComplete ={ color => props.onColorTargetChange(colorObjectToArray(color.rgb)) }
        />
      </Grid>
    </React.Fragment>
  )
}
