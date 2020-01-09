import {
    CLOSE_NODE_ACTION,
    CLOSE_TAB,
    CREATE_NEW_TAB,
    ILayoutNode,
    ILayoutState,
    ILayoutTab,
    LayoutActionTypes,
    MOVE_WINDOW_BETWEEN_NODES,
    OPEN_NEW_WINDOW,
    SPLIT_NODE_HORIZONTALLY_ACTION,
    SPLIT_NODE_VERTICALLY_ACTION,
    SWITCH_TAB,
    UPDATE_SPLIT_VALUE
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
            return doCloseNode(state, action.payload.nodeId);
        case MOVE_WINDOW_BETWEEN_NODES:
            return doMoveWindowBetweenNodes(state, action.payload);
        case OPEN_NEW_WINDOW:
            return doOpenNewWindow(state, action.payload);
        case CREATE_NEW_TAB:
            return doCreateNewTab(state, action.payload.tabName);
        case SWITCH_TAB:
            return doSwitchTab(state, action.payload.tabName);
        case UPDATE_SPLIT_VALUE:
            return doUpdateSplitValue(state, action.payload.nodeId, action.payload.newSplit);
        case CLOSE_TAB:
            return doCloseTab(state, action.payload.tabName);
        default:
            return state;
    }
}

function copyState(oldState: ILayoutState): { newState: ILayoutState, currentTab: ILayoutTab } {
    const newState: ILayoutState = JSON.parse(JSON.stringify(oldState));
    const currentTab = newState.tabs[newState.currentTab];
    if (currentTab === undefined) {
        throw Error("current tab not found, state malformed");
    }
    return {newState, currentTab};
}

function doCloseTab(state: ILayoutState, tabName: string) {
    const {newState} = copyState(state);
    // 1. remove all windows on this tab
    Object.keys(newState.tabs[tabName].windowToNode).forEach((key: string) => {
        delete newState.windowIdToType[parseInt(key, 10)];
    });
    // 2. switch to previous tab
    const keys = Object.keys(state.tabs);
    if (keys.length === 1) {
        // 4. do not allow to close last tab
        return state;
    }
    const currentTabIndex = keys.indexOf(tabName);
    let nextTabIndex;
    if (currentTabIndex === keys.length - 1) {
        // if its last tab, switch to previous
        nextTabIndex = keys.length - 2;
    } else {
        // else switch to next tab
        nextTabIndex = currentTabIndex + 1;
    }
    newState.currentTab = keys[nextTabIndex];

    // 3. remove tab
    delete newState.tabs[tabName];
    return newState;
}

function doOpenNewWindow(state: ILayoutState, payload: { nodeId: string, windowId: number, windowType: string }) {
    const {nodeId, windowId, windowType} = payload;
    const {newState, currentTab} = copyState(state);
    currentTab.nodeToWindow[nodeId] = windowId;
    currentTab.windowToNode[windowId] = nodeId;
    newState.windowIdToType[windowId] = windowType;
    return newState;
}

function doCreateNewTab(state: ILayoutState, tabName: string) {
    if (state.tabs[tabName]) {
        return state;
    }
    const {newState} = copyState(state);
    newState.tabs[tabName] = {
        rootNode: {id: "", a: undefined, b: undefined},
        nodeToWindow: {},
        windowToNode: {}
    };
    newState.currentTab = tabName;
    return newState;
}

function doSwitchTab(state: ILayoutState, tabName: string) {
    if (!state.tabs[tabName]) {
        return state;
    }
    const {newState} = copyState(state);
    newState.currentTab = tabName;
    return newState;
}

function doCloseNode(state: ILayoutState, nodeId: string) {
    /*
        cases here:
        1. closed node is empty, sibling is empty
        2. closed node is full, sibling is empty
        3. closed noe is empty, sibling has window
        4. closed node is empty, sibling has childs
     */
    const {newState, currentTab} = copyState(state);
    const id = nodeId;
    const parentId = id.substr(0, id.length - 1);
    const ownSide = id.substr(id.length - 1, id.length);
    const currentNodeParent = findNodeByNodeId(parentId, currentTab.rootNode);
    if (currentNodeParent === undefined) {
        throw Error("current node parent not found");
    }
    const siblingNode = ownSide === 'a' ? currentNodeParent.b : currentNodeParent.a;

    if (siblingNode === undefined) {
        throw Error("current node sibling not found");
    }

    if (currentTab.nodeToWindow[nodeId]) {
        delete currentTab.windowToNode[currentTab.nodeToWindow[nodeId]];
        delete currentTab.nodeToWindow[nodeId];
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

        function handleChild(node: ILayoutNode | undefined, newId: string) {
            if (node) {
                const windowId = currentTab.nodeToWindow[node.id];
                delete currentTab.nodeToWindow[node.id];
                node.id = newId;
                currentTab.nodeToWindow[node.id] = windowId;
                currentTab.windowToNode[windowId] = node.id;
            }
        }

        handleChild(node.a, node.id + "a");
        handleChild(node.b, node.id + "b");
        reduceNodeUp(node.a);
        reduceNodeUp(node.b);
    }

    currentNodeParent.a = siblingNode.a;
    currentNodeParent.b = siblingNode.b;
    currentNodeParent.split = siblingNode.split;
    currentNodeParent.splitValue = siblingNode.splitValue;
    reduceNodeUp(currentNodeParent);

    return newState;
}

function doMoveWindowBetweenNodes(state: ILayoutState, payload: { oldNodeId: string, newNodeId: string, windowId: number }) {
    const {oldNodeId, newNodeId, windowId} = payload;
    const {newState, currentTab} = copyState(state);
    currentTab.windowToNode[windowId] = newNodeId;
    currentTab.nodeToWindow[newNodeId] = windowId;
    delete currentTab.nodeToWindow[oldNodeId];
    return newState;
}

function doUpdateSplitValue(state: ILayoutState, nodeId: string, newSplit: number): ILayoutState {
    const {newState, currentTab} = copyState(state);
    const currentNode = findNodeByNodeId(nodeId, currentTab.rootNode);
    if (currentNode === undefined) {
        throw Error("current node not found");
    }
    currentNode.splitValue = newSplit;
    return newState;
}

function windowSplit(state: ILayoutState, nodeId: string, split: "horizontal" | "vertical") {
    const {newState, currentTab} = copyState(state);
    const currentNode = findNodeByNodeId(nodeId, currentTab.rootNode);
    if (currentNode === undefined) {
        throw Error("current node not found");
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
    currentNode.splitValue = 50;
    return newState;
}