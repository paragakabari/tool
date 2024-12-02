import React, { createContext,useState,useEffect } from 'react'
export const StateContext = createContext(); 
const StateProvider = ({children}) => {
    const [activeTag, setActiveTag] = useState(true);
    const [progress,setProgress] = useState(10);
    const [time ,setTime] = useState(5*60);
    const [isActive,setIsActive] = useState(false);
    const [workTime, setWorkTime] = useState(60*60);
    const [shortBreakTime, setShortBreakTime] = useState(5*60);
    const [longBreakTime, setLongBreakTime] = useState(30*60);
    const [initTime,setInitTime] = useState(0);

useEffect(() => {
    switch(activeTag){
        case 0:
            setTime(workTime);
            setInitTime(workTime);
            break;
        case 1:
                setTime(shortBreakTime);
                setInitTime(shortBreakTime);
                break;
        case 2:
            setTime(longBreakTime);
            setInitTime(longBreakTime);
            break;
        default:
            break;    
    }
}, [activeTag,workTime,shortBreakTime,longBreakTime])


  return (
    <StateContext.Provider value={{
        activeTag, setActiveTag,
        progress,setProgress,
        time ,setTime,
        isActive,setIsActive,
        initTime,setInitTime,
        longBreakTime, setLongBreakTime,
        shortBreakTime, setShortBreakTime,
        workTime, setWorkTime
    }}>{children}</StateContext.Provider>
  )
}
export default StateProvider;