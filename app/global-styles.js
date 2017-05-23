import { injectGlobal } from 'styled-components';
import { white, greyDark, blackLight, purpleLight } from 'shared/styles/colors';
import { borderRadius } from 'shared/styles/sizing';
import { resetList } from 'shared/styles/utils';
import { media } from 'shared/styles/media';
import {
  ffBody,
  ffHeading,
  ffJapanese,
  epsilon,
  milli,
} from 'shared/styles/typography';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html {
    box-sizing: border-box;
    height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    ${epsilon}
    margin: 0;
    padding: 0;
    font-family: ${ffBody};
    color: ${blackLight};
    line-height: 1;
  }

  [lang="ja"],
  p[lang="ja"],
  span[lang="ja"] {
    font-family: ${ffJapanese};
    word-break: break-word;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  *:focus {
    outline: none;
    ${media('min').sm`
      outline: ${purpleLight} auto 3px;
    `}
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ffHeading};
    margin: 0;
    color: ${greyDark};
    line-height: 1.2;
  }

  p {
    line-height: 1.3;
    + p {
      margin-top: .4em;
    }
  }

  small {
    ${milli}
  }

  /* VocabChip tooltip styles */
  .vocab-tip.vocab-tip {
    ${epsilon}
    padding: .75em;
    border-radius: ${borderRadius};
  }

  .vocab-tip ul {
    ${resetList}
    color: ${white};
  }

  .vocab-tip li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      flex: 0 1 auto;
      padding: .2em;
    }

    /* left column category "JA", "RC" etc */
    span:first-child {
      font-size: .95em;
      color: ${greyDark};
      margin-right: .2em;
    }
  }

`;
