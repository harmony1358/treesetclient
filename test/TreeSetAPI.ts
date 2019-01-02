import * as Chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as TreeSet from "../src";
import * as yargs from "yargs";
import * as TreeSetMocks from "./TreeSetMocks";

Chai.use(chaiAsPromised);

const integrationUrl = yargs.argv.api;
const apiEndpoint: string = integrationUrl || "https://treeset-endpoint/api";

const should = Chai.should();
const expect = Chai.expect;
const assert = Chai.assert;

describe ("TreeSetAPI", () => {

    const treeSetAPI = new TreeSet.TreeSetAPI(apiEndpoint);

    before( () => {

        if (!integrationUrl) { TreeSetMocks.mockServer(); }

    });

    it ("Should properly set apiEndpoint", () => {

        treeSetAPI.apiEndpoint = apiEndpoint;
        expect(treeSetAPI.apiEndpoint).to.be.equal(apiEndpoint);

    });

    it ("Should return ITreeNode[] Promise when calling getNodes for Root node", () => {

        return treeSetAPI.getNodes(null)
                .catch ((error) => {
                    assert.isNotOk (error, "Promise rejected");
                });

    });

    it ("Should return ITreeNode[] Promise when calling getNodes for child node", () => {

        return treeSetAPI.getNodes(1)
                .then ((result: TreeSet.ITreeNode[]) => {
                    result.map((node) => expect(Number.isInteger(node.parentId)).to.be.true);
                })
                .catch ((error) => {
                    assert.isNotOk (error, "Promise rejected");
                });

    });

    it ("Should return ITreeNode Promise with id set for create action", () => {

        return treeSetAPI.create({
            id: null,
            number: 10,
            parentId: null,
        }).then ((result: TreeSet.ITreeNode) => {

            expect(Number.isInteger(result.id)).to.be.true;
        
        }).catch ((error) => {
            assert.isNotOk (error, "Promise rejected");
        });

    });

    it ("Should resolve update Promise", () => {

        return treeSetAPI.update({
            id: 1,
            number: 10,
            parentId: null,
        }).then ((result: TreeSet.ITreeNode) => {

            expect(result.number).to.be.equal(10);
        
        }).catch ((error) => {
            assert.isNotOk (error, "Promise rejected");
        });

    });

    it ("Should resolve delete promise", () => {

        return treeSetAPI.delete(1)
                .catch ((error) => {
                    assert.isNotOk (error, "Promise rejected");
                });

    });

    after ( () => {

        TreeSetMocks.restore();

    });
});
