import React, { useContext } from "react";
import { StoreContext } from "../../contexts/StoreContext";
import {
  ButtonDark,
  ButtonOLED,
  ButtonLight,
  NavbarWrapper,
  ButtonDefault
} from "./Navbar.styled";
import { CHANGE_THEME } from "../../utils/constants/theme/Theme";
import { THEME_COLOR } from "../../utils/constants/constants";

const Navbar = () => {
  const { state, dispatch } = useContext(StoreContext);

  const changeColorTheme = theme => {
    console.log(theme);
    dispatch({ type: CHANGE_THEME, theme });
  };

  return (
    <NavbarWrapper>
      <div className="navbar">
        <h1>Ninja Reading List</h1>
        <div className="navbar__button-wrapper">
          <ButtonDark onClick={() => changeColorTheme(THEME_COLOR.DARK)}>
            {" "}
            Dark{" "}
          </ButtonDark>
          <ButtonOLED onClick={() => changeColorTheme(THEME_COLOR.OLED)}>
            {" "}
            OLED{" "}
          </ButtonOLED>
          <ButtonLight onClick={() => changeColorTheme(THEME_COLOR.LIGHT)}>
            {" "}
            Light{" "}
          </ButtonLight>
          <ButtonDefault onClick={() => changeColorTheme(THEME_COLOR.DEFAULT)}>
            {" "}
            Default{" "}
          </ButtonDefault>
        </div>
        {/* <p>Currently you have {books.length} books to get through...</p> */}
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
