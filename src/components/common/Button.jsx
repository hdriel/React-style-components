import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

const largeStyles = ({large}) => {
    if(large){
      return css`
        padding: 10px;
        border-radius: 5px;
        font-size: 1.5em;
      `;
    }

    return css`
      padding: 8px;
      border-radius: 4px;
      font-size: 1em; 
    `
};

const Button = styled.button`
  color: white;
  background: ${p => p.secondary ? p.theme.secondaryColor : p.theme.primaryColor};
  font-weight: bold;
  box-shadow: none;
  border: none;
  width: 100%;
  display: block;
  // white-space: none;
  ${largeStyles}
  
  &:disabled {
    background: #EEE;
    color: #666;
  }
`;

// See more types and docs in: https://github.com/facebook/prop-types
Button.propTypes = {
    large: PropTypes.bool,
    secondary: PropTypes.bool
}

export { Button }
