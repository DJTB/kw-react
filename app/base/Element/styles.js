import styled from 'styled-components';
import {
  alignContentMixin,
  alignItemsMixin,
  alignSelfMixin,
  flexCenterMixin,
  flexMixin,
  flexShorthandMixin,
  fullRowMixin,
  justifyContentMixin,
  textAlignMixin,
} from 'shared/styles/layout';

export const StyledElement = styled.div`
  ${fullRowMixin}
  ${flexMixin}
  ${flexCenterMixin}
  ${flexShorthandMixin}
  ${alignContentMixin}
  ${alignItemsMixin}
  ${alignSelfMixin}
  ${justifyContentMixin}
  ${textAlignMixin}
`;