import React from "react";
import Coupling from "./Coupling";
import { shallow, mount } from "enzyme";

describe("Coupling", () => {

    const props = { coupling: { "nodes": [{ "name": "BasketProduct.ts", "filename": "/src/app/interfaces/BasketProduct.ts" }, { "name": "environment.prod.ts", "filename": "/src/environments/environment.prod.ts" }], "edges": [{ "edge": ["/json-server/public/index.html", "/.gitlab/merge_request_templates/merge-request.md"], "weight": 1, "percent": 0.14285714285714285 }, { "edge": ["/json-server/public/index.html", "/json-server/package-lock.json"], "weight": 1, "percent": 0.5 }] } }


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<Coupling {...props} />);
        mountedComponent = mount(<Coupling {...props} />);
        shallowInstance = shallowComponent.instance();
        mountedInstance = mountedComponent.instance();
    });

    describe('init()', () => {
        it('should create with no errors', () => {
            expect(shallowComponent).toMatchSnapshot();
            expect(mountedComponent).toMatchSnapshot();
        });
    });

    describe('getOptions()', () => {
        it('should return layout object', () => {
            let options = {
                layout: {
                    hierarchical: false
                }
            }
            expect(mountedInstance.getOptions()).toEqual(options)
        });
    });

    describe('getEvents()', () => {
        it('should return stablized object', () => {
            expect(mountedInstance.getEvents()).toHaveProperty('stablized')
        });
    });

    describe('getCouplingData()', () => {
        it('should return all edges object', () => {
            let couplingDataObject = { "edges": [{ "arrows": { "from": { "enabled": false }, "to": { "enabled": false } }, "color": "#302e2c", "from": "/json-server/public/index.html", "title": "Weight: 1  Percent: 0.14285714285714285", "to": "/.gitlab/merge_request_templates/merge-request.md" }, { "arrows": { "from": { "enabled": false }, "to": { "enabled": false } }, "color": "#302e2c", "from": "/json-server/public/index.html", "title": "Weight: 1  Percent: 0.5", "to": "/json-server/package-lock.json" }], "nodes": [{ "color": "#ffbd54", "id": "/src/app/interfaces/BasketProduct.ts", "label": "BasketProduct.ts", "title": "/src/app/interfaces/BasketProduct.ts" }, { "color": "#ffbd54", "id": "/src/environments/environment.prod.ts", "label": "environment.prod.ts", "title": "/src/environments/environment.prod.ts" }] }
            expect(mountedInstance.getCouplingData()).toEqual(couplingDataObject)
        });


    });

    describe('getNode()', () => {
        it('should return the correct node object', () => {
            let nodeObject = { "filename": "/src/app/interfaces/BasketProduct.ts", "name": "BasketProduct.ts" }
            expect(mountedInstance.getNode("/src/app/interfaces/BasketProduct.ts")).toEqual(nodeObject)
        });
    });

    describe('getNodes()', () => {
        it('should return the node props in an array', () => {
            let nodeArray = [
                {
                    "color": "#ffbd54",
                    "id": "/src/app/interfaces/BasketProduct.ts",
                    "label": "BasketProduct.ts",
                    "title": "/src/app/interfaces/BasketProduct.ts",
                },
                {
                    "color": "#ffbd54",
                    "id": "/src/environments/environment.prod.ts",
                    "label": "environment.prod.ts",
                    "title": "/src/environments/environment.prod.ts",
                }
            ]
            expect(mountedInstance.getNodes()).toEqual(nodeArray)
        });
    });

    describe('getEdgesForNode()', () => {
        it('should return the edges for a node given the node', () => {
            let edgeArray = [
                {
                    "arrows": {
                        "from": {
                            "enabled": false,
                        },
                        "to": {
                            "enabled": false,
                        },
                    },
                    "color": "#302e2c",
                    "from": "/json-server/public/index.html",
                    "title": "Weight: 1  Percent: 0.14285714285714285",
                    "to": "/.gitlab/merge_request_templates/merge-request.md",
                },
                {
                    "arrows": {
                        "from": {
                            "enabled": false,
                        },
                        "to": {
                            "enabled": false,
                        },
                    },
                    "color": "#302e2c",
                    "from": "/json-server/public/index.html",
                    "title": "Weight: 1  Percent: 0.5",
                    "to": "/json-server/package-lock.json",
                }
            ]
            expect(mountedInstance.getEdgesForNode("/json-server/public/index.html")).toEqual(edgeArray)
        });
    });

    describe('getNodeTable()', () => {
        it('should return the nodeList', () => {
            let nodeArray = [
                {
                    "edges": [],
                    "node": {
                        "filename": "/src/app/interfaces/BasketProduct.ts",
                        "name": "BasketProduct.ts",
                    },
                },
                {
                    "edges": [],
                    "node": {
                        "filename": "/src/environments/environment.prod.ts",
                        "name": "environment.prod.ts",
                    },
                },
            ]
            expect(mountedInstance.getNodeTable()).toEqual(nodeArray)
        });
    });


});


