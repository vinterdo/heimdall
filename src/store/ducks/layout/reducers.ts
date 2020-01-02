import {
    CLOSE_NODE_ACTION,
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
                currentNode.b = {docked: undefined, id: currentNode.id + "b"};
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
                currentNode.b = {docked: undefined, id: currentNode.id + "b"};
                currentNode.split = "vertical";
                currentNode.percent = 50;
                return newState;
            })();
        case CLOSE_NODE_ACTION:return (() => {
            const newState = JSON.parse(JSON.stringify(state));
            const currentTab = newState.tabs["default"];
            if(currentTab === undefined) {
                console.log("current tab not found");
                return state;
            }
            const id = action.payload.nodeId;
            const parentId = id.substr(0, id.length - 1);
            const ownSide = id.substr(id.length - 1, id.length);
            const currentNodeParent = findNode(parentId, currentTab);
            if(currentNodeParent === undefined) {
                console.log("current node parent not found");
                return state;
            }
            const siblingNode = ownSide === 'a' ? currentNodeParent.b : currentNodeParent.a;

            if(siblingNode === undefined) {
                console.log("current node sibling not found");
                return state;
            }

            currentNodeParent.a = undefined;
            currentNodeParent.b = undefined;
            currentNodeParent.split = undefined;
            currentNodeParent.percent = undefined;
            currentNodeParent.docked = siblingNode.docked;

            return newState;
        })();
        default:
            return state;

    }
}