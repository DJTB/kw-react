import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

import { white } from 'common/styles/colors';
import BackgroundImg from 'common/components/BackgroundImg';
import { Meanings } from 'features/quiz/QuizSession/QuizQuestion/styles';
// match review background image svg color
export const backgroundImageColor = '#e5e5e5';

export const Upper = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 30vh;
  color: ${white[3]};

  ${({ bgColor }) => css`
    background-color: ${bgColor};
    background-image: linear-gradient(180deg, ${lighten(0.01, bgColor)}, ${darken(0.02, bgColor)});
    background-repeat: repeat-x;
  `}

  & ${Meanings} {
    text-shadow: 0 0.1em 1em ${({ bgColor }) => darken(0.1, bgColor)};
  }
`;

export const Lower = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background-color: ${backgroundImageColor};
`;

export const Background = styled(BackgroundImg)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  min-height: auto;
  max-height: 25vmax;
  margin-top: auto;
  opacity: .9;
  z-index: 0;
  background-position: bottom right;
`;
