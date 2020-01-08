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

const DockingAreaRaw = (props: { children: React.ReactElement, isOver: boolean, className?: string }) => {
    return <div className={props.className}>{props.children}</div>
};

const DockingArea = styled(DockingAreaRaw)`
  flex-grow: 1;
  background: ${props => props.isOver ? "#CCC" : "#FFF"};
`;

const DockUnstyled = (props: {
    onSplitVertical: () => void
    onSplitHorizontal: () => void
    onClose: () => void
    className?: string
    id: string
}) => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state: AppState) => state.layout.currentTab);
    const dockedWindow = useSelector((state: AppState) => state.layout.tabs[currentTab].nodeToWindow[props.id]);
    const windowType = useSelector((state: AppState) => state.layout.windowIdToType[dockedWindow]);
    const onDrop = (nodeId: string, windowId: number) => {
        if (nodeId === props.id) {
            return;
        }
        if (dockedWindow) {
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
            <DockingArea isOver={isOver && !dockedWindow}>
                {dockedWindow ?
                    <DraggableWindow windowId={dockedWindow}>
                        <div>
                            {renderer && renderer()}
                        </div>
                    </DraggableWindow> :
                    <WindowSelect id={props.id} placeholder={"Select window"} onSelected={onWindowSelect}/>}
            </DockingArea>
        </div>
    )
};

export default styled(DockUnstyled)`
  background: #FAFAFA;
  overflow: auto;
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;