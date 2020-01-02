// STATE

export interface ILayoutState {
    tabs: { [key: string]: ILayoutNode }
}

export interface ILayoutNode {
    docked?: string,
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

export type LayoutActionTypes = ICloseNodeAction | ISplitNodeHorizontallyAction | ISplitNodeVerticallyAction;