import * as React from "react";
import DraggableWindow from "../DraggableWindow";

export default (props: { text: string, id: string }) => {
    return <DraggableWindow id={props.id}>
        <span>
        {props.text}
        </span>
    </DraggableWindow>
};