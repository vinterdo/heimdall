import {ILayoutNode} from "./types";

export const findNode = (id: string, layout: ILayoutNode) => {
    let node: ILayoutNode | undefined = layout;
    let i = 0;
    while (node !== undefined && node.id !== id) {
        if (node.id[i] === "a") {
            node = node.a;
        } else {
            node = node.b;
        }
        i++;
        if (i === 1000) {
            console.log("too deep!");
            break;
        }
    }
    console.log(node);
    return node;
};