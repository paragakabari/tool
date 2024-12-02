import styled from 'styled-components'
import {useContext, useEffect,useState} from 'react'
import Clock from './clock/Clock';
import { StateContext } from '../StateProvider';
const CircularProgress = () => {
    const {progress,setProgress,time,initTime} = useContext(StateContext);

    useEffect(() => {
      setProgress(time/(initTime/100));
    }, [setProgress,time])
    
  return (
    <OuterCircle progress={progress}>
        <InnerCircle >
        <Clock/>
        </InnerCircle>
    </OuterCircle>
  )
}
export default CircularProgress

const OuterCircle = styled.div`
    width:17rem;
    height:17rem;
    background:#181d20;
    border-radius:50%;
    display:grid;
    place-items: center;
    background: conic-gradient(#181d20 ${({progress})=>progress}% ,transparent ${({progress})=>progress}%);

`
const InnerCircle = styled.div`
    width:15rem;
    height:15rem;
    background:white;
    border-radius:50%;
    display:grid;
    place-items: center;
`