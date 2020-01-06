import React from 'react'

const Datalist = (props) => {

    const bgColor = (items) => {
        if (items.cycle) {
            return "red"
        } else if (items.duplicate || items.chain || items.fork) {
            return "orange"
        } else {
            return null
        }
    }

    const Rows = props.data.map((items, index) => {

        return (
                <div className="row m-2 p-2 listing" style={{ backgroundColor: bgColor(items) }} key={index}>
                    <div className="col-2">
                        {items.cycle ? <i className="fas fa-recycle p-1" style={{verticalAlign: "middle"}} title="cycle"></i> : ""}
                        {items.duplicate ? <i className="fas fa-clone p-1" style={{verticalAlign: "middle"}} title="duplicate"></i> : ""}
                        {items.chain ? <i className="fas fa-link p-1" style={{verticalAlign: "middle"}} title="chain"></i> : ""}
                        {items.fork ? <i className="fas fa-share-alt p-1" style={{verticalAlign: "middle"}} title="fork"></i> : ""}
                    </div>
                    <div className="col-4">
                        <input className="full-width" style={{ width: "100%" }} onChange={(event) => props.updateRow(index, event)} name="domain" defaultValue={items.domain} />
                    </div>
                    <div className="col-4">
                        <input className="full-width" style={{ width: "100%" }} onChange={(event) => props.updateRow(index, event)} name="range" defaultValue={items.range} />
                    </div>
                    <div className="col-2">
                        <button className="full-width" onClick={() => props.deleteRow(index)}>X</button>
                    </div>
                </div>
        )
    });

    return (
        <div className="container pt-3">
            <div className="row">
                <div className="col-2">
                </div>
                <div className="col-4">
                    <b>Domain</b>
                </div>
                <div className="col-4">
                    <b>Range</b>
                </div>
                <div className="col-2">
                </div>
            </div>
            {Rows}
        </div>
    );
}

export default Datalist