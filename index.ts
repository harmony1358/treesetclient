import {TreeSetController, TreeSetAPI, INode} from "./src";

const controller: TreeSetController = new TreeSetController(new TreeSetAPI("/api"));

$("#tree").jstree({

    core: {
        check_callback: (operation: string, node: INode, 
                         nodeParent: string, nodePosition: number, more: {}) => 

            controller.checkCallback(operation, node, nodeParent, nodePosition, more),

        data: (node: INode, callback: (nodes: INode[]) => void) => 
        
            controller.dataCallback(node, callback),

    },
    contextmenu: {

        select_node: true,
        
        items: {

            create: {

                label: "Create Child",
                action: (ref: any) => controller.createAction(ref),

            },

            edit: {

                label: "Edit Number",
                action: (ref: any) => controller.editAction(ref),

            },

            delete: {

                label: "Delete Branch",
                action: (ref: any) => controller.deleteAction(ref),

            },

        },
    },

    dnd: {

        copy: false,
        
        search_leaves_only: true,
    
    },
    
    plugins: ["contextmenu", "dnd"],

});

$("#tree").bind("move_node.jstree", (e, data: any) => {

    const node: INode = data.node;
    const parent: INode = $("#tree").jstree(true).get_node(data.parent);

    controller.updateAction(node, parent);

});

export default {TreeSetController, TreeSetAPI};
