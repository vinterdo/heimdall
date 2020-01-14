import {useSelector} from "react-redux";
import React from "react";
import LayoutNode from "./LayoutNode";
import styled from "styled-components";
import {ILayoutState} from "../../store/ducks/layout/types";

const Tab = (props: {className?: string }) => {
    const currentTab = useSelector((state: {layout: ILayoutState}) => state.layout.currentTab);
    const tab = useSelector((store: {layout: ILayoutState}) => store.layout.tabs[currentTab]);
    if (tab === undefined) {
        console.log("tab does not exits");
        return <></>
    }
    return (
        <div className={props.className}>
            <LayoutNode node={tab.rootNode}/>
        </div>
    )
};

export default styled(Tab)`
  flex-grow: 1;
  display: flex;
  position: relative;
`