export const add_dict = id => ({
    type: 'ADD_DICT',
    id
})

export const del_dict = id => ({
    type: 'DEL_DICT',
    id
})

export const add_row = (id, domain, range) => ({
    type: 'ADD_ROW',
    id,
    domain,
    range
})

export const del_row = (id, index) => ({
    type: 'DEL_ROW',
    id,
    index
})

export const update_row = (id, index, column, value) => ({
    type: 'UPDATE_ROW',
    id,
    index,
    column,
    value
})

export const validate = id => ({
    type: 'VALIDATE',
    id,
})


