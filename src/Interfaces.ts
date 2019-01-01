export interface ITreeNode {
    
    id: number;
    number: number;
    parentId: number;

}

export interface INode {

    id: string;
    parent: string;
    text: string;
    original: INode;
    compNumber: number;
    number: number;
    parentId: number;
    children: boolean;
    state?: any;

}
