import React from "react";
import RepoInput from "./RepoInput";
import { shallow, mount } from "enzyme";

describe("RepoInput", () => {

    const props = {
        socketId: "socket-id-string",
        socketConnected: true,
        onFormSubmit: jest.fn()
    }


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<RepoInput {...props} />);
        mountedComponent = mount(<RepoInput {...props} />);
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


