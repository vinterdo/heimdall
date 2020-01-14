import {DndProvider} from "react-dnd";
import Backend from "react-dnd-html5-backend";
import TabsTopBar from "./TabsTopBar";
import Tab from "./Tab";
import React from "react";
import styled from "styled-components";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "../../store/store";

const TabWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
`;

const store = configureStore();

const Layout = (props: { className?: string }) => {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <div className={props.className}>
                    <DndProvider backend={Backend}>
                        <TabsTopBar/>
                        <TabWrapper>
                            <Tab/>
                        </TabWrapper>
                    </DndProvider>
                </div>
            </PersistGate>
        </Provider>
    );
};

export default styled(Layout)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`