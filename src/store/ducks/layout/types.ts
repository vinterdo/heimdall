// STATE

export interface ILayoutState {
    tabs: {
        [key: string]: ILayoutTab
    }
    windows: {
        [key: number]: {
            type: string
            params: any
            requestingParams: boolean
            title: string
        }
    }
    currentTab: string
    nextWindowId: number
}

export interface ILayoutTab {
    rootNode: ILayoutNode
    windowToNode: {
        [key: number]: string,
    },
    nodeToWindow: {
        [key: string]: number
    }
}

export interface ILayoutNode {
    a?: ILayoutNode,
    b?: ILayoutNode,
    id: string,
    splitValue?: number,
    split?: "vertical" | "horizontal"
}

// ACTIONS

export const SPLIT_NODE_VERTICALLY_ACTION = "SPLIT_NODE_VERTICALLY_ACTION";
export const SPLIT_NODE_HORIZONTALLY_ACTION = "SPLIT_NODE_HORIZONTALLY_ACTION";
export const CLOSE_NODE_ACTION = "CLOSE_NODE_ACTION";
export const MOVE_WINDOW_BETWEEN_NODES = "MOVE_WINDOW_BETWEEN_NODES";
export const OPEN_NEW_WINDOW = "OPEN_NEW_WINDOW";
export const CREATE_NEW_TAB = "CREATE_NEW_TAB";
export const SWITCH_TAB = "SWITCH_TAB";
export const UPDATE_SPLIT_VALUE = "UPDATE_SPLIT_VALUE";
export const CLOSE_TAB = "CLOSE_TAB";
export const CLOSE_WINDOW = "CLOSE_WINDOW";
export const SET_WINDOW_PARAMS = "SET_WINDOW_PARAMS";
export const SET_WINDOW_TITLE = "SET_WINDOW_TITLE";

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
        windowType: string,
        params: any,
        title: string
    }
}

export interface ICreateNewTab {
    type: typeof CREATE_NEW_TAB,
    payload: {
        tabName: string
    }
}

export interface ISwitchTab {
    type: typeof SWITCH_TAB,
    payload: {
        tabName: string
    }
}

export interface IUpdateSplitValue {
    type: typeof UPDATE_SPLIT_VALUE,
    payload: {
        nodeId: string,
        newSplit: number
    }
}

export interface ICloseTab {
    type: typeof CLOSE_TAB,
    payload: {
        tabName: string
    }
}
export interface ICloseWindow {
    type: typeof CLOSE_WINDOW,
    payload: {
        nodeId: string
    }
}

export interface ISetWindowTitle {
    type: typeof SET_WINDOW_TITLE,
    payload: {
        windowId: number,
        title: string
    }
}

export interface ISetWindowParams {
    type: typeof SET_WINDOW_PARAMS,
    payload: {
        windowId: number,
        params: any
    }
}

export type LayoutActionTypes =
    ICloseNodeAction |
    ISplitNodeHorizontallyAction |
    ISplitNodeVerticallyAction |
    IMoveNodeBetweenWindows |
    IOpenNewWindow |
    ICreateNewTab |
    ISwitchTab |
    IUpdateSplitValue |
    ICloseTab |
    ISetWindowParams |
    ICloseWindow |
    ISetWindowTitle;