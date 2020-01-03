import {ILayoutNode} from "../../store/ducks/layout/types";
import {useDispatch, useSelector} from "react-redux";
import {closeNode, splitNodeHorizontally, splitNodeVertically} from "../../store/ducks/layout/actions";
import SplitPane from "react-split-pane";
import React from "react";
import Dock from "./Dock";
import DraggableWindow from "../draggableWindows/DraggableWindow"
import {AppState} from "../../store/store";

const LayoutNode = (props: { node: ILayoutNode }) => {
    const dispatch = useDispatch();
    const currentNode = props.node;
    const windowId = useSelector((state: AppState) => state.layout.nodeToWindow[currentNode.id]);

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
                      onSplitVertical={onSplitVertical}
                      id={currentNode.id}>
                    {windowId && <DraggableWindow windowId={windowId} />}
                </Dock>
            )

    }
    return <></>
};

export default LayoutNode;