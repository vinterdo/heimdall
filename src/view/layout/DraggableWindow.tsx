import {useDrag} from "react-dnd";
import styled from "styled-components";
import * as React from "react";
import {useSelector} from "react-redux";
import Reparentable from "./Reparentable";
import {ILayoutState} from "../../store/ducks/layout/types";

const ReparentableStyled = styled(Reparentable)`
  width: 100%;
  height: 100%;
`;

const DraggableWindow = (props: { className?: string, windowId: number, children: React.ReactElement | undefined }) => {
    const currentTab = useSelector((state: {layout: ILayoutState}) => state.layout.currentTab);
    const nodeId = useSelector((state: {layout: ILayoutState}) => state.layout.tabs[currentTab].windowToNode[props.windowId]);
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
            <ReparentableStyled uid={"" + props.windowId}>
                {props.children || <></>}
            </ReparentableStyled>
        </div>
    )
};

export default styled(DraggableWindow)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`