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

    fetchMock.get("https://treeset-endpoint/api/get/1", 
    
        [
            { 
                id: 4, 
                parentId: 1,
                number: 1,
            },
            { 
                id: 5, 
                parentId: 1,
                number: 2,
            },
            { 
                id: 6, 
                parentId: 1,
                number: 3,
            },
        ],
    );

    fetchMock.post("https://treeset-endpoint/api/create", 
    
        { 
            id: 4, 
            parentId: null,
            number: 10,
        },

    );  

    fetchMock.put("https://treeset-endpoint/api/update", 
    
        { 
            id: 4, 
            parentId: null,
            number: 10,
        },

    );
    
    fetchMock.delete("https://treeset-endpoint/api/delete/1", {});
};

export const restore = () => {

    fetchMock.restore();

};
