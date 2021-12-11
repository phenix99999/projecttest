import { dateToFrench } from "../utils/date";
import SyncStorage from 'sync-storage';
 
const SET_ITEM_ID = 'SET_ITEM_ID';

export const setItemId = (data) => ({
    type: SET_ITEM_ID,
    data: data,
})


// Initial state
const initialState = {
    itemId: "",
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_ITEM_ID: {
            return {
                ...state,
                itemId: action.data,
            }
        }
      
        default:
            return state
    }
}

export default rootReducer