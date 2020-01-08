import {useDrag} from "react-dnd";
import styled from "styled-components";
import * as React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../store/store";
import Reparentable from "./Reparentable";

const DraggableWindow = (props: { className?: string, windowId: number, children: React.ReactElement | undefined }) => {
    const currentTab = useSelector((state: AppState) => state.layout.currentTab);
    const nodeId = useSelector((state: AppState) => state.layout.tabs[currentTab].windowToNode[props.windowId]);
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
            <Reparentable uid={"" + props.windowId}>
                {props.children || <></>}
            </Reparentable>
        </div>
    )
};

export default styled(DraggableWindow)`
  width: 100%;
  height: 100%;
  overflow: auto;
  max-width: 100%;
  max-height: 100%;
`