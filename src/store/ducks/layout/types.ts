// STATE

export interface ILayoutState {
    tabs: {
        [key: string]: ILayoutNode,
    }
    windowToNode: {
        [key: number]: string,
    },
    nodeToWindow: {
        [key: string]: number
    }
    windowIdToType: {
        [key: number]: string
    }
}

export interface ILayoutNode {
    a?: ILayoutNode,
    b?: ILayoutNode,
    id: string,
    percent?: number,
    split?: "vertical" | "horizontal"
}

// ACTIONS

export const SPLIT_NODE_VERTICALLY_ACTION = "SPLIT_NODE_VERTICALLY_ACTION";
export const SPLIT_NODE_HORIZONTALLY_ACTION = "SPLIT_NODE_HORIZONTALLY_ACTION";
export const CLOSE_NODE_ACTION = "CLOSE_NODE_ACTION";
export const MOVE_WINDOW_BETWEEN_NODES = "MOVE_WINDOW_BETWEEN_NODES";
export const OPEN_NEW_WINDOW = "OPEN_NEW_WINDOW";

export interface ISplitNodeVerticallyAction {
    type: typeof SPLIT_NODE_VERTICALLY_ACTION
    payload: {
        nodeId: string
    }
}

export interface ISplitNodeHorizontallyAction {
    type: typeof SPLIT_NODE_HORIZONTALLY_ACTION
    payload: {
        nodeId: string
    }
}

export interface ICloseNodeAction {
    type: typeof CLOSE_NODE_ACTION
    payload: {
        nodeId: string
    }
}

export interface IMoveNodeBetweenWindows {
    type: typeof MOVE_WINDOW_BETWEEN_NODES
    payload: {
        oldNodeId: string
        newNodeId: string
        windowId: number
    }
}

export interface IOpenNewWindow {
    type: typeof OPEN_NEW_WINDOW,
    payload: {
        nodeId: string,
        windowId: number,
        windowType: string
    }
}

export type LayoutActionTypes = ICloseNodeAction | ISplitNodeHorizontallyAction | ISplitNodeVerticallyAction | IMoveNodeBetweenWindows | IOpenNewWindow;