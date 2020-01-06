import {
    CLOSE_NODE_ACTION, ILayoutNode,
    ILayoutState,
    LayoutActionTypes,
    MOVE_WINDOW_BETWEEN_NODES, OPEN_NEW_WINDOW,
    SPLIT_NODE_HORIZONTALLY_ACTION,
    SPLIT_NODE_VERTICALLY_ACTION
} from "./types";
import {findNodeByNodeId} from "./utils";

const initialState: ILayoutState = {
    tabs: {
        "default": {id: "", a: undefined, b: undefined}
    },
    windowToNode: {
    },
    nodeToWindow: {
    },
    windowIdToType: {
    }
};

export default function layoutReducer(state = initialState, action: LayoutActionTypes): ILayoutState {
    switch (action.type) {
        case SPLIT_NODE_HORIZONTALLY_ACTION:
            return windowSplit(state, action.payload.nodeId, "horizontal");
        case SPLIT_NODE_VERTICALLY_ACTION:
            return windowSplit(state, action.payload.nodeId, "vertical");
        case CLOSE_NODE_ACTION:
            /*
                cases here:
                1. closed node is empty, sibling is empty
                2. closed node is full, sibling is empty
                3. closed noe is empty, sibling has window
                4. closed node is empty, sibling has childs
             */
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if (currentTab === undefined) {
                    console.error("current tab not found");
                    return state;
                }
                const id = action.payload.nodeId;
                const parentId = id.substr(0, id.length - 1);
                const ownSide = id.substr(id.length - 1, id.length);
                const currentNodeParent = findNodeByNodeId(parentId, currentTab);
                if (currentNodeParent === undefined) {
                    console.error("current node parent not found");
                    return state;
                }
                const siblingNode = ownSide === 'a' ? currentNodeParent.b : currentNodeParent.a;

                if (siblingNode === undefined) {
                    console.error("current node sibling not found");
                    return state;
                }

                if (newState.nodeToWindow[action.payload.nodeId]) {
                    newState.windowToNode[newState.nodeToWindow[action.payload.nodeId]] = undefined;
                    newState.nodeToWindow[action.payload.nodeId] = undefined;
                }
                if (newState.nodeToWindow[siblingNode.id]) {
                    newState.nodeToWindow[parentId] = newState.nodeToWindow[siblingNode.id];
                    newState.nodeToWindow[siblingNode.id] = undefined;
                    newState.windowToNode[newState.nodeToWindow[parentId]] = parentId;
                }

                // reduce sibling tree to parent
                function reduceNodeUp(node: ILayoutNode | undefined) {
                    if (!node) {
                        return;
                    }
                    if (node.a) {
                        const windowId = newState.nodeToWindow[node.a.id];
                        newState.nodeToWindow[node.a.id] = undefined;
                        node.a.id = node.id + "a";
                        newState.nodeToWindow[node.a.id] = windowId;
                        newState.windowToNode[windowId] = node.a.id;
                    }
                    if (node.b) {
                        const windowId = newState.nodeToWindow[node.b.id];
                        newState.nodeToWindow[node.b.id] = undefined;
                        node.b.id = node.id + "b";
                        newState.nodeToWindow[node.b.id] = windowId;
                        newState.windowToNode[windowId] = node.b.id;
                    } else {

                    }
                    reduceNodeUp(node.a);
                    reduceNodeUp(node.b);
                }

                currentNodeParent.a = siblingNode.a;
                currentNodeParent.b = siblingNode.b;
                currentNodeParent.split = siblingNode.split;
                currentNodeParent.percent = siblingNode.percent;
                reduceNodeUp(currentNodeParent);

                return newState;
            })();
        case MOVE_WINDOW_BETWEEN_NODES:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if (currentTab === undefined) {
                    console.error("current tab not found");
                    return state;
                }
                const oldNode = findNodeByNodeId(action.payload.oldNodeId, currentTab);
                const newNode = findNodeByNodeId(action.payload.newNodeId, currentTab); // TODO: old node not needed?
                if (!newNode || !oldNode) {
                    console.error("nodes do not exist");
                    return state;
                }
                newState.windowToNode[action.payload.windowId] = newNode.id;
                newState.nodeToWindow[action.payload.newNodeId] = action.payload.windowId;
                newState.nodeToWindow[action.payload.oldNodeId] = undefined;
                return newState;
            })();
        case OPEN_NEW_WINDOW:
            return (() => {
                const newState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs["default"];
                if (currentTab === undefined) {
                    console.error("current tab not found");
                    return state;
                }
                newState.nodeToWindow[action.payload.nodeId] = action.payload.windowId;
                newState.windowToNode[action.payload.windowId] = action.payload.nodeId;
                newState.windowIdToType[action.payload.windowId] = action.payload.windowType;
                return newState;
            })();

        default:
            return state;
    }
}

function windowSplit(state: ILayoutState, nodeId:string, split : "horizontal" | "vertical") {
    const newState = JSON.parse(JSON.stringify(state));
    const currentTab = newState.tabs["default"];
    if (currentTab === undefined) {
        console.error("current tab not found");
        return state;
    }
    const currentNode = findNodeByNodeId(nodeId, currentTab);
    if (currentNode === undefined) {
        console.error("current node not found");
        return state;
    }

    currentNode.a = Object.assign({}, currentNode);
    currentNode.a.id += "a";
    if (newState.nodeToWindow[currentNode.id]) {
        newState.nodeToWindow[currentNode.a.id] = newState.nodeToWindow[currentNode.id];
        newState.nodeToWindow[currentNode.id] = undefined;

        newState.windowToNode[newState.nodeToWindow[currentNode.a.id]] = currentNode.id + "a";
    }
    currentNode.b = {id: currentNode.id + "b"};
    currentNode.split = split;
    currentNode.percent = 50;
    return newState;
}