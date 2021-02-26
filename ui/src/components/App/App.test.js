import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";

describe("App", () => {

  const props = {}

  let shallowComponent;
  let mountedComponent;
  let shallowInstance;
  let mountedInstance;

  beforeEach(() => {
    shallowComponent = shallow(<App {...props} />);
    mountedComponent = mount(<App {...props} />);
    shallowInstance = shallowComponent.instance();
    mountedInstance = mountedComponent.instance();
  });

  describe('init()', () => {
    it('should create with no errors', () => {
      expect(shallowComponent).toMatchSnapshot();
      expect(mountedComponent).toMatchSnapshot();
    });
  });

  describe('changeState()', () => {
    it('should set repoSelected state to false', () => {
      mountedInstance.setState({ repoSelected: true });
      mountedInstance.changeState();
      expect(mountedInstance.state.repoSelected).toBe(false);
    });
  });

  describe('onFormSubmit()', () => {
    it('should set state for repoSelected to true and set submitEvent to event', () => {
      mountedInstance.setState({ repoSelected: false });
      let event = { persist: jest.fn() };
      mountedInstance.onFormSubmit(event);
      expect(mountedInstance.state.repoSelected).toBe(true);
      expect(mountedInstance.state.submitEvent).toBe(event);
    });
  });

  describe('setInflight()', () => {
    it('should set inflightRequests state to the given inflightRequests', () => {
      let _inflightRequests = "string of inflight requests"
      mountedInstance.setInflight(_inflightRequests);
      expect(mountedInstance.state.inflightRequests).toBe(_inflightRequests);
    });
  });

  describe('socketConnected()', () => {
    it('should set socketConnected state to true', () => {
      mountedInstance.setState({ socketConnected: false });
      let event = {};
      mountedInstance.socketConnected(event);
      expect(mountedInstance.state.socketConnected).toBe(true);
    });
  });

  describe('socketMessage()', () => {
    it('should set socketId state to id when type is connect', () => {
      let id = "message-id"
      let type = "connect"
      let event = JSON.stringify({ type: type, id: id })
      mountedInstance.socketMessage(event);
      expect(mountedInstance.state.socketId).toBe(id);
    });

    it('should set inflightRequests state when type is callback', () => {

      let inflightRequest = { "/path-string/git-go-stats": {} }
      mountedInstance.setState({ inflightRequests: inflightRequest })

      let type = "callback"
      let path = "/path-string/git-go-stats"
      let data = JSON.stringify({ result: ["test", "data"] })

      let event = JSON.stringify({ type: type, path: path, data: data })
      mountedInstance.socketMessage(event);
      expect(mountedInstance.state.inflightRequests).toEqual({ "/path-string/git-go-stats": {} });
    });

    it('should not set inflightRequests state type is callback and incorrect path', () => {

      let inflightRequest = { "/path-string/git-language-metrics": {} }
      mountedInstance.setState({ inflightRequests: inflightRequest })

      let type = "callback"
      let path = "/path-string/git-go-stats"
      let data = JSON.stringify({ result: ["test", "data"] })

      let event = JSON.stringify({ type: type, path: path, data: data })
      mountedInstance.socketMessage(event);
      expect(mountedInstance.state.inflightRequests).not.toBe({ "/path-string/git-go-stats": {} });
      expect(mountedInstance.state.inflightRequests).not.toBe({ "/path-string/git-language-metrics": {} });
    });

    it('should not set inflightRequests or id when given an incorrect message', () => {
      mountedInstance.setState({ inflightRequests: [] })
      let event = JSON.stringify({ incorrect: "incorrect" })
      mountedInstance.socketMessage(event);
      expect(mountedInstance.state.inflightRequests.length).toBe(0);
    });
  });

});


