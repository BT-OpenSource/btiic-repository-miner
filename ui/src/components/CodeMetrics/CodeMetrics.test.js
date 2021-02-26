import React from "react";
import CodeMetrics from "./CodeMetrics";
import { shallow, mount } from "enzyme";

describe("CodeMetrics", () => {

    const props = {
        javafilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        gofilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        cppfilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        jsfilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        swiftfilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        scalafilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        pythonfilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        rubyfilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        phpfilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        luafilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        ttcnfilestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }],
        ttcn3filestats: [{ "filename": "/json-server/public/main.js", "cyclomatic_complexity": 1, "num_lines": 1, "num_tokens": 6744 }]
    }


    let shallowComponent;
    let mountedComponent;
    let shallowInstance;
    let mountedInstance;

    beforeEach(() => {
        shallowComponent = shallow(<CodeMetrics {...props} />);
        mountedComponent = mount(<CodeMetrics {...props} />);
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


