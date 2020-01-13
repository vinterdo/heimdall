import * as React from "react";

interface IWindowRegistryEntry<T> {
    windowNodeProducer: (params: T) => React.ReactElement
    name: string
    titleProducer?: (params: T) => string
    paramsViewProducer?: (onSubmit: (params: T) => void) => React.ReactElement
}

class WindowFactory {
    private templates: Map<string, IWindowRegistryEntry<any>> = new Map<string, IWindowRegistryEntry<any>>();
    private static currentId = 1;

    public addTemplate<T>(entry: IWindowRegistryEntry<T>) {
        if (this.templates.has(entry.name)) {
            throw Error("duplicated name " + entry.name)
        }
        this.templates.set(entry.name, entry);
    }

    public createWindow(name: string): { id: number, askForParams: boolean } {
        if (!this.templates.has(name)) {
            throw new Error("Template with name " + name + " is not registered");
        }
        const id = WindowFactory.currentId;
        WindowFactory.currentId++;
        const entry = this.templates.get(name);
        if (!entry) {
            throw new Error("Malformed state, this should never happen");
        }
        return {
            id,
            askForParams: entry.paramsViewProducer !== undefined
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