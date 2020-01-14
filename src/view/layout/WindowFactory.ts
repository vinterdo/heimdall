import * as React from "react";

interface IWindowRegistryEntry<T> {
    windowNodeProducer: (params: T, changeTitle: (title: string) => void) => React.ReactElement
    name: string
    defaultTitle?: string
    paramsViewProducer?: (onSubmit: (params: T) => void, changeTitle: (title: string) => void) => React.ReactElement
}

class WindowFactory {
    private templates: Map<string, IWindowRegistryEntry<any>> = new Map<string, IWindowRegistryEntry<any>>();

    public addTemplate<T>(entry: IWindowRegistryEntry<T>) {
        if (this.templates.has(entry.name)) {
            throw Error("duplicated name " + entry.name)
        }
        this.templates.set(entry.name, entry);
    }

    public createWindow(windowTypeName: string, windowId: number): { id: number, askForParams: boolean, title: string } {
        if (!this.templates.has(windowTypeName)) {
            throw new Error("Template with name " + windowTypeName + " is not registered");
        }
        const entry = this.templates.get(windowTypeName);
        if (!entry) {
            throw new Error("Malformed state, this should never happen");
        }
        const title = entry.defaultTitle || "";
        return {
            id: windowId,
            askForParams: entry.paramsViewProducer !== undefined,
            title
        }
    }

    public getAvailableTemplates(): { name: string }[] {
        return Array.from(this.templates.keys()).map(name => {
            return {name}
        });
    }

    public getRenderer(name: string) {
        return this.templates.get(name)?.windowNodeProducer
    }

    public getParamsRenderer(name: string) {
        return this.templates.get(name)?.paramsViewProducer
    }
}

const windowFactory = new WindowFactory();

export default windowFactory;