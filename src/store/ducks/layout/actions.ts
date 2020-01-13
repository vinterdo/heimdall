import * as LayoutTypes from "./types";

export function closeNode(nodeId: string): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.CLOSE_NODE_ACTION,
        payload: {nodeId}
    }
}

export function splitNodeVertically(nodeId: string): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.SPLIT_NODE_VERTICALLY_ACTION,
        payload: {nodeId}
    }
}

export function splitNodeHorizontally(nodeId: string): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.SPLIT_NODE_HORIZONTALLY_ACTION,
        payload: {nodeId}
    }
}

export function moveWindowBetweenNodes(oldNodeId: string, newNodeId: string, windowId: number): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.MOVE_WINDOW_BETWEEN_NODES,
        payload: {
            oldNodeId,
            newNodeId,
            windowId
        }
    }
}

export function openNewWindow(nodeId: string, windowId: number, windowType: string, params: any): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.OPEN_NEW_WINDOW,
        payload: {
            nodeId,
            windowId,
            windowType,
            params
        }
    }
}

export function switchTab(tabName: string): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.SWITCH_TAB,
        payload: {
            tabName
        }
    }
}

export function createNewTab(tabName: string): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.CREATE_NEW_TAB,
        payload: {
            tabName
        }
    }
}

export function updateSplitValue(nodeId: string, newSplit: number): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.UPDATE_SPLIT_VALUE,
        payload: {
            nodeId,
            newSplit
        }
    }
}

export function closeTab(tabName: string): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.CLOSE_TAB,
        payload: {
            tabName
        }
    }
}

export function closeWindow(nodeId: string): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.CLOSE_WINDOW,
        payload: {
            nodeId
        }
    }
}

export function setWindowParams(windowId: number, params: any): LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.SET_WINDOW_PARAMS,
        payload: {
            windowId,
            params
        }
    }
}