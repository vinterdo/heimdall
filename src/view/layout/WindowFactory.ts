class WindowFactory {
    private templates: Map<string, () => React.ReactElement> = new Map<string, () => React.ReactElement>();
    private static currentId = 1;

    public addTemplate(name: string, template: () => React.ReactElement ) {
        if(this.templates.has(name)) {
            throw Error("duplicated name " + name)
        }
        this.templates.set(name, template);
    }

    public createWindow(name: string): {id: number, window: React.ReactElement} {
        if(!this.templates.has(name)) {
            throw new Error("Template with name " + name + " is not registered");
        }
        const id = WindowFactory.currentId;
        WindowFactory.currentId++;
        const template = this.templates.get(name);
        if(!template) {
            throw new Error("dafuq");
        }
        return {
            id,
            window: template()
        }
    }

    public getAvailableTemplates() : {name: string}[] {
        return Array.from(this.templates.keys()).map(name => {return {name}});
    }

    public getRenderer(name: string) {
        return this.templates.get(name)
    }
}

const windowFactory = new WindowFactory();

export default windowFactory;