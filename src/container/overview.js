import React, { Component } from 'react';
import { connect } from 'react-redux';
import DictionaryList from '../presentational/dictionaryList';
import { add_dict, del_dict } from '../actions/index';

class Overview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteDict = this.deleteDict.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        this.props.dispatch(add_dict(this.state.name));
        this.setState({ name: '' });
        event.preventDefault();
    }

    deleteDict = (name) => {
        this.props.dispatch(del_dict(name));
    }


    render() {

        return (
            <div className="pt-4">
                <h3>Dictionaries Overview</h3>

                <DictionaryList data={this.props.dictionaries} deleteDict={this.deleteDict} />

                <form onSubmit={this.handleSubmit}>
                    <div className="container pt-5">
                        <div className="row m-2 p-2">
                            <div className="col-2">
                            </div>
                            <div className="col-8">
                                <input placeholder="Enter Dictionary Name" style={{ width: "100%" }} value={this.state.name} onChange={this.handleChange} />
                            </div>
                            <div className="col-2">
                                <button className="full-width" type="submit" disabled={!this.state.name} style={{ width: "100%" }} value="Submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dictionaries: state.dictionaries,
    }
}

export default connect(mapStateToProps)(Overview)