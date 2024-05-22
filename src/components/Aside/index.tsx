import React from "react";
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp} from 'react-icons/md'

import logoImg from '../../assets/logo.svg'

import { Container, Header, LogImg, MenuContainer, Title } from './styles'
import { Link } from "react-router-dom";

const Aside: React.FC = () => {
   return (
      <Container>
         <Header>
            <LogImg src={logoImg} alt="Logo Minha Carteira"></LogImg>
            <Title>Minha Carteira</Title>
         </Header>

         <MenuContainer>
            <Link to="/">
               <MdDashboard/>
               Dashboard
            </Link>

            <Link to="/list/entry-balance">
               <MdArrowUpward/>
               Entradas
            </Link>

            <Link to="/list/exit-balance">
            <MdArrowDownward/>
               Saidas
            </Link>

            <Link to="#">
            <MdExitToApp/>
               Sair
            </Link>
         </MenuContainer>
      </Container>
   )
}

export default Aside;