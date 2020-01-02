import {
    CLOSE_NODE_ACTION,
    ILayoutNode,
    ILayoutState,
    LayoutActionTypes,
    SPLIT_NODE_HORIZONTALLY_ACTION,
    SPLIT_NODE_VERTICALLY_ACTION
} from "./types";
import {findNode} from "./utils";

const initialState: ILayoutState = {
    tabs: {
        "default":{docked: "test", id: "", a: undefined, b: undefined}
    }
};

export default function layoutReducer(state = initialState, action: LayoutActionTypes): ILayoutState {

    switch (action.type) {
        case SPLIT_NODE_HORIZONTALLY_ACTION:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if(currentTab === undefined) {
                    console.log("current tab not found");
                    return state;
                }
                console.log(currentTab);
                const currentNode = findNode(action.payload.nodeId, currentTab);
                if(currentNode === undefined) {
                    console.log("current node not found");
                    return state;
                }

                currentNode.a = Object.assign({}, currentNode);
                currentNode.a.id += "a";
                currentNode.docked = undefined;
                currentNode.b = {docked: "new", id: currentNode.id + "b"};
                currentNode.split = "horizontal";
                currentNode.percent = 50;
                return newState;
            })();
        case SPLIT_NODE_VERTICALLY_ACTION:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if(currentTab === undefined) {
                    console.log("current tab not found");
                    return state;
                }
                const currentNode = findNode(action.payload.nodeId, currentTab);
                if(currentNode === undefined) {
                    console.log("current node not found");
                    return state;
                }

                currentNode.a = Object.assign({}, currentNode);
                currentNode.a.id += "a";
                currentNode.docked = undefined;
                currentNode.b = {docked: "new", id: currentNode.id + "b"};
                currentNode.split = "vertical";
                currentNode.percent = 50;
                return newState;
            })();
        case CLOSE_NODE_ACTION:
            return state;
        default:
            return state;

    }
}