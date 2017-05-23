import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'utils/tests/testTables';
import { TYPES } from '../constants';
import SummarySection from '../index';

Object.keys(TYPES).forEach((type) => {
  storiesOf('components.SummarySection', module)
    .add(`SummarySection with empty items and type={${type}}`, () => (
      <SummarySection type={type} items={[]} />
    ))
    .add(`SummarySection with type={${type}}`, () => (
      <SummarySection type={type} items={vocabs} />
    ))
    .add(`SummarySection with isExpanded={true} and type={${type}}`, () => (
      <SummarySection isExpanded type={type} items={vocabs} />
    ));
});
