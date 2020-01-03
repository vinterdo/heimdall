import {ILayoutNode} from "./types";

export const findNodeByNodeId = (id: string, layout: ILayoutNode) => {
    let node: ILayoutNode | undefined = layout;
    let i = 0;
    while (node !== undefined && node.id !== id) {
        if (id.charAt(i) === 'a') {
            node = node.a;
        } else {
            node = node.b;
        }
        i++;
    }
    return node;
};
