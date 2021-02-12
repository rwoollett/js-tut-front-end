import { SEARCH_REQUEST, SEARCH_SUCCESS } from '../actions/actions';
import { AnyAction } from 'redux';
import { createSlice } from '@reduxjs/toolkit'

export interface IHomePageState {
    searchResults: string[];
    hits: number;
    currentQuery: string;
}

const initialState:IHomePageState = {
    searchResults: ['Hi there', 'Sea'],
    hits: 0,
    currentQuery: ""
};

// const searchSlice = createSlice({
//     name: 'search',
//     initialState,
//     reducers: {}
//   })
  
// export default searchSlice.reducer;

export default function searchReducer(
    state: IHomePageState|undefined, action: AnyAction ): 
      IHomePageState {
    if (typeof state === 'undefined') {
        return initialState;
    }
    //const clone = (items:any) => 
    //  items.map( (item:any) => Array.isArray(item) ? clone(item) : item);
    // const items = [0,[1],3];
    // const netItems = clone(items);
    //const newState = clone(state);
    switch(action.type){
        case SEARCH_REQUEST:
            return {
                ...state,
                searchResults: [...state.searchResults],
                currentQuery: action.payload,
            };

        case SEARCH_SUCCESS:
            if(state.currentQuery === action.payload.query){
                return {
                    ...state,
                    hits: action.payload.hits,
                    searchResults: [...action.payload.results]
                };
            } else {
                return {
                    ...state,
                    searchResults: [...state.searchResults] 
                };
            }
        default:
            return {
                ...state,
                searchResults: [...state.searchResults] 
            };
    }
}
