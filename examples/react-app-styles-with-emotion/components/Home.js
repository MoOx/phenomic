import React from 'react';
import { StyledHome, StyledText } from '../theme/styles';

const Home = ({tagline = 'Styled with emotion-js!'}) => (
  <StyledHome>
    <StyledText>{tagline}</StyledText>
  </StyledHome>
);

export default Home;
