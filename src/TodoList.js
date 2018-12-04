import React, { Component } from 'react';
import List from './List';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            items: []
        };
    }

    componentDidMount() {
        // Make the Ajax call
        console.log(`about to retrieve todos`);
        fetch(`/todos`)
            .then(r => r.json())
            .then(todoArray => {
                console.table(todoArray);
                // const todoNames = todoArray.map(todo => todo.name);
                this.setState({
                    items : todoArray.map(todo => todo.name)
                });
            })

    }

    render() {
        return (
            <div>
                <h1>Todo App</h1>
                <form onSubmit={this._onSubmit}>
                    <input 
                        value={this.state.term} 
                        onChange={this._onChange} 
                        placeholder="Enter Todo">
                    </input>
                    <button type="submit">ADD</button>
                </form>
                <div>
                    <List items = {this.state.items}/>
                </div>
            </div>
        );
    }

    _onChange = (event) => {
        this.setState ({
            term: event.target.value
        });
    }

    _onSubmit = (event) => {
        event.preventDefault();
        // console.log(`submit`);
        this.setState ({
            term: ``,
            items: [...this.state.items, this.state.term]
        });
    }
}

export default TodoList;