import styled from 'react-emotion';

const StyledHome = styled('div')`
  background: teal;
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const StyledText = styled('p')`
  color: orange;
  font-size: 18px;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
`

export { StyledText, StyledHome };
