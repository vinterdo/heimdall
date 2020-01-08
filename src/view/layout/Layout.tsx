import {DndProvider} from "react-dnd";
import Backend from "react-dnd-html5-backend";
import TabsTopBar from "./TabsTopBar";
import Tab from "./Tab";
import React from "react";
import styled from "styled-components";

const Layout = (props: {className?: string}) => {
    return (
        <div className={props.className}>
            <DndProvider backend={Backend}>
                <TabsTopBar/>
                <Tab/>
            </DndProvider>
        </div>
    );
};

export default styled(Layout)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`