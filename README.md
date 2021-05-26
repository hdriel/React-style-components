# Getting Started

This project was I learned from  [Udemy - React styled components v5 (2021 edition)](https://www.udemy.com/course/react-styled-components/).

## Available Scripts

In the project directory, you can run: (`npm install`)

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### What I've learned:

* Absolute imports: 🤯 <br>
    Use import from absolute the src directory, in any nested directory for example:
    ```jsx
    // ./src/components/common/Input.jsx
    import { Input } from 'components/common/Input'; // React-style-components/src/components/common/PasswordInput.jsx
    import { Input, PasswordInput, Button, Spinner } from 'components/common/Input'; // React-style-components/src/screens/Login.jsx
    ```

    By define the `jsconfig.json` in root directory (sibling of `package.json` file)
    ```json
    {
        "compilerOptions": {
            "baseUrl": "src"
        },
        "include": ["src"]
    }
    ```
<br>

* Adding global styles using createGlobalStyle: <br>
  
  ```jsx
    // at: ./src/components/common/GlobalStyle.jsx
    import { createGlobalStyle } from 'styled-components';
    
    export const GlobalStyle = createGlobalStyle`
      body {
        background: ${p => p.theme.bodyBackgroundColor};
        height: 100vh;
        margin: 0;
        color: ${p => p.theme.bodyFontColor};     
      }
    `;
  
    ...
    <GlobalStyle />
    <Router>
  ```  

<br>
  
* Conditional styles based on props: <br>
  ```css
    font-weight: ${p => p.isActive ? 'bold': 'normal'};
  ```
  
<br>
  
* Bulk styles using the styled-components "css" helper: <br>
  And interpolating functions to clean up style logic: <br>
  ```jsx
    import styled, {css} from 'styled-components';
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
      ${largeStyles}
    `
  ```  

<br>

* Media queries using styled components: <br>

  ```jsx
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
  ```

<br>

* inheritance styled components from another (styled) components: <br>

  ```jsx
    // at ./src/components/base/Header.jsx
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
  ```

<br>

* defined attributes on style components with attrs: <br>

  ```jsx
    export const Input = styled.input`
      padding: 4px 8px;
      font-size: 1em;
      border: 1px solid #CCC;
      border-radius: 4px;
      margin-bottom: 8px;
      font-family: sans-serif;
      width: 100%;
      box-sizing: border-box;
      height: 40px;
    `;
  
    const PasswordInputStyled = styled(Input)
    .attrs(() => ({
        type: 'password',
        placeholder: 'Password'
    }))`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `;
  ```

<br>

* Referencing a styled component within another styled component <br> 
  also use SCSS/SASS inside style component.  

  ```jsx
  const Form = styled.form`
      width: 100%;
      max-width: 400px;
      background: white;
      border: 3px solid #EEE;
      padding: 16px;
      box-sizing: border-box;
      color: black;
    
      .alt-text{
        text-align: center;
        margin: 10px 0;
      }
    
      > ${Button}:first-of-type {
          margin-top: 40px;
      }
    
      > ${Input} {
        margin-top: 20px;
      }
  `;
  ```

<br>

* Animation with styled components by using keyframes: <br>

  ```jsx
    import styled, {keyframes} from 'styled-components';
    
    const rotation = keyframes`
      from {
          transform: rotate(0deg);
      }  
      to {
         transform: rotate(360deg);
      }
    `;
    
    export const Spinner = styled.div`
      height: 30px;
      width: 30px;
      border: 1px solid #F8049C;
      border-radius: 50%;
      border-top: none;
      border-right: none;
      margin: 16px auto;
      animation: ${rotation} 1s linear infinite;
    `;
  ```

<br>

* Multi Themes: <br>

  Initialization theme provider and multi theme variables 
  
  ```jsx
      // at: .src/screens/index.jsx
      import { ThemeProvider } from "styled-components";
      ...
      // light theme
      const LightTheme = {
        id: 'light',
        primaryColor: '#F8049C',
        secondaryColor: '#FDD54F',
        bodyBackgroundColor: 'white',
        bodyFontColor: 'black'
      };
  
      // dark theme
      const DarkTheme = {
        id: 'dark',
        primaryColor: 'black',
        secondaryColor: 'midnightblue',
        bodyBackgroundColor: 'black',
        bodyFontColor: 'white',
      }
      ...
      const [theme, setTheme] = useState(LightTheme);
      
      <ThemeProvider
          theme={{
            ...theme,
            setTheme: () => setTheme(t => t.id === 'light' ? DarkTheme : LightTheme)
          }}
      >
      ...
  ```

  Usage theme variables, and change theme trigger in components
  
  ```jsx
      // at: .src/components/base/Header.jsx
      import React, { useState, useContext } from 'react';
      import styled, { ThemeContext } from 'styled-components';
      
      ...
      const {id: themeId, setTheme} = useContext(ThemeContext);
      <Toggle isActive={themeId === 'dark'} onToggle={setTheme}/>
  ```

  Usage theme variables in styles  
  
  ```jsx
      // at: .src/components/base/Button.jsx
      const Button = styled.button`
        color: white;
        background: ${p => p.secondary ? p.theme.secondaryColor : p.theme.primaryColor};     
      `;
  ```
  
  <br> 

* PropTypes to defined props to style component: 

  ```jsx 
    const Button = styled.button`
      color: white;
      ...          
    `;
    
    // See more types and docs in: https://github.com/facebook/prop-types
    Button.propTypes = {
        large: PropTypes.bool,
        secondary: PropTypes.bool
    }
  ```

<br>
<br>
<hr>

### Screenshots

![home](./screenshots/home.png)
![login-dark](./screenshots/login-dark.png)
![home-dark](./screenshots/home-dark.png)
![login-mobile](./screenshots/login-mobile.png)
![spinner](./screenshots/spinner.png)
![home-mobile-nav](./screenshots/home-mobile-nav.png)
