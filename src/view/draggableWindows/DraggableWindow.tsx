import {useDrag} from "react-dnd";
import styled from "styled-components";
import * as React from "react";


const DraggableCard =  (props: {children: React.ReactElement, id: string, className?: string}) => {
    const [{ opacity }, drag] = useDrag({
        item: { type: "draggableWindow", id: props.id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });
    return <div ref={drag} style={{opacity}} className={props.className}>
        {props.children}
    </div>
};

export default styled(DraggableCard)`
  width: 100%;
  height: 100%;
`