import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from 'shared/styles/colors';

import { Wrapper, LinkBlock, Left, Right, InboxIcon, Count } from './styles';

SessionLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  count: PropTypes.number,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  isDisabled: PropTypes.bool,
};

SessionLink.defaultProps = {
  count: 0,
  color: 'blue',
  isDisabled: false,
};

function SessionLink({ text, to, count, color, isDisabled }) {
  return (
    <Wrapper>
      <LinkBlock plainLink isDisabled={isDisabled} bgColor={color} to={to}>
        <Left>{text}</Left>
        <Right title="Remaining reviews">
          <InboxIcon inline={false} name="ASSIGNMENT_INBOX" color="white" size="1.2em" />
          <Count>{count}</Count>
        </Right>
      </LinkBlock>
    </Wrapper>
  );
}

export default SessionLink;
