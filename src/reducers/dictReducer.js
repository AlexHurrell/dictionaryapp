let defaultState = {
    "Apple iPhone 6s": {
        health: "warning",
        data: [
            { domain: "Stonegrey", range: "Dark Grey", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Dark Grey", range: "Anthracite", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Midnight Blue", range: "Dark Blue", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Dark Grey", range: "Anthracite", duplicate: false, chain: false, cycle: false, fork: false },
       ]
    },

    "Samsung Galaxy S8": {
        health: "critical",
        data: [
            { domain: "Caribbean Sea", range: "Turqouise", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Stonegrey", range: "Dark Grey", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Turqouise", range: "Caribbean Sea", duplicate: false, chain: false, cycle: false, fork: false },
        ]
    },

    "Huawei P9 Silver": {
        health: "good",
        data: [
            { domain: "Stonegrey", range: "Blue", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Red", range: "Orange", duplicate: false, chain: false, cycle: false, fork: false },
        ]
    },

    "Samsung Galaxy S11": {
        health: "warning",
        data: [
            { domain: "Caribbean Sea", range: "Turqouise", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Stonegrey", range: "Dark Grey", duplicate: false, chain: false, cycle: false, fork: false },
            { domain: "Caribbean Sea", range: "Brown", duplicate: false, chain: false, cycle: false, fork: false },
        ]
    },
};

const dict = (state = defaultState, action) => {

    let updated = Object.assign({}, state);
    let health = "good";

    switch (action.type) {
        case 'ADD_DICT':
            updated[action.id] = {
                health: "good",
                data: [
                    { domain: "foo", range: "bar", duplicate: false, chain: false, cycle: false, fork: false }
                ]
            }
            return updated

        case 'DEL_DICT':
            delete updated[action.id]
            return updated

        case 'ADD_ROW':
            updated[action.id].data.push({ domain: action.domain, range: action.range, duplicate: false, chain: false, cycle: false, fork: false });
            return updated

        case 'DEL_ROW':
            let dictionarydata = updated[action.id].data.filter((el, index) => index !== action.index)

            let dictionary = {
                [action.id]: {
                    health: action.id["health"],
                    data: dictionarydata
                }
            }

            console.log(dictionary)

            return { ...state, ...dictionary }

        case 'UPDATE_ROW':
            var newData = updated[action.id].data
            
            newData[action.index] = action.column === 'range' ?
                ({ domain: updated[action.id].data[action.index]["domain"], range: action.value, duplicate: false, chain: false, cycle: false, fork: false }) :
                ({ domain: action.value, range: updated[action.id].data[action.index]["range"], duplicate: false, chain: false, cycle: false, fork: false });
            
            return {
                ...state,
                [action.id]: {
                    health: health,
                    data: [...newData]
                }
            };
            
        case 'VALIDATE':
            var newData = updated[action.id].data;

            for (let i = 0; i < newData.length; i++) {
                newData[i].duplicate = false;
                newData[i].chain = false;
                newData[i].cycle = false;
                newData[i].fork = false;
            }

            health = "good";

            for (let i = 0; i < newData.length; i++) {
                for (let j = i + 1; j < newData.length; j++) {
                    if (newData[i].domain === newData[j].domain) {
                        if (newData[i].range === newData[j].range) {
                            newData[i].duplicate = true
                            newData[j].duplicate = true
                            health = "warning";
                        }
                    }
                    if (newData[i].domain === newData[j].domain) {
                        if (newData[i].range !== newData[j].range) {
                            newData[i].fork = true
                            newData[j].fork = true
                            health = "warning";
                        }
                    }
                    if (newData[i].domain === newData[j].range) {
                        if (newData[i].range === newData[j].domain) {
                            newData[i].cycle = true
                            newData[j].cycle = true
                            health = "critical";
                        }
                    }
                    if (newData[i].range === newData[j].domain) {
                        if (newData[i].domain !== newData[j].range) {
                            newData[i].chain = true
                            newData[j].chain = true
                            health = "warning";
                        } 
                    } else if (newData[i].range !== newData[j].domain) {
                        if (newData[i].domain === newData[j].range) {
                            newData[i].chain = true
                            newData[j].chain = true
                            health = "warning";
                        }         
                    }
                }
            }

            return {
                ...state,
                [action.id]: {
                    health: health,
                    data: [...newData]
                }
            };

        default:
            return state
    }
}

export default dict