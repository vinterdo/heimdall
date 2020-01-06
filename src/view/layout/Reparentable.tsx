import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface IReparentableStore {
    [key: string]: {
        mountNode:  HTMLElementTagNameMap["div"]
        inUse: boolean
    }
}

const store: IReparentableStore = {};

function getMountNode(uid: string) {
    if (!store[uid]) {
        store[uid] = {
            mountNode: document.createElement('div'),
            inUse: true
        };
    } else {
        store[uid].inUse = true;
    }

    return store[uid].mountNode;
}

function removeMountNode(uid: string) {
    const record = store[uid];

    record.inUse = false;

    setTimeout(() => {
        if (!store[uid].inUse) {
            ReactDOM.unmountComponentAtNode(store[uid].mountNode);
            delete store[uid];
        }
    }, 0);
}

interface IReparentableProps {
    uid: string;
    children: React.ReactElement
}

export default class Reparentable extends Component<IReparentableProps> {
    private el: any;
    componentDidMount() {
        const mountNode = getMountNode(this.props.uid);
        this.el.appendChild(mountNode);

        this.renderChildrenIntoNode(mountNode);
    }

    componentDidUpdate() {
        const mountNode = getMountNode(this.props.uid);
        this.renderChildrenIntoNode(mountNode);
    }

    componentWillUnmount() {
        removeMountNode(this.props.uid);
    }

    renderChildrenIntoNode(node: Element) {
        // We use this instead of `render` because this also handles
        // passing the context
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.props.children, node);
    }

    render() {
        return <div ref={(el) => { this.el = el; }}>

        </div>;
    }
}