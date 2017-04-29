import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Wrapper from 'layouts/Wrapper';
import Container from 'layouts/Container';
import P from 'base/P';
import Divider from '../index';

storiesOf('components.Divider', module)
  .add('single', () => <Divider />)
  .add('single with fade', () => <Divider fade />)
  .add('single with fade & color', () => <Divider fade color="purple" />)
  .add('single with fullWidth', () => <Divider fullWidth />)
  .add('single with fullWidth & fade', () => <Divider fullWidth fade />)
  .add('between paragraphs with fullWidth', () => (
    <Wrapper>
      <Container>
        <P align="center">Text center</P>
        <Divider fullWidth />
        <P align="left">Text left</P>
      </Container>
    </Wrapper>
  ));