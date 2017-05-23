import styled from 'styled-components';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

export const Ul = styled.ul`
  ${resetList}
  ${gutter({ type: 'outer' })}
`;
