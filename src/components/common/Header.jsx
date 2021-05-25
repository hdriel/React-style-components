import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Toggle } from 'components/common';
import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom';

export function Header (props) {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const {id: themeId, setTheme} = useContext(ThemeContext);

    return (
        <HeaderWrapper>
            <HeaderTitle>
                React Style-Components v5
            </HeaderTitle>
            <MobileMenuIcon onClick={() => setMenuOpen(val => !val)}>
                <div />
                <div />
                <div />
            </MobileMenuIcon>
            <Menu open={menuOpen}>
                <StyledLink to="/" isActive={pathname === '/'}>
                    Home
                </StyledLink>

                <StyledLink to="/login" isActive={pathname === '/login'}>
                    Login
                </StyledLink>

                <Toggle isActive={themeId === 'dark'} onToggle={setTheme}/>
            </Menu>
        </HeaderWrapper>
    )
}

const HeaderTitle = styled.span`
    color: ${p => p.theme.bodyFontColor};
    font-size: 1.8em;
    margin: auto auto auto 0;
`;

const HeaderWrapper = styled.header`
    height: 60px;
    width: 100%;;
    box-sizing: border-box;
    display: flex;
    padding: 0 16px;
    position: fixed;
    top: 0;
    background-image: linear-gradient(to right, ${p => p.theme.primaryColor}, ${p => p.theme.secondaryColor});
    border-bottom: 3px solid ${p => p.theme.secondaryColor};
`;

const Menu = styled.nav`
    display: ${p => p.open ? 'block' : 'none'}; // default on mobile design will be a dropdown list
    font-family: sans-serif;
    position: absolute;
    width: 100%;
    top: 60px;
    left: 0;
    padding: 8px;
    box-sizing: border-box; 
    border-bottom: 3px solid #FDD54F;
    background: ${p => p.theme.bodyBackgroundColor};
  
    @media(min-width: 768px){
        display: flex;
        background: none;
        left: initial;
        top: initial;
        margin: auto 0 auto auto;
        border-bottom: none;
        position: relative;
        width: initial;
    }
`;

// Styling normal React components + extending existing styled component styles
// We can't pass isActive to Link of react-router-dom because is not a valid attribute in react component
// So We name Link's react-router-dom as ReactRouterDomLink,
// then create out Link component that return same component of Link with all props and children,
// But ignore from the isActive props filed,
// and we have access to this attribute in the styled-component hierarchies of styled(Link)``;
const Link = ({isActive, children, ...props}) => (<ReactRouterDomLink {...props}> { children } </ReactRouterDomLink>);

const StyledLink = styled(Link)`
    padding: 4px 8px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    margin: auto 0;
    color: ${p => p.theme.bodyFontColor};
  
    font-weight: ${p => p.isActive ? 'bold': 'normal'};
`;


const MobileMenuIcon = styled.div`
    margin: auto 0 auto auto;
    width: 25px;
    min-width: 25px;
    padding: 5px;
  
    >div {
      height: 3px;
      background: ${p => p.theme.bodyFontColor};
      margin: 5px 0;
      width: 100%;
    }
  
  @media(min-width: 768px){
    display: none;
  }
`;
