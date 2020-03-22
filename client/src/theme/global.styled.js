import styled, { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

export const AppWrapper = styled.div`
  .App {
    background: ${props => {
      console.log(props);
      return props.theme ? props.theme : "#4c2a4c";
    }};
    margin: 20px auto;
    width: 90%;
    max-width: 700px;
    color: #eee;
  }
`;

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #553055;
}

.navbar{
  padding: 10px 20px;
  text-align: center;
  background: #6d3d6d
}
.navbar h1{
  margin: 10px 0;
}

.book-list{
  margin: 20px;
}
.book-list ul{
  padding: 0;
  list-style-type: none;
}
.book-list li{
  background: #6d3d6d;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  margin: 10px 0;
}
.book-list li:hover{
  opacity: 0.7;
  text-decoration: line-through;
}
.book-list .title{
  font-weight: bold;
  color: #fff;
  font-size: 1.2em;
}
.book-list .author{
  font-size: 0.9em;
  color: #ddd;
}
.empty{
  margin: 20px;
  text-align: center;
}

form{
  padding: 20px;
}
input[type='text']{
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin: 6px 0;

  border: 0;
}
input[type='submit']{
  margin: 10px auto;
  background: #eee;
  border: 0;
  padding: 6px 20px;
  display: block;
}`;
