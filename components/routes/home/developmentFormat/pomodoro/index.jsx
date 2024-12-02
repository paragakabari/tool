import React, { useState } from "react";
import Tags from "./tags";
import Timer from "./Timer";
import { createGlobalStyle } from "styled-components";
import StateProvider from "./StateProvider";
import Modal from "./Modal/Modal";
import { FaCog } from "react-icons/fa";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle;

export default function Pomodoro() {
  // const theme = () =>{
  //   colors:{
  //     primary:"blue";
  //     secondary:"black";
  //     background:"white";
  //   }
  // }
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <StateProvider>
        <div style={{ background: "" }}>
          <Tags />{" "}
        </div>
        <Modal isOpen={isOpen} onClose={onClose} />
        <Timer />
        <CogIcon onClick={onOpen}>
          <FaCog fontSize="1.5rem" />
        </CogIcon>
      </StateProvider>
    </>
  );
}

const CogIcon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 4rem;
  cursor: pointer;
`;
