import React from "react";
import Hotspots from "./Hotspots";
import { shallow, mount } from "enzyme";
var moment = require('moment');

describe("Hotspots", () => {

    const props = { revisions: [{ "name": "/README.md", "commits": 4 }, { "name": "/.gitlab/merge_request_templates/merge-request.md", "commits": 7 }, { "name": "/json-server/package-lock.json", "commits": 2 }, { "name": "/json-server/routes.json", "commits": 12 }, { "name": "/json-server/public/index.html", "commits": 1 }] };


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<Hotspots {...props} />);
        mountedComponent = mount(<Hotspots {...props} />);
        shallowInstance = shallowComponent.instance();
        mountedInstance = mountedComponent.instance();
    });

    describe('init()', () => {
        it('should create with no errors', () => {
            expect(shallowComponent).toMatchSnapshot();
            expect(mountedComponent).toMatchSnapshot();
        });
    });

});


