import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import WooftrLogoImg from './logo.png';

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 35px;
  height: 35px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-left: 4px;
  color: #222;
  font-family: Montserrat, Helvetica, sans-serif;
  font-weight: 900;
  color: #800080;
`;

export function Logo(props) {
  return (
    <LogoLink to="/">
      <LogoImg>
        <img src={WooftrLogoImg} alt="woofstr logo" />
      </LogoImg>
      <LogoText>woofstr</LogoText>
    </LogoLink>
  );
}
