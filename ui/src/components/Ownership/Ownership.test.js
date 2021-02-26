import React from "react";
import Ownership from "./Ownership";
import { shallow, mount } from "enzyme";

describe("Ownership", () => {

    const props = {
        ownership: [{ "name": "/documentation/js/libs/custom-elements.min.js", "total_revisions": 1, "owner": "Peter <peter@email.com>" }]
    }


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<Ownership {...props} />);
        mountedComponent = mount(<Ownership {...props} />);
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


