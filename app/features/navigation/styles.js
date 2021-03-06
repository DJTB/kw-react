import styled from 'styled-components';

import { StyledLink as LogoLink } from 'common/components/LogoLink/styles';
import Container from 'common/components/Container';
import BackgroundImg from 'common/components/BackgroundImg';
import Ul from 'common/components/Ul';

import { gutter, centerByPadding } from 'common/styles/layout';
import { white, black } from 'common/styles/colors';
import { bottomLight } from 'common/styles/shadows';

export const Header = styled.header`
  ${centerByPadding}
  grid-area: Header;
  position: relative;
  background: linear-gradient(to bottom, ${white[5]}, ${white[2]});
  box-shadow: ${bottomLight};
`;

export const Nav = styled.nav`
  ${gutter({ position: 'horizontal', type: 'outer' })} /* logo adds enough height already */
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  & > ${LogoLink} {
    margin-right: .5em;
  }
`;

export const NavLinks = styled(Ul).attrs({
  plainList: true,
})`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const Footer = styled.footer`
  ${gutter({ position: 'top', mod: 4 })}
  ${gutter({ position: 'bottom', mod: 1 })}
  ${centerByPadding}
  position: relative;
  grid-area: Footer;
  margin-top: auto;
  background: linear-gradient(160deg, ${black[5]}, ${black[8]});
  color: ${white[7]};
`;

export const CrabigatorStencil = styled(BackgroundImg)`
  z-index: 1;
  opacity: 0.6;
  max-height: 95%;
`;

export const FooterLinks = styled(Container)`
  z-index: 2;
  margin-right: 50px;
`;

export const FooterLinkGroup = styled(Ul)`
  display: flex;
  flex-direction: column;
  & a {
    padding: 0 1rem 0.5rem;
  }
`;
