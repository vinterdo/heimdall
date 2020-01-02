import * as LayoutTypes from "./types";

export function closeNode(nodeId: string) : LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.CLOSE_NODE_ACTION,
        payload: {nodeId}
    }
}
export function splitNodeVertically(nodeId: string) : LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.SPLIT_NODE_VERTICALLY_ACTION,
        payload: {nodeId}
    }
}
export function splitNodeHorizontally(nodeId: string) : LayoutTypes.LayoutActionTypes {
    return {
        type: LayoutTypes.SPLIT_NODE_HORIZONTALLY_ACTION,
        payload: {nodeId}
    }
}