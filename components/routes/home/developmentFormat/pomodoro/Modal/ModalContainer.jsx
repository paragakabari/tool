import React, { useContext } from 'react'
import styled from 'styled-components';
import {motion} from "framer-motion";
import {FaWindowClose} from 'react-icons/fa';
import {Formik,Form,Field} from 'formik';
import { StateContext } from '../StateProvider';
const ModalContainer = ({isOpen,onClose}) => {

    const {longBreakTime, setLongBreakTime,
        shortBreakTime, setShortBreakTime,
        workTime, setWorkTime} = useContext(StateContext);
  return (
   <Container>
    <ModalContent intial={{y:"-100vh",scale:0}} animate={{y:0,scale:1}} exit={{y:"-100vh",scale:0}}>
        <ModalHeader>
            <ModalTitle>Settings</ModalTitle>
                <ModalCloseButton onClick={onClose}><i className="fa-solid fa-xmark" style={{marginRight:"4px"}}></i></ModalCloseButton>
        </ModalHeader>
        <ModalBody>
            <Formik 
            initialValues={{work:workTime/60,short:shortBreakTime/60,long:longBreakTime/60}}
            onSubmit={(values)=>{
                setWorkTime(values.work *60);
                setShortBreakTime(values.short *60);
                setLongBreakTime(values.long *60);
                onClose();
            }}>
                <Form>
                    <InputWrapper>
                    <FormControl>
                        <label style={{marginLeft:"3rem"}}htmlFor="work">Work</label>
                        <Field name="work" min="1" max="60"/>
                    </FormControl>
                    <FormControl>
                        <label htmlFor="short">Short Break</label>
                        <Field name="short" min="1" max="60"/>
                    </FormControl>
                    <FormControl>
                        <label htmlFor="long">Long Break</label>
                        <Field name="long" min="1" max="60"/>
                    </FormControl>
                    </InputWrapper>
                    <ButtonWrapper>
                    <ApplyButton type="submit">Apply</ApplyButton>
                    </ButtonWrapper>
                </Form>
            </Formik>
        </ModalBody>
    </ModalContent>
   </Container>
  )
}

export default ModalContainer

const ButtonWrapper = styled.div`
display:flex;
justify-content: center;
padding: 0.5rem;
margin:0.3rem 1.5rem 2rem 0;
`;

const ApplyButton=styled.button`
   padding: 5px 24px;
    background-color: #1566cc;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    font-family: Poppins,sans-serif;
    font-weight: 400;
    border-radius: 9999px;
    border: none;
    font-weight: 600;
    letter-spacing: .5px;
    cursor: pointer;
`;

const Container=styled.div`
position:absolute;
height:100vh;
width:100vh;
display:grid;
place-items: center;
z-index: 150;
`;
const ModalContent=styled(motion.div)`
width:25rem;
height:18rem;
border: 1px solid #d0d0d0;
background-color: white;

    @media(max-width:600px){
        width:90%;
        padding:0.5rem;
    }
`;
const ModalHeader=styled.div`
color:black;
padding:0.5rem;
display:flex;
justify-content: space-between;
border-bottom: 1px solid #d0d0d0
`;
const ModalTitle=styled.p`
font-size:1.5rem;
color:#181d20
`;
const ModalCloseButton=styled.button`
all:unset;
&:hover {
      cursor: pointer;
    }
`;
const ModalBody=styled.div`
display:flex;
justify-content: center;
`;

const FormControl = styled.div`
flex:1;
margin-top:1rem;
width:100%;
display:inline-flex;
gap:1rem;
label{
    font-size: 1rem;
}
input{
    width:15rem;
    height:35px;
    font-size:1rem;
    padding:0.5rem;
    border-radius:0.5rem;
    border: 1px solid #d0d0d0;
    background:#f8f9fb
}
`;
const InputWrapper = styled.div`
display:flex;
flex-direction:column;
color:black;
gap:0.5rem;
`;