import { TreeSetAPI, ITreeNode } from ".";
import { INode } from "./Interfaces";

export default class TreeSetController {

    private api: TreeSetAPI;

    constructor(api: TreeSetAPI) {

        this.api = api;

    }

    public checkCallback(operation: string, node: INode, 
                         nodeParent: string, nodePosition: number, more: any): boolean {

        if (operation === "move_node") {

            return more.pos === "i" || more.pos === undefined ? true : false;

        }
        return false;
    }

    public dataCallback(node: INode, callback: (nodes: INode[]) => void ): void {

        if (node.id === "#") {

            callback([
                {
                    id: "null",
                    parent: "#",
                    text: "Root",
                    original: null,
                    compNumber: 0,
                    number: 0,
                    parentId: null,
                    children: true,
                },
            ]);

            return;
        }

        const parentId: number = node.id === "null" ? null : parseInt(node.id);
        const parentNumber: number = node.id === "null" ? 0 : node.original.compNumber;

        this.api.getNodes (parentId)
            .then ( (response) => response.map ( (v) => {

                const i: INode = this.createINode (v);
                const compNumber: number = parentNumber + i.number;

                i.parent = i.parentId == null ? "null" : i.parentId + "";
                i.compNumber = compNumber;
                i.text = v.number + " (" + compNumber + ")";
                i.children = true;

                return i; }))

            .then ( (map) => callback (map));

    }

    public editAction(ref: any): void {

        const node: INode = $("#tree").jstree(true).get_node(ref.reference);
        const num: number = node.original.number;
        const newNum = parseInt( prompt( "Enter new number", num + ""));

        if (isNaN(newNum)) { alert("Wprowadź liczbę!"); return; }

        this.api.update ({
                id: parseInt (node.original.id),
                parentId: node.original.parentId,
                number: newNum,
            })
            .then ( (response) => {

                const parentNode = $("#tree").jstree(true).get_node(node.parent);
                const compNumber = parentNode.original.compNumber + response.number;

                node.original.number = response.number;
                node.original.compNumber = compNumber;
                node.text = response.number + " (" + compNumber + ")";
                
                $("#tree").jstree(true).refresh_node(node);

            });
    
    }

    public deleteAction(ref: any): void {

        const node: INode = $("#tree").jstree(true).get_node(ref.reference);
        const parentNode: INode = $("#tree").jstree(true).get_node(node.parent);

        this.api.delete(parseInt(node.original.id))
            .then (() => $("#tree").jstree(true).refresh_node(parentNode));

    }

    public createAction(ref: any): void {

        const node: INode = $("#tree").jstree(true).get_node(ref.reference);
        const newNumber: number = parseInt(prompt("Enter new number", 0 + ""));

        if (isNaN(newNumber)) { alert("Wprowadź liczbę!"); return; }

        this.api.create({
                id: null,
                number: newNumber,
                parentId: node.id === "null" ? null : parseInt(node.original.id),
            })
            .then ( (response) => {

                node.state.opened = true;
                $("#tree").jstree(true).refresh_node(node);

            });
    }

    public updateAction(node: INode, parent: INode): void {

        this.api.update({

                id: parseInt(node.original.id),
                parentId: parseInt(parent.original.id),
                number: node.original.number,

            })
            .then ((response) => {

                parent.state.opened = true;
                $("#tree").jstree(true).refresh_node(parent);

            });

    }

    private createINode(treeNode: ITreeNode): INode {

        return {

            id: treeNode.id + "",
            parent: treeNode.parentId + "",
            text: "",
            original: null,
            compNumber: treeNode.number,
            number: treeNode.number,
            parentId: treeNode.parentId,
            children: true,           
        
        };

    }

}
