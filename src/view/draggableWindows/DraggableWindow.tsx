import {useDrag} from "react-dnd";
import styled from "styled-components";
import * as React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../store/store";

const DraggableWindow = (props: { className?: string, windowId: number }) => {
    const nodeId = useSelector((state: AppState) => state.layout.windowToNode[props.windowId]);
    const [{opacity}, drag] = useDrag({
        item: {
            type: "draggableWindow",
            windowId: props.windowId,
            nodeId: nodeId
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });
    return (
        <div ref={drag} style={{opacity}} className={props.className}>
            <span>
                {props.windowId}
            </span>
        </div>
    )
};

export default styled(DraggableWindow)`
  width: 100%;
  height: 100%;
`