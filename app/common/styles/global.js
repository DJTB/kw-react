import { injectGlobal } from 'styled-components';
import { black, white } from 'common/styles/colors';

import { ffBody, ffHeading, ffJapanese, epsilon, milli } from 'common/styles/typography';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    box-sizing: border-box;
    height: 100%;
    max-width: 100vw;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    ${epsilon}
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: ${ffBody};
    color: ${black[4]};
    background-color: ${white[2]};
    line-height: 1;
    display: flex;
    flex-direction: column;
  }

  [lang="ja"],
  p[lang="ja"],
  span[lang="ja"] {
    font-family: ${ffJapanese} !important;
    word-break: break-word;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  #app {
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
  }

  *:focus {
    outline: none;
  }

  /* inputs already have fancy focus states */
  .user-is-tabbing :not(input):focus {
    z-index: 10;
    opacity: 1;
    transition: outline 0s;
    outline: .15rem solid;
    outline-offset: .15rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    line-height: 1.2;
  }

  a,
  button {
    cursor: pointer;
  }

  p {
    line-height: 1.3;
    margin: 0;
    + p {
      margin-top: .4em;
    }
  }

  small {
    ${milli}
  }
`;
