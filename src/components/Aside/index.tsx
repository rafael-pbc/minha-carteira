import React, { useState } from "react";
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu } from 'react-icons/md';

import logoImg from '../../assets/logo.svg';

import { useAuth } from "../../hooks/auth";

import { Container, Header, LogImg, MenuContainer, Title, MenuItemButton, ToggleMenu } from './styles';
import { Link } from "react-router-dom";

const Aside: React.FC = () => {

   const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

   const { signOut } = useAuth();

   const handleToggleMenu = () => {
      setToggleMenuIsOpened(!toggleMenuIsOpened);
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
      </Container>
   )
}

export default Aside;