import {useSelector} from "react-redux";
import {AppState} from "../../store/store";
import React from "react";
import LayoutNode from "./LayoutNode";
import styled from "styled-components";

const Tab = (props: {className?: string }) => {
    const currentTab = useSelector((state: AppState) => state.layout.currentTab);
    const tab = useSelector((store: AppState) => store.layout.tabs[currentTab]);
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
`