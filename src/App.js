
import './App.css';

import React, { useState,useEffect } from 'react'
function App() {
  const f=()=>{
    console.log("hello")  
    setCount(count+1);
  }
  const [count, setCount] = useState(0)
  useEffect(() => {
    // setCount(count+1);
    f();
   // eslint-disable-next-line
  },[]);
  
  return (
 <>
 <div>
  <p style={{cursor:"pointer"}} onClick={()=>{setCount(count+1)}}>Counssst: {count}</p>
 </div>
 </>
  );
}

export default App;
