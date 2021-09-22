import React, { Component } from "react";

class Counter extends  Component {
    state = {
        count: 0
    };

    styles = {
        fontSize: 50,
        fontWeight: "bold"
    };

    render() {
        return (
            <div>
                <h1 style={ this.styles }>Hello World { this.formatCount() }</h1>
                <h1 style={{ fontSize: 30 }}>Hello World { this.formatCount() }</h1>
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