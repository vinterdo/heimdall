import {
    CLOSE_NODE_ACTION, CREATE_NEW_TAB, ILayoutNode,
    ILayoutState,
    LayoutActionTypes,
    MOVE_WINDOW_BETWEEN_NODES, OPEN_NEW_WINDOW,
    SPLIT_NODE_HORIZONTALLY_ACTION,
    SPLIT_NODE_VERTICALLY_ACTION, SWITCH_TAB
} from "./types";
import {findNodeByNodeId} from "./utils";

const initialState: ILayoutState = {
    tabs: {
        "default": {
            rootNode: {id: "", a: undefined, b: undefined},
            windowToNode: {},
            nodeToWindow: {},
        }
    },
    windowIdToType: {},
    currentTab: "default"
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
                const newState: ILayoutState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs[newState.currentTab];
                if (currentTab === undefined) {
                    console.error("current tab not found");
                    return state;
                }
                const id = action.payload.nodeId;
                const parentId = id.substr(0, id.length - 1);
                const ownSide = id.substr(id.length - 1, id.length);
                const currentNodeParent = findNodeByNodeId(parentId, currentTab.rootNode);
                if (currentNodeParent === undefined) {
                    console.error("current node parent not found");
                    return state;
                }
                const siblingNode = ownSide === 'a' ? currentNodeParent.b : currentNodeParent.a;

                if (siblingNode === undefined) {
                    console.error("current node sibling not found");
                    return state;
                }

                if (currentTab.nodeToWindow[action.payload.nodeId]) {
                    delete currentTab.windowToNode[currentTab.nodeToWindow[action.payload.nodeId]];
                    delete currentTab.nodeToWindow[action.payload.nodeId];
                }
                if (currentTab.nodeToWindow[siblingNode.id]) {
                    currentTab.nodeToWindow[parentId] = currentTab.nodeToWindow[siblingNode.id];
                    delete currentTab.nodeToWindow[siblingNode.id];
                    currentTab.windowToNode[currentTab.nodeToWindow[parentId]] = parentId;
                }

                // reduce sibling tree to parent
                function reduceNodeUp(node: ILayoutNode | undefined) {
                    if (!node) {
                        return;
                    }
                    if (node.a) {
                        const windowId = currentTab.nodeToWindow[node.a.id];
                        delete currentTab.nodeToWindow[node.a.id];
                        node.a.id = node.id + "a";
                        currentTab.nodeToWindow[node.a.id] = windowId;
                        currentTab.windowToNode[windowId] = node.a.id;
                    }
                    if (node.b) {
                        const windowId = currentTab.nodeToWindow[node.b.id];
                        delete currentTab.nodeToWindow[node.b.id];
                        node.b.id = node.id + "b";
                        currentTab.nodeToWindow[node.b.id] = windowId;
                        currentTab.windowToNode[windowId] = node.b.id;
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
                const newState: ILayoutState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs[newState.currentTab];
                if (currentTab === undefined) {
                    console.error("current tab not found");
                    return state;
                }
                currentTab.windowToNode[action.payload.windowId] = action.payload.newNodeId;
                currentTab.nodeToWindow[action.payload.newNodeId] = action.payload.windowId;
                delete currentTab.nodeToWindow[action.payload.oldNodeId];
                return newState;
            })();
        case OPEN_NEW_WINDOW:
            return (() => {
                const newState: ILayoutState = JSON.parse(JSON.stringify(state));
                const currentTab = newState.tabs[newState.currentTab];
                if (currentTab === undefined) {
                    console.error("current tab not found");
                    return state;
                }
                currentTab.nodeToWindow[action.payload.nodeId] = action.payload.windowId;
                currentTab.windowToNode[action.payload.windowId] = action.payload.nodeId;
                newState.windowIdToType[action.payload.windowId] = action.payload.windowType;
                return newState;
            })();
        case CREATE_NEW_TAB:
            return (() => {
                if (state.tabs[action.payload.tabName]) {
                    return state;
                }
                const newState: ILayoutState = JSON.parse(JSON.stringify(state));
                newState.tabs[action.payload.tabName] = {
                    rootNode: {id: "", a: undefined, b: undefined},
                    nodeToWindow : {},
                    windowToNode: {}
                };
                return newState;
            })();
        case SWITCH_TAB:
            return (() => {
                if (!state.tabs[action.payload.tabName]) {
                    return state;
                }
                const newState: ILayoutState = JSON.parse(JSON.stringify(state));
                newState.currentTab = action.payload.tabName;
                return newState;
            })();
        default:
            return state;
    }
}

function windowSplit(state: ILayoutState, nodeId: string, split: "horizontal" | "vertical") {
    const newState: ILayoutState = JSON.parse(JSON.stringify(state));
    const currentTab = newState.tabs[newState.currentTab];
    if (currentTab === undefined) {
        console.error("current tab not found");
        return state;
    }
    const currentNode = findNodeByNodeId(nodeId, currentTab.rootNode);
    if (currentNode === undefined) {
        console.error("current node not found");
        return state;
    }

    currentNode.a = Object.assign({}, currentNode);
    currentNode.a.id += "a";
    if (currentTab.nodeToWindow[currentNode.id]) {
        currentTab.nodeToWindow[currentNode.a.id] = currentTab.nodeToWindow[currentNode.id];
        delete currentTab.nodeToWindow[currentNode.id];

        currentTab.windowToNode[currentTab.nodeToWindow[currentNode.a.id]] = currentNode.id + "a";
    }
    currentNode.b = {id: currentNode.id + "b"};
    currentNode.split = split;
    currentNode.percent = 50;
    return newState;
}