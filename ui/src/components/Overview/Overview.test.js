import React from "react";
import Overview from "./Overview";
import { shallow, mount } from "enzyme";

describe("Overview", () => {

    let props = {
        loc: 191162,
        files: 402,
        breakdown: [],
        developers: ["Merugu <merugu@email.com>", "Cassalger <cassalger@email.com>", "Steven <steven@email.com>", "Huw <huw@email.com>", "Samuel <samuel@email.com>", "Doherty <doherty@email.com>", "Calum <calum@email.com>", "Merugu <merugu@email.com>", "Mahesh <mahesh@email.com>", "Blair <Blair@email.com>", "Jenkins <jenkins@email.com>", "Phillips <phillips@email.com>"]
    }

    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        jest.mock('react-chartjs-2', () => 'Chart')
        shallowComponent = shallow(<Overview {...props} />);
        mountedComponent = mount(<Overview {...props} />);
        shallowInstance = shallowComponent.instance();
        mountedInstance = mountedComponent.instance();
    });

    describe('init()', () => {
        it('should create with no errors', () => {
            expect(shallowComponent).toMatchSnapshot();
            expect(mountedComponent).toMatchSnapshot();
        });
    });

    describe('fileBreakdown()', () => {
        it('should return a json object of breakdown', () => {
            let breakdownArray = [{ "name": "HTML", "loc": 102931, "numfiles": 136 }, { "name": "JSON", "loc": 30742, "numfiles": 37 }, { "name": "TypeScript", "loc": 27761, "numfiles": 149 }, { "name": "YAML", "loc": 3231, "numfiles": 1 }, { "name": "JavaScript", "loc": 3202, "numfiles": 37 }, { "name": "CSS", "loc": 2265, "numfiles": 32 }, { "name": "Bourne Shell", "loc": 90, "numfiles": 1 }, { "name": "Markdown", "loc": 60, "numfiles": 3 }, { "name": "DOS Batch", "loc": 7, "numfiles": 6 }]
            let breakdownObject = mountedInstance.fileBreakdown(breakdownArray)
            expect(Object.keys(breakdownObject)).toEqual(["labels", "datasets"])
        });
    });

    describe('linesBreakdown()', () => {
        it('should return a json object of breakdown', () => {
            let breakdownArray = [{ "name": "HTML", "loc": 102931, "numfiles": 136 }, { "name": "JSON", "loc": 30742, "numfiles": 37 }, { "name": "TypeScript", "loc": 27761, "numfiles": 149 }, { "name": "YAML", "loc": 3231, "numfiles": 1 }, { "name": "JavaScript", "loc": 3202, "numfiles": 37 }, { "name": "CSS", "loc": 2265, "numfiles": 32 }, { "name": "Bourne Shell", "loc": 90, "numfiles": 1 }, { "name": "Markdown", "loc": 60, "numfiles": 3 }, { "name": "DOS Batch", "loc": 7, "numfiles": 6 }]
            let breakdownObject = mountedInstance.linesBreakdown(breakdownArray)
            expect(Object.keys(breakdownObject)).toEqual(["labels", "datasets"])
        });
    });

    describe('getRandomColour()', () => {
        it('should return a colour string', () => {
            let color = mountedInstance.getRandomColour()
            let colorRegEx = /[0-9A-Fa-f]{6}/g
            expect(color).toMatch(colorRegEx);
        });
    });

    describe('getDeveloperNumber()', () => {
        it('should return the number of active developers', () => {
            expect(mountedInstance.getDeveloperNumber()).toMatch("12");
        });
    });

});


