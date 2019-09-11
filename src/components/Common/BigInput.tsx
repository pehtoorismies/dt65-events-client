import styled from '@emotion/styled';
// import { colors } from '../../util/themeAx';
const BigInput = styled.input`
  width: 100%;
  height: ${props => props.size}px;
  padding: 5px;
  border: 0;
  color: red;
  background: none;
  outline: none;
  color: #2c1917;

  font-size: ${props => props.size}px;
  font-family: 'Titillium Web', 'sans serif';
  font-weight: bold;
  text-align: center;
  &:focus {
  }
  ::placeholder {
    font-weight: bold;
  }
`;

// const BigInput = styled.input`
//   width: 100%;
//   height: ${props => props.size}px;
//   padding: 5px;
//   border: 0;
//   /* border-bottom: 2px solid ${colors('lightgray')}; */
//   background: none;
//   outline: none;
//   color: #2c1917;
//   caret-color: ${colors('pink')};
//   font-size: ${props => props.size}px;
//   font-family: 'Titillium Web', 'sans serif';
//   font-weight: bold;
//   text-align: center;
//   &:focus {
//     /* border-bottom: 2px solid ${colors('lightgray')}; */
//   }
//   ::placeholder {
//     font-weight: bold;
//     color: ${colors('lightergrey')};
//   }
// `;

BigInput.defaultProps = {
  size: 30,
};

export default BigInput;
