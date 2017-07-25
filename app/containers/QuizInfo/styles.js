import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { Ul as ReadingsUl, Li, ReadingContent } from 'components/VocabEntryReadings/styles';
import { Heading as SynonymHeader, Wrapper as SynonymsWrapper, Ul as Synonyms } from 'components/VocabEntrySynonyms/styles';
import { Wrapper as Reading } from 'components/Reading/styles';
import { Wrapper as ReadingHeader } from 'components/ReadingHeader/styles';
import { Wrapper as RevealSentence } from 'components/RevealSentence/styles';

import { whiteLight, greyLight } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  z-index: 2; /* Stay above absolute Quiz Background Image */
  display: flex;
  flex-flow: column nowrap;
  flex: 1 0 100%;
`;

export const PanelsWrapper = styled.div`
  ${gutter({ prop: 'margin', position: 'horizontal' })}
  ${gutter({ prop: 'margin', position: 'bottom' })}
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  max-width: 2000px;
  background-color: ${whiteLight};
  flex: 1 0 100%;
  ${({ isDisabled }) => isDisabled && 'flex: 0 1 0px'}
`;

const dashedTopBorder = css`
  ${gutter({ prop: 'margin', position: 'top' })}
  ${gutter({ prop: 'padding', position: 'top', mod: 1.5 })}
  border-top: 2px dashed ${rgba(greyLight, 0.3)};
`;

export const PanelWrapper = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  justify-content: center;
  flex: 0 1 800px;

  &:last-of-type {
    ${gutter({ type: 'outer', position: 'bottom', mod: 3 })}
  }

  & ${SynonymsWrapper} {
    ${dashedTopBorder}
  }

  & ${Synonyms} {
    justify-content: center;
  }

  & ${ReadingsUl} {
    text-align: center;

    & ${Li} {
      align-items: center;
    }

    ${({ detailLevel }) => detailLevel < 1 && css`
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      & ${Li} {
        flex: 0 1 auto;
        ${gutter({ type: 'outer', position: 'horizontal', mod: 2 })}
      }
    `}

    ${({ detailLevel }) => detailLevel >= 1 && css`
      & ${Li}:not(:first-child) {
        ${dashedTopBorder}
      }
    `}
  }

  & ${ReadingContent} {
    align-items: center;
  }

  & ${ReadingHeader} {
    justify-content: center;
  }

  & ${Reading} {
    align-items: center;
  }

  & ${RevealSentence},
  & ${SynonymHeader} {
    align-self: center;
  }
`;
