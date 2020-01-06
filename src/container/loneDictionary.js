import React, { Component } from 'react';
import { connect } from 'react-redux';
import { del_row, add_row, update_row, validate } from '../actions/index';
import Datalist from '../presentational/datalist';
import { Link } from 'react-router-dom'

class Lonedictionary extends Component {

    constructor(props) {
        super(props);
        this.deleteRow = this.deleteRow.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.props.dispatch(validate(this.props.match.params.id))
        this.state = {
            domain: '',
            range: ''
        };
    }

    deleteRow = (row) => {
        this.props.dispatch(del_row(this.props.match.params.id, row));
        this.props.dispatch(validate(this.props.match.params.id))
    }

    updateRow = (index, event) => {
        this.props.dispatch(update_row(this.props.match.params.id, index, event.target.name, event.target.value.trim()))
        this.props.dispatch(validate(this.props.match.params.id))
    }

    handleSubmit(event) {
        console.log(this.state.value);
        this.props.dispatch(add_row(this.props.match.params.id, this.state.domain, this.state.range));
        this.props.dispatch(validate(this.props.match.params.id))
        this.setState({ domain: '' });
        this.setState({ range: '' });

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        return (
            <div className="pt-4">
                <Link to="/overview">
                    <i className="fas fa-arrow-circle-left fa-lg"></i>
                </Link>
                <h3>{this.props.match.params.id}</h3>
                <Datalist data={this.props.dictionary.data} deleteRow={this.deleteRow} updateRow={this.updateRow} />

                <form onSubmit={this.handleSubmit} >
                    <div className="container pt-2">
                        <div className="row m-2 p-2">
                            <div style={{verticalAlign: "middle"}} className="col-2">
                                {this.props.dictionary.health === "critical" ? <i className="fas fa-times p-1" title="Fix Cycle"></i>  : <div><b>Add New Row</b></div>}
                            </div>

                            <div className="col-4">
                                <input name="domain" style={{ width: "100%" }} placeholder="domain" value={this.state.domain} disabled={this.props.dictionary.health === "critical"}  onChange={this.handleChange} />
                            </div>
                            <div className="col-4">
                                <input name="range" style={{ width: "100%" }} placeholder="range" value={this.state.range} disabled={this.props.dictionary.health === "critical"}  onChange={this.handleChange} />
                            </div>
                            <div className="col-2">
                                <button className="full-width" type="submit" value="Submit" disabled={!this.state.domain || !this.state.range}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        );
    }
}

const mapStateToProps = (state, Ownprops) => {
    return {
        dictionary: state.dictionaries[Ownprops.match.params.id]
    }
}

export default connect(mapStateToProps)(Lonedictionary)
