import { dateToFrench } from "../utils/date";
import SyncStorage from 'sync-storage';
 
const SET_VIEW_MODE = 'SET_ITEM_ID';
const SET_TWEET_MUSIC = 'SET_TWEET_MUSIC';
const SET_TWEET_MOVIE = 'SET_TWEET_MOVIE';


export const setViewMode = (data) => ({
    type: SET_VIEW_MODE,
    data: data,
})

export const setTweetMusic = (data) => ({
    type: SET_TWEET_MUSIC,
    data: data,
})


export const setTweetMovie = (data) => ({
    type: SET_TWEET_MOVIE,
    data: data,
})




// Initial state
const initialState = {
    viewMode: "Movie Star",
    tweetMusic: [
        {id:1,author:"Linkin Park", tweet:"This is the tweet of linkin park"},
        {id:2,author:"Eminem",   tweet:"This is the tweet of Eminem"},
        {id:3,author:"Celine Dion", tweet:"This is the tweet of Celine Dion"}
        ],
tweetMovie: [
            {id:4,author:"Leonardo Dicaprio", tweet:"This is the tweet movie of Leonardo Dicaprio"},
            {id:5,author:"Denzel Washington",   tweet:"This is the tweet of Denzel Washington"},
            {id:6,author:"Dwayne Johnson", tweet:"This is the the tweet of Dwayne Johnson"}
        ],


        tweetOriginalMusic: [
            {id:1,author:"Linkin Park", tweet:"This is the tweet of linkin park"},
            {id:2,author:"Eminem",   tweet:"This is the tweet of Eminem"},
            {id:3,author:"Celine Dion", tweet:"This is the tweet of Celine Dion"}
            ],
    tweetOriginalMovie: [
                {id:4,author:"Leonardo Dicaprio", tweet:"This is the tweet movie of Leonardo Dicaprio"},
                {id:5,author:"Denzel Washington",   tweet:"This is the tweet of Denzel Washington"},
                {id:6,author:"Dwayne Johnson", tweet:"This is the the tweet of Dwayne Johnson"}
            ],

}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_VIEW_MODE: {
            return {
                ...state,
                viewMode: action.data,
            }
        }

        case SET_TWEET_MOVIE: {
            return {
                ...state,
                tweetMovie: action.data,
            }
        }


        case SET_TWEET_MUSIC: {
            return {
                ...state,
                tweetMusic: action.data,
            }
        }

      
        default:
            return state
    }
}

export default rootReducer