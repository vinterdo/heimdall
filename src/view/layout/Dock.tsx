import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {
    closeWindow,
    moveWindowBetweenNodes,
    openNewWindow,
    setWindowParams,
    setWindowTitle
} from "../../store/ducks/layout/actions";
import WindowSelect from "./WindowSelect";
import windowFactory from "./WindowFactory";
import DraggableWindow from "./DraggableWindow";
import {ILayoutState} from "../../store/ducks/layout/types";

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
  background: ${(props: {isOver: boolean}) => props.isOver ? "#CCC" : "#FFF"};
  overflow: auto;
`;

const DockUnstyled = (props: {
    onSplitVertical: () => void
    onSplitHorizontal: () => void
    onClose: () => void
    className?: string
    id: string
}) => {
    const dispatch = useDispatch();
    const currentTab = useSelector((state: {layout: ILayoutState}) => state.layout.currentTab);
    const dockedWindow = useSelector((state: {layout: ILayoutState}) => state.layout.tabs[currentTab].nodeToWindow[props.id]);
    const windowData = useSelector((state: {layout: ILayoutState}) => state.layout.windows[dockedWindow]);
    const nextWindowId = useSelector((state: {layout: ILayoutState}) => state.layout.nextWindowId);

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
        drop: (_, monitor) => onDrop(monitor.getItem().nodeId, monitor.getItem().windowId),
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    });

    const onWindowSelect = (value: string) => {
        const {askForParams, title} = windowFactory.createWindow(value, nextWindowId);
        dispatch(openNewWindow(props.id, nextWindowId, value, askForParams ? undefined : {}, title));
    };

    const onSearchClick = () => {
        dispatch(closeWindow(props.id));
    };

    const onParamsSubmit = (params: any) => {
        dispatch(setWindowParams(dockedWindow, params));
    };

    const changeTitle = (title: string) => {
        dispatch(setWindowTitle(dockedWindow, title));
    };

    const renderer = windowFactory.getRenderer(windowData?.type);
    const paramsRenderer = windowFactory.getParamsRenderer(windowData?.type);
    return (
        <div className={props.className} ref={drop}>
            <DockHeader>
                <HeaderTitle>
                    {windowData?.title || ""}
                </HeaderTitle>
                <HeaderIcons>
                    <FontAwesomeIcon icon="grip-lines" onClick={props.onSplitHorizontal}/>
                    <FontAwesomeIcon icon="grip-lines-vertical" onClick={props.onSplitVertical}/>
                    {dockedWindow && <FontAwesomeIcon icon="search" onClick={onSearchClick}/>}
                    {props.id !== "" && <FontAwesomeIcon icon="times" onClick={props.onClose}/>}
                </HeaderIcons>
            </DockHeader>
            <DockingArea isOver={isOver && !dockedWindow}>
                {dockedWindow ?
                    <DraggableWindow windowId={dockedWindow}>
                        <>
                            {!windowData.requestingParams && renderer && renderer(windowData?.params, changeTitle)}
                            {windowData.requestingParams && paramsRenderer && paramsRenderer(onParamsSubmit, changeTitle)}
                        </>
                    </DraggableWindow> :
                    <WindowSelect id={props.id} placeholder={"Select window"} onSelected={onWindowSelect}/>}
            </DockingArea>
        </div>
    )
};

export default styled(DockUnstyled)`
  background: #FAFAFA;
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
`;