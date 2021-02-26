import React from "react";
import Complexity from "./Complexity";
import { shallow, mount } from "enzyme";

describe("Complexity", () => {

    const props = {
        spaceComplexity: [{ name: "filename here 1", meanSpaces: 10, maxSpaces: 13 }, { name: "filename here 2", meanSpaces: 10, maxSpaces: 13 }, { name: "filename here 3", meanSpaces: 10, maxSpaces: 13 }]
    };


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<Complexity {...props} />);
        mountedComponent = mount(<Complexity {...props} />);
        shallowInstance = shallowComponent.instance();
        mountedInstance = mountedComponent.instance();
    });

    describe('init()', () => {
        it('should create with no errors', () => {
            expect(shallowComponent).toMatchSnapshot();
            expect(mountedComponent).toMatchSnapshot();
        });
    });

})
