import React, { useState } from "react";
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu } from 'react-icons/md';

import Toggle from "../Toggle";

import logoImg from '../../assets/logo.svg';

import { useTheme } from "../../hooks/theme";
import { useAuth } from "../../hooks/auth";

import { Container, Header, LogImg, MenuContainer, Title, MenuItemButton, ToggleMenu, ThemeToggleFooter } from './styles';
import { Link } from "react-router-dom";

const Aside: React.FC = () => {

   const { signOut } = useAuth();
   const { toggleTheme, theme } = useTheme();

   const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
   const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark');

   const handleToggleMenu = () => {
      setToggleMenuIsOpened(!toggleMenuIsOpened);
   }
   const handleChangeTheme = () => {
      setDarkTheme(!darkTheme);
      toggleTheme();
   }

   return (
      <Container menuIsOpen={toggleMenuIsOpened}>
         <Header>
            <ToggleMenu onClick={handleToggleMenu}>
               {toggleMenuIsOpened ? <MdClose/> : <MdMenu/>}
            </ToggleMenu>
            <LogImg src={logoImg} alt="Logo Minha Carteira"></LogImg>
            <Title>Minha Carteira</Title>
         </Header>

         <MenuContainer>
            <Link to="/">
               <MdDashboard />
               Dashboard
            </Link>

            <Link to="/list/entry-balance">
               <MdArrowUpward />
               Entradas
            </Link>

            <Link to="/list/exit-balance">
               <MdArrowDownward />
               Saidas
            </Link>

            <MenuItemButton onClick={signOut}>
               <MdExitToApp />
               Sair
            </MenuItemButton>
         </MenuContainer>

         <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
            <Toggle
               labelLeft="Light"
               labelRight="Dark"
               checked={darkTheme}
               onChange={handleChangeTheme}
            />
         </ThemeToggleFooter>
      </Container>
   )
}

export default Aside;