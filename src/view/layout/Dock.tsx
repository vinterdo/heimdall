import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {moveWindowBetweenNodes, openNewWindow} from "../../store/ducks/layout/actions";
import WindowSelect from "./WindowSelect";
import windowFactory from "./WindowFactory";
import DraggableWindow from "./DraggableWindow";
import {AppState} from "../../store/store";

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
    onSplitVertical: () => void
    onSplitHorizontal: () => void
    onClose: () => void
    className?: string
    id: string
}) => {
    const dispatch = useDispatch();
    const dockedWindow = useSelector((state: AppState) => state.layout.nodeToWindow[props.id]);
    const windowType = useSelector((state: AppState) => state.layout.windowIdToType[dockedWindow]);
    const onDrop = (nodeId: string, windowId: number) => {
        if (nodeId === props.id) {
            return;
        }
        if(dockedWindow) {
            return;
        }
        dispatch(moveWindowBetweenNodes(nodeId, props.id, windowId))
    };
    const [{isOver}, drop] = useDrop({
        accept: "draggableWindow",
        drop: (item, monitor) => onDrop(monitor.getItem().nodeId, monitor.getItem().windowId),
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    });

    const onWindowSelect = (value: string) => {
        const {id} = windowFactory.createWindow(value);
        dispatch(openNewWindow(props.id, id, value));
        console.log("selected " + value);
    };

    const renderer = windowFactory.getRenderer(windowType);
    return (
        <div className={props.className} ref={drop}>
            <DockHeader>
                <HeaderTitle>
                    ID: [{props.id}]
                </HeaderTitle>
                <HeaderIcons>
                    <FontAwesomeIcon icon="grip-lines" onClick={props.onSplitHorizontal}/>
                    <FontAwesomeIcon icon="grip-lines-vertical" onClick={props.onSplitVertical}/>
                    <FontAwesomeIcon icon="times" onClick={props.onClose}/>
                </HeaderIcons>
            </DockHeader>
            <div style={isOver && !dockedWindow ? {background: "#CCC", width: "100%", height: "calc(100% - 1.5rem)"} : {
                width: "100%",
                height: "calc(100% - 1.5rem)"
            }}>
                {dockedWindow &&
                <DraggableWindow windowId={dockedWindow}>
                    <div>
                        {renderer && renderer()}
                    </div>
                </DraggableWindow>}
                {!dockedWindow && <WindowSelect id={props.id} placeholder={"Select window"} onSelected={onWindowSelect}/>}
            </div>
        </div>
    )
};

export default styled(DockUnstyled)`
  background: #FAFAFA;
  width: 100%;
  height: 100%;
  overflow: auto;
`;