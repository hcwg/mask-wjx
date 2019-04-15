import React from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  cursor: pointer;
  height: ${props => props.image ? 'auto' : '60vh'};
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  font-size: ${props => props.image ? 'auto' : '120%'};
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;

  &:hover {
    color: #aaaaaa;
    border-color: #cccccc;
  }

  &:focus {
    color: #2196f3;
    border-color: #2196f3;
  }
`;

export default function FileInput (props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: props.onDrop,
  });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject, ...props })}>
      <input {...getInputProps()} />

      <p>{ props.image
        ? 'Drag your photo here or click to change one'
        : 'Drag your photo here, or click to select one'
      }</p>
    </Container>
  );
}
