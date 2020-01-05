import {useDrag} from "react-dnd";
import styled from "styled-components";
import * as React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../store/store";
import Reparentable from "./Reparentable";
import Select from "react-select";

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
            <Reparentable uid={props.windowId}>
                <div>
                    <Select options={[
                        {value: 'chocolate', label: 'Chocolate'},
                        {value: 'strawberry', label: 'Strawberry'},
                        {value: 'vanilla', label: 'Vanilla'}
                    ]}/>
                    <input type={"text"}/>
                </div>
            </Reparentable>
        </div>
    )
};

export default styled(DraggableWindow)`
  width: 100%;
  height: 100%;
`