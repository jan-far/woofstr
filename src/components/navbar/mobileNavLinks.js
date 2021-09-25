import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuToggle } from './menuToggle';
import { Link } from 'react-router-dom';

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 55px;
  left: 0;
  z-index: 100;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0.3em 1.6em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;

  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

const Marginer = styled.div`
  height: 2em;
`;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <LinkItem>
            <StyledLink to="/about">About</StyledLink>
          </LinkItem>
          <LinkItem>
            <StyledLink to="/contact">Contact</StyledLink>
          </LinkItem>
          <Marginer />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
