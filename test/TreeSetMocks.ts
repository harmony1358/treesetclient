import * as fetchMock from "fetch-mock";
import * as TreeSet from "../src";

export const mockServer = () => {

    fetchMock.get("https://treeset-endpoint/api/get", 
    
        [
            { 
                id: 1, 
                parentId: null,
                number: 1,
            },
            { 
                id: 2, 
                parentId: null,
                number: 2,
            },
            { 
                id: 3, 
                parentId: null,
                number: 3,
            },
        ],
    );

};

export const restore = () => {

    fetchMock.restore();

};
