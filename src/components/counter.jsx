import React, { Component } from "react";

class Counter extends  Component {
    state = {
        count: 0
    };

    render() {
        return (
            <div>
                <h1>Hello World { this.formatCount() }</h1>
                <button>Increase</button>
            </div>
        );
    }

    formatCount() {
        const { count } = this.state;
        return count === 0 ? "Zero" : count;
    }
}

export default Counter;