import React from "react";
import styled from "styled-components";

const Button = styled.div`
  display: row;
  justify-content: center;
  align-items: center;
  color: rebeccapurple;
  border: 1px solid black;
  font-size: 1rem;
  border-radius: 0.25em;
  padding-left: 0.25em;
  padding-right: 0.25em;
`;

const ButtonComopnent = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export default ButtonComopnent;
