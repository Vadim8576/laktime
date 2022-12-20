import React from 'react';
import MainMenu from './mainMenu';
import {useState} from 'react';
import HeaderAppBar from './headerAppBar';


// interface HeaderProps {
// 	auth: boolean
// }

const Header: React.FC<any> = ({ props }: any) => {

  const [menuState, setMenuState] = useState<boolean>(false);

  return (
    <>
      <HeaderAppBar setMenuState={setMenuState} />
      <MainMenu setMenuState={setMenuState} menuState={menuState} />
    </>
  )
}


export default Header;