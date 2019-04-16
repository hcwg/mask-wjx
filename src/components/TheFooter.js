import React from 'react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Footer = styled.footer`
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #eeeeee;
  margin-top: 30px;
  a {
    text-decoration: none;
  }
`

export default function TheFooter () {
  return (
    <Footer>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        <span>Authors - </span>

        <Link href="https://github.com/comzyh" target="_blank" rel="noopener noreferrer" color="textSecondary">
          @comzyh
        </Link>

        <span> & </span>

        <Link href="https://github.com/meteorlxy" target="_blank" rel="noopener noreferrer" color="textSecondary">
          @meteorlxy
        </Link>
      </Typography>

      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        <span>Copyright &copy; </span>

        <Link href="https://github.com/hcwg" target="_blank" rel="noopener noreferrer" color="textSecondary">
          Happy Coding Wechat Group
        </Link>

        <span>. 2019</span>
      </Typography>
    </Footer>
  )
}
