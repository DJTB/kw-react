import React from 'react';
import PropTypes from 'prop-types';

import { StyledContainer } from './styles';

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  withPadding: PropTypes.bool,
  marginTop: PropTypes.string,
  alignContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignSelf: PropTypes.string,
  flex: PropTypes.string,
  flexCenter: PropTypes.bool,
  flexColumn: PropTypes.bool,
  flexRow: PropTypes.bool,
  flexWrap: PropTypes.bool,
  justifyContent: PropTypes.string,
  textAlign: PropTypes.string,
};

Container.defaultProps = {
  withPadding: true,
  marginTop: '',
  alignContent: '',
  alignItems: '',
  alignSelf: '',
  flex: '',
  flexCenter: false,
  flexColumn: false,
  flexDisplay: '', // defaults to 'flex', alternative is to pass 'inline-flex'
  flexRow: false,
  flexWrap: false,
  justifyContent: '',
  textAlign: '',
};

function Container({ children, ...props }) {
  return <StyledContainer {...props}>{children}</StyledContainer>;
}

export default Container;
