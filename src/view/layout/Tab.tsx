import {useSelector} from "react-redux";
import {AppState} from "../../store/store";
import React from "react";
import LayoutNode from "./LayoutNode";

export default () => {
    const tab = useSelector((store: AppState) => store.layout.tabs);
    const layout = tab["default"];
    if (layout === undefined) {
        console.log("tab does not exits");
        return <></>
    }
    return <LayoutNode node={layout}/>
};
