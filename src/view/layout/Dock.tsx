import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import * as ReactDOM from "react-dom";
import {moveWindowBetweenNodes} from "../../store/ducks/layout/actions";

const DockHeader = styled.div`
  color: #888;
  height: 1.5rem;
  width: 100%;
  background: #DDD;
  display: flex;
  flex-direction: row;
  line-height: 1.5rem;
  margin: auto 0;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 1.5rem;
  margin: auto 0;
  padding-left: 5px;
`;

const HeaderIcons = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 5px;
  line-height: 1.5rem;
  margin: auto 0;
  svg {
    padding-left: 5px;
    cursor: pointer;
  }
`;


const DockUnstyled = (props: {
    children: React.ReactNode
    onSplitVertical: () => void
    onSplitHorizontal: () => void
    onClose: () => void
    className?: string
    id: string
}) => {
    const dispatch = useDispatch();
    const onDrop = (nodeId: string, windowId: number) => {
        console.log("dropping from " + nodeId + " to " + props.id + " window with id " + windowId);
        dispatch(moveWindowBetweenNodes(nodeId, props.id, windowId))
    };
    const [{isOver}, drop] = useDrop({
        accept: "draggableWindow",
        drop: (item, monitor) => onDrop(monitor.getItem().nodeId, monitor.getItem().windowId),
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div className={props.className} ref={drop} style={isOver ? {backgroundColor: "#FF000"} : {}}>
            <DockHeader>
                <HeaderTitle>
                    Header
                </HeaderTitle>
                <HeaderIcons>
                    <FontAwesomeIcon icon="grip-lines" onClick={props.onSplitHorizontal}/>
                    <FontAwesomeIcon icon="grip-lines-vertical" onClick={props.onSplitVertical}/>
                    <FontAwesomeIcon icon="times" onClick={props.onClose}/>
                </HeaderIcons>
            </DockHeader>
            {props.children}
        </div>
    )
};

export default styled(DockUnstyled)`
  background: #FAFAFA;
  width: 100%;
  height: 100%;
`;