import {
    CLOSE_NODE_ACTION,
    ILayoutState,
    LayoutActionTypes,
    MOVE_WINDOW_BETWEEN_NODES,
    SPLIT_NODE_HORIZONTALLY_ACTION,
    SPLIT_NODE_VERTICALLY_ACTION
} from "./types";
import {findNodeByNodeId} from "./utils";

const initialState: ILayoutState = {
    tabs: {
        "default": {id: "", a: undefined, b: undefined}
    },
    windowToNode: {
        1: ""
    },
    nodeToWindow: {
        "": 1
    }
};

export default function layoutReducer(state = initialState, action: LayoutActionTypes): ILayoutState {

    switch (action.type) {
        case SPLIT_NODE_HORIZONTALLY_ACTION:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if (currentTab === undefined) {
                    console.log("current tab not found");
                    return state;
                }
                console.log(currentTab);
                const currentNode = findNodeByNodeId(action.payload.nodeId, currentTab);
                if (currentNode === undefined) {
                    console.log("current node not found");
                    return state;
                }

                currentNode.a = Object.assign({}, currentNode);
                currentNode.a.id += "a";
                if(newState.nodeToWindow[currentNode.id]) {
                    newState.nodeToWindow[currentNode.a.id] = newState.nodeToWindow[currentNode.id];
                    newState.nodeToWindow[currentNode.id] = undefined;

                    newState.windowToNode[newState.nodeToWindow[currentNode.a.id]] = currentNode.id + "a";
                }
                currentNode.b = { id: currentNode.id + "b"};
                currentNode.split = "horizontal";
                currentNode.percent = 50;
                return newState;
            })();
        case SPLIT_NODE_VERTICALLY_ACTION:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if (currentTab === undefined) {
                    console.log("current tab not found");
                    return state;
                }
                const currentNode = findNodeByNodeId(action.payload.nodeId, currentTab);
                if (currentNode === undefined) {
                    console.log("current node not found");
                    return state;
                }

                currentNode.a = Object.assign({}, currentNode);
                currentNode.a.id += "a";
                if(newState.nodeToWindow[currentNode.id]) {
                    newState.nodeToWindow[currentNode.a.id] = newState.nodeToWindow[currentNode.id];
                    newState.nodeToWindow[currentNode.id] = undefined;

                    newState.windowToNode[newState.nodeToWindow[currentNode.a.id]] = currentNode.id + "a";
                }
                currentNode.b = { id: currentNode.id + "b"};
                currentNode.split = "vertical";
                currentNode.percent = 50;
                return newState;
            })();
        case CLOSE_NODE_ACTION:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if (currentTab === undefined) {
                    console.log("current tab not found");
                    return state;
                }
                const id = action.payload.nodeId;
                const parentId = id.substr(0, id.length - 1);
                const ownSide = id.substr(id.length - 1, id.length);
                const currentNodeParent = findNodeByNodeId(parentId, currentTab);
                if (currentNodeParent === undefined) {
                    console.log("current node parent not found");
                    return state;
                }
                const siblingNode = ownSide === 'a' ? currentNodeParent.b : currentNodeParent.a;

                if (siblingNode === undefined) {
                    console.log("current node sibling not found");
                    return state;
                }

                currentNodeParent.a = undefined;
                currentNodeParent.b = undefined;
                currentNodeParent.split = undefined;
                currentNodeParent.percent = undefined;
                if(newState.nodeToWindow[action.payload.nodeId]) {
                    newState.windowToNode[newState.nodeToWindow[action.payload.nodeId]] = undefined;
                    newState.nodeToWindow[action.payload.nodeId] = undefined;
                }
                if(newState.nodeToWindow[siblingNode.id]) {
                    newState.nodeToWindow[parentId] = newState.nodeToWindow[siblingNode.id];
                    newState.nodeToWindow[siblingNode.id] = undefined;
                    newState.windowToNode[newState.nodeToWindow[parentId]] = parentId;
                }

                return newState;
            })();
        case MOVE_WINDOW_BETWEEN_NODES:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if (currentTab === undefined) {
                    console.log("current tab not found");
                    return state;
                }
                const oldNode = findNodeByNodeId(action.payload.oldNodeId, currentTab);
                const newNode = findNodeByNodeId(action.payload.newNodeId, currentTab); // TODO: old node not needed?
                if(!newNode || !oldNode) {
                    console.log("nodes do not exist");
                    return state;
                }
                newState.windowToNode[action.payload.windowId] = newNode.id;
                newState.nodeToWindow[action.payload.newNodeId] = action.payload.windowId;
                newState.nodeToWindow[action.payload.oldNodeId] = undefined;
                return newState;
            })();
        default:
            return state;
    }
}