import {useSelector} from "react-redux";
import {AppState} from "../../store/store";
import React from "react";
import LayoutNode from "./LayoutNode";
import styled from "styled-components";

const Tab = (props: {className?: string }) => {
    const tab = useSelector((store: AppState) => store.layout.tabs);
    const currentTab = useSelector((state: AppState) => state.layout.currentTab);
    const layout = tab[currentTab];
    if (layout === undefined) {
        console.log("tab does not exits");
        return <></>
    }
    return (
        <div className={props.className}>
            <LayoutNode node={layout}/>
        </div>
    )
};

export default styled(Tab)`
  width: 100vw;
  height: 100vh;
`