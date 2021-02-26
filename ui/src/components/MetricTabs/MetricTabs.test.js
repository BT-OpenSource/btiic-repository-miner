

import React from "react";
import MetricTabs from "./MetricTabs";
import { shallow, mount } from "enzyme";

describe("MetricTabs", () => {

    const props = {
        inflightRequests: {},
        socketId: "socket-id-string",
        socketConnected: true,
        submitEvent: jest.fn(),
        return: jest.fn()
    }


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<MetricTabs {...props} />);
        mountedComponent = mount(<MetricTabs {...props} />);
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


