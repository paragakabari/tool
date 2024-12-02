import styled from "styled-components";
import {useState,useEffect} from 'react';
import { useContext } from "react";
import { StateContext } from "../../StateProvider";
const Clock = () => {
    const {time ,setTime} = useContext(StateContext);
    const {isActive,setIsActive} = useContext(StateContext);
    const {initTime,setInitTime} = useContext(StateContext);
    useEffect(() => {
       if(isActive && time>0){
        const interval = setInterval(() => {
            setTime((time)=>time-1);
           }, 1000);
           return ()=> clearInterval(interval);
       }
    },[time,isActive])
  
    
   const toggleClock = () => {
      setIsActive(!isActive);
    }
    const resetTime = () =>{
        setTime(initTime);
        setIsActive(false);
    }
    const getTime = (time) =>{
        const min = Math.floor(time / 60);
        const sec = time % 60;
        return `${min < 10 ? "0" + min:min}:${sec<10?"0"+sec:sec} `
    }
  return (
    <ClockConatainer>
      <TimerText>{getTime(time)}</TimerText>
      <StartPauseButton onClick={toggleClock}>{isActive?"Pause":"Start"}</StartPauseButton>
      {time == 0 && <ResetButton onClick={resetTime}>RESET</ResetButton>}
    </ClockConatainer>
  );
};

const ClockConatainer = styled.div`
display:grid;
place-items:center;
`;

const TimerText = styled.h3`
  font-size: 4rem;
`
const StartPauseButton = styled.button`
    all:unset;
    text-align: center;
    font-size:2rem;
    text-transform: uppercase;
    letter-spacing: 1rem;
    letter-spacing:0;
    &:hover {
      background: rgb(21,102,204);
      cursor: pointer;
      padding:4px 10px;
      border-radius:8px;
      color:white;
    }
` 
const ResetButton = styled.button`
    color:red;
    all:unset;
    text-align: center;
    font-size:1rem;
    text-transform: uppercase;
    letter-spacing: 1rem;
    &:hover {
      background: rgb(21,102,204);
      cursor: pointer;
      padding:4px 10px;
      border-radius:8px;
      color:white;
    }
`
export default Clock;

