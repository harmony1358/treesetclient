import "isomorphic-fetch";
import { ITreeNode } from "./Interfaces";

class TreeSetAPI {

    private API_ENDPOINT: string;

    constructor(apiEndpoint: string) {

        this.API_ENDPOINT = apiEndpoint;

    }

    public get apiEndpoint(): string { return this.API_ENDPOINT; }
    
    public set apiEndpoint(apiEndpoint: string) { this.API_ENDPOINT = apiEndpoint; }

    public create(node: ITreeNode): Promise<ITreeNode> {

        return fetch (this.API_ENDPOINT + "/create", {
            method: "post",
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify(node),
        }).then( (response: Response) => response.json() as Promise<ITreeNode> );

    }

    public update(node: ITreeNode): Promise<ITreeNode> {

        return fetch (this.API_ENDPOINT + "/create", {
            method: "post",
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify(node),
        }).then( (response: Response) => response.json() as Promise<ITreeNode> );

    }
    
    public delete(id: number): Promise<string> {
        return fetch (this.API_ENDPOINT + "/delete/" + id, {
            method: "post",
            headers: new Headers({contentType: "application/json"}),
        }).then( (response: Response) => response.text() as Promise<string> );
    }

    public getNodes(parentId: number): Promise<ITreeNode[]> {
        
        let endpoint = this.API_ENDPOINT + "/get";
        if (parentId != null) { endpoint += "/" + parentId; }

        return fetch (endpoint)
                .then ( (response: Response) => response.json() as Promise<ITreeNode[]> );
    }

}

export default TreeSetAPI;
