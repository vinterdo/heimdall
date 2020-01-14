import {ILayoutNode} from "../../store/ducks/layout/types";
import {useDispatch} from "react-redux";
import {
    closeNode,
    splitNodeHorizontally,
    splitNodeVertically,
    updateSplitValue
} from "../../store/ducks/layout/actions";
import SplitPane from "react-split-pane";
import React, {useRef} from "react";
import Dock from "./Dock";
import styled from "styled-components";

const SplitWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LayoutNode = (props: { node: ILayoutNode }) => {
    const dispatch = useDispatch();
    const currentNode = props.node;
    const onClose = () => dispatch(closeNode(currentNode.id));
    const onSplitHorizontal = () => dispatch(splitNodeHorizontally(currentNode.id));
    const onSplitVertical = () => dispatch(splitNodeVertically(currentNode.id));
    const splitRef = useRef(null);

    const onDragFinished = (value: any) => {
        const width = props.node.split === "vertical" ?
            // @ts-ignore // typescript, wtf
            splitRef.current.offsetWidth : splitRef.current.offsetHeight;
        dispatch(updateSplitValue(currentNode.id, 100 * value / width))
    };

    switch (currentNode.split) {
        case "vertical":
        case "horizontal":
            if (currentNode.a === undefined || currentNode.b === undefined) {
                return <>Error</>
            }
            return (
                <SplitWrapper ref={splitRef}>
                    <SplitPane
                        split={currentNode.split}
                        defaultSize={currentNode.splitValue + "%"}
                        onDragFinished={onDragFinished}
                        maxSize={-1}
                        minSize={0}
                    >
                        <LayoutNode node={currentNode.a}/>
                        <LayoutNode node={currentNode.b}/>
                    </SplitPane>
                </SplitWrapper>
            );
        case undefined:
            return (
                <Dock onClose={onClose}
                      onSplitHorizontal={onSplitHorizontal}
                      onSplitVertical={onSplitVertical}
                      id={currentNode.id}/>
            )

    }
    return <></>
};

export default LayoutNode;