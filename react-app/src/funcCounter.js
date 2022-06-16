import React, { useEffect, useRef, useState } from "react";


const Button = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>
}

function FuncCounter() {

    const [count, setCount] = useState(0);
    const countRef = useRef(0); // create a new reference

    useEffect(() => {
        countRef.current = count; // listen to the changes of the count variable
        console.log(countRef);
        // every time the variable changes, we'll assign the reference to the value of the state
    }, [count])

    const handleAdd = () => {
        setCount(count+1);
    }
    
    const handleSub = () => {
        setCount(count-1);
    }
    
    const handleAlert = () => {
        // use the reference instead of the state variable in the timeout to get the latest version
        setTimeout(() => {alert(countRef.current)}, 5000);
    }

    return (
        <section>
            <header>MyCounter:{count}</header>
            <Button onClick={handleAdd} >+</Button><Button onClick={handleSub}>-</Button>
            <Button onClick={handleAlert}>Alert after 5 s</Button>
        </section>
    )
}

export default FuncCounter;