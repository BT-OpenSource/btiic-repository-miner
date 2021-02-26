import React from "react";
import JobStatusTable from "./JobStatusTable";
import { shallow, mount } from "enzyme";
var moment = require('moment');

describe("JobStatusTable", () => {

    const activeCalls = [{ "name": "javafilestats", "status": "Completed", "startTime": moment("2020-05-20T10:47:51.788Z"), "finishedTime": moment("2020-05-20T10:47:51.788Z") }];

    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<JobStatusTable activeCalls={activeCalls} />);
        mountedComponent = mount(<JobStatusTable activeCalls={activeCalls} />);
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

