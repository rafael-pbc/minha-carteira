import React, { ButtonHTMLAttributes } from "react";
import { Container } from './styles'

type IButtonPropsProps = ButtonHTMLAttributes<HTMLButtonElement>;


const Button: React.FC<IButtonPropsProps> = ({ children, ...rest }) => (
   <Container  {...rest}>
      {children}
   </Container>
);

export default Button;