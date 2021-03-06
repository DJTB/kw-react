import React from 'react';
import PropTypes from 'prop-types';

import { black } from 'common/styles/colors';

const BarLabel = ({ x, y, width, value }) =>
  value > 0 ? (
    <text x={x} y={y} dy={-4} dx={width / 2} fill={black[2]} fontSize=".8rem" textAnchor="middle">
      {value}
    </text>
  ) : null;

/* eslint-disable react/require-default-props */
BarLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  value: PropTypes.number,
};

export default BarLabel;
