import { render } from "@testing-library/react";
import React, { Component } from "react";

class Array extends Component{

    testWords = "testing text";


    render() {
        console.log(this.testWords);
        return(
            <div>
                Hello this is the Testing Component.
            </div>
        );
    }
}

export default Array;