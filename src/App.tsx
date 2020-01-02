import React from 'react';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faGripLines, faGripLinesVertical, faTimes} from "@fortawesome/free-solid-svg-icons";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "./store/store";
import {Provider} from "react-redux";
import Tab from "./view/layout/Tab";
import GlobalStyle from "./view/GlobalStyle";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

library.add(faTimes, faGripLines, faGripLinesVertical);

export const store = configureStore();

export default () => {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <GlobalStyle/>
                <DndProvider backend={Backend}>
                    <Tab/>
                </DndProvider>
            </PersistGate>
        </Provider>
    );
};
