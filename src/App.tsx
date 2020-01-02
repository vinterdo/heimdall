import React from 'react';
import './App.css';
import styled, {createGlobalStyle} from "styled-components"
import SplitPane from "react-split-pane";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faGripLines, faGripLinesVertical, faTimes} from "@fortawesome/free-solid-svg-icons";
import {PersistGate} from "redux-persist/integration/react";
import configureStore, {AppState} from "./store/store";
import {Provider, useDispatch, useSelector, useStore} from "react-redux";
import {ILayoutNode} from "./store/ducks/layout/types";
import {closeNode, splitNodeHorizontally, splitNodeVertically} from "./store/ducks/layout/actions";

const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
  }
  .Resizer {
  background: #000;
  opacity: 0.2;
  z-index: 1;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
}

.Resizer:hover {
  -webkit-transition: all 2s ease;
  transition: all 2s ease;
}

.Resizer.horizontal {
  height: 11px;
  margin: -5px 0;
  border-top: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;
}

.Resizer.horizontal:hover {
  border-top: 5px solid rgba(0, 0, 0, 0.5);
  border-bottom: 5px solid rgba(0, 0, 0, 0.5);
}

.Resizer.vertical {
  width: 11px;
  margin: 0 -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;
}

.Resizer.vertical:hover {
  border-left: 5px solid rgba(0, 0, 0, 0.5);
  border-right: 5px solid rgba(0, 0, 0, 0.5);
}
.Resizer.disabled {
  cursor: not-allowed;
}
.Resizer.disabled:hover {
  border-color: transparent;
}
`;

library.add(faTimes, faGripLines, faGripLinesVertical);

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
}) => {
    return (
        <div>
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

const Dock = styled(DockUnstyled)`
  background: #FAFAFA;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  margin: 1rem;
 
`;

const LayoutNode = (props: { node: ILayoutNode }) => {
    const dispatch = useDispatch();
    const currentNode = props.node;

    const onClose = () => dispatch(closeNode(currentNode.id));
    const onSplitHorizontal = () => dispatch(splitNodeHorizontally(currentNode.id));
    const onSplitVertical = () => dispatch(splitNodeVertically(currentNode.id));

    switch (currentNode.split) {
        case "vertical":
        case "horizontal":
            if (currentNode.a === undefined || currentNode.b === undefined) {
                return <>Error</>
            }
            return (
                <SplitPane split={currentNode.split} minSize={"100px"} defaultSize={"50%"}>
                    <LayoutNode node={currentNode.a}/>
                    <LayoutNode node={currentNode.b}/>
                </SplitPane>
            );
        case undefined:
            return (
                <Dock onClose={onClose}
                      onSplitHorizontal={onSplitHorizontal}
                      onSplitVertical={onSplitVertical}>
                    {currentNode.docked}
                </Dock>
            );
    }
    return <></>
};

const Tab = () => {
    const tab = useSelector((store: AppState) => store.layout.tabs);
    const layout = tab["default"];
    if (layout === undefined) {
        console.log("tab does not exits");
        return <></>
    }
    return <LayoutNode node={layout}/>
};

export const store = configureStore();

export default () => {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>

                <GlobalStyle/>
                <Tab/>
            </PersistGate>
        </Provider>
    );
};
