import {ILayoutNode} from "../../store/ducks/layout/types";
import {useDispatch} from "react-redux";
import {closeNode, splitNodeHorizontally, splitNodeVertically} from "../../store/ducks/layout/actions";
import SplitPane from "react-split-pane";
import React from "react";
import Dock from "./Dock";
import styled from "styled-components";

const SplitPaneStyled = styled(SplitPane)`
  position: relative !important;
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
                <SplitPaneStyled split={currentNode.split} minSize={"100px"} defaultSize={"50%"}>
                    <LayoutNode node={currentNode.a}/>
                    <LayoutNode node={currentNode.b}/>
                </SplitPaneStyled>
            );
        case undefined:
            return (
                <Dock onClose={onClose}
                      onSplitHorizontal={onSplitHorizontal}
                      onSplitVertical={onSplitVertical}
                      id={currentNode.id} />
            )

    }
    return <></>
};

export default LayoutNode;