import React from 'react';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faGripLines, faGripLinesVertical, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import GlobalStyle from "./view/GlobalStyle";
import ExampleDropdown from "./view/exampleWindows/ExampleDropdown";
import ExampleForm from "./view/exampleWindows/ExampleForm";
import {WindowFactory, Layout} from "heimdall-layout";

library.add(faTimes, faGripLines, faGripLinesVertical, faSearch);

WindowFactory.addTemplate({
    name: "Dropdown",
    windowNodeProducer: (params: any, changeTitle: (title: string) => void) => {
        return (<ExampleDropdown.WindowRenderer params={params} onChange={changeTitle}/>)
    },
    paramsViewProducer: (onSubmit) => {
        return (<ExampleDropdown.ParamsRenderer onSubmit={onSubmit}/>)
    },
    defaultTitle: "Insert comma separated values for select..."
});
WindowFactory.addTemplate({
    name: "Form", windowNodeProducer: () => {
        return (<ExampleForm/>)
    }
});

export default () => {
    return (
        <>
            <GlobalStyle/>
            <Layout/>
        </>
    );
};
