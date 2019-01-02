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

    it ("Should return ITreeNode[] Promise when calling getNodes", () => {

        return treeSetAPI.getNodes(null)
                .catch ((error) => {
                    assert.isNotOk (error, "Promise rejected");
                });

    });

    after ( () => {

        TreeSetMocks.restore();

    });
});
