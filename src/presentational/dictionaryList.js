import React from 'react';
import { Link } from 'react-router-dom';

const DictionaryList = (props) => {

    const ArticleItems = Object.keys(props.data).map((items, index) => {

        const bgColor = (color) => {
            if (color === "warning") {
                return "orange"
            } else if (color === "good") {
                return "green"
            } else if (color === "critical") {
                return "red"
            }
        }

        return (
            <div className="row m-2 p-2 listing" key={index}>
                <div className="col-2" style={{ backgroundColor: bgColor(props.data[items].health) }} >
                    <div class="d-flex h-100">
                        <div class="align-self-center mx-auto">
                            {props.data[items].health === "warning" ? <i className="fas fa-exclamation align-self-center " title="Check Dictionary"></i> : ""}
                            {props.data[items].health === "critical" ? <i className="fas fa-times align-self-center " title="Can't Further Process Dictionary"></i> : ""}
                            {props.data[items].health === "good" ? <i className="fas fa-check align-self-center "  title="Dictionary is OK"></i> : ""}

                        </div>
                        </div>
                </div>
                <div className="col-8">
                    <Link to={`/dictionary/${items}`}>
                        <div class="d-flex h-100">
                            <div class="align-self-center mx-auto">
                                <h4 className="mb-0" style={{color: "black"}}>{items}</h4>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-2">
                    <button className="full-width" onClick={() => props.deleteDict(items)} >X</button>
                </div>
            </div>
        )
    });

    return (
        <div className="container pt-3">
            {ArticleItems}
        </div>
    );
}

export default DictionaryList