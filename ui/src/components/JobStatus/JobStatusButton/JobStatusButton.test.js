import React from "react";
import JobStatusButton from "./JobStatusButton";
import { shallow, mount } from "enzyme";
var moment = require('moment');

describe("JobStatusButton", () => {

    const activeCalls = [{ "name": "javafilestats", "status": "Completed", "startTime": moment("2020-05-20T10:47:51.788Z"), "finishedTime": moment("2020-05-20T10:47:51.788Z") }];


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<JobStatusButton activeCalls={activeCalls} />);
        mountedComponent = mount(<JobStatusButton activeCalls={activeCalls} />);
        shallowInstance = shallowComponent.instance();
        mountedInstance = mountedComponent.instance();
    });

    describe('init()', () => {
        it('should create with no errors', () => {
            expect(shallowComponent).toMatchSnapshot();
            expect(mountedComponent).toMatchSnapshot();
        });
    });


    describe('handleClickOpen()', () => {
        it('should set open state to true', () => {
            const jobProgressButton = mountedComponent.find('.open-dialogue').first()
            jobProgressButton.simulate("click");
            expect(mountedComponent.find(".dialog").first().prop('open')).toEqual(true);
        });
    });

    describe('handleClickOpen()', () => {
        it('should set open state to true', () => {
            const jobProgressButton = mountedComponent.find('.open-dialogue').first()
            jobProgressButton.simulate("click");
            const closeJobProgress = mountedComponent.find('.close-dialog').first()
            closeJobProgress.simulate("click");
            expect(mountedComponent.find(".dialog").first().prop('open')).toEqual(false);
        });
    });

});


