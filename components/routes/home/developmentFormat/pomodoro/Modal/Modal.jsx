import { Backdrop } from '@material-ui/core';
import { AnimatePresence } from 'framer-motion';
import React from 'react'
import styled from 'styled-components';
import ModalContainer from './ModalContainer';

const Modal = ({isOpen,onClose}) => {
  return (
      <>
   <AnimatePresence>
   { isOpen && (
        <>
   <Backdrop/>
   <ModalContainer isOpen={isOpen} onClose={onClose}/>
        </>
    )
   }
   </AnimatePresence>
      </>
  )
}

export default Modal