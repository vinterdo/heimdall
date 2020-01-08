import React from 'react';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faGripLines, faGripLinesVertical, faTimes} from "@fortawesome/free-solid-svg-icons";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "./store/store";
import {Provider} from "react-redux";
import GlobalStyle from "./view/GlobalStyle";
import windowFactory from "./view/layout/WindowFactory";
import ExampleDropdown from "./view/exampleWindows/ExampleDropdown";
import ExampleForm from "./view/exampleWindows/ExampleForm";
import Layout from "./view/layout/Layout";

library.add(faTimes, faGripLines, faGripLinesVertical);

export const store = configureStore();

windowFactory.addTemplate("Dropdown", () => {return (<ExampleDropdown/>)});
windowFactory.addTemplate("Form", () => {return (<ExampleForm/>)});

export default () => {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <GlobalStyle/>
                <Layout/>
            </PersistGate>
        </Provider>
    );
};
