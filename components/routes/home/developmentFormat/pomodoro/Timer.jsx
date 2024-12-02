import React from 'react';
import styled from 'styled-components';
import CircularProgress from './circularProgress/CircularProgress';
const Timer = ()=>{
    return(
   <TimerContainer>
    <CircularProgress/>
   </TimerContainer>
    ) 
}

const TimerContainer = styled.div`
     width:19rem;
    height:19rem;
    background:rgb(179, 184, 189);
    margin:2rem auto;
    border-radius:50%;
    display:grid;
    place-items: center;
    /* box-shadow: -50px -50px 150px rgba(150,150,0.2),
    50px -10px 100px rgba(1,1,0.5) */
 `
  
export default Timer;