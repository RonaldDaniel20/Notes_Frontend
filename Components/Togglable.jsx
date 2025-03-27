import { useState, useImperativeHandle, forwardRef } from "react";
import Button from "./Button";

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hidenWhenVisible = {display: visible ? 'none': ''}
    const showWhenVisible = {display: visible ? '': 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hidenWhenVisible}>
                <Button onClick={toggleVisibility} text={props.label}/>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility} text={'cancel'} />
            </div>
        </div>
    )
})

export default Togglable