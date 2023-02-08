const SET_USER = "SET_USER";
const LOGOUT ="LOGOUT";
const SET_DARK_MODE ="SET_DARK_MODE";

const defaultState = {
currentUser: {},
isAuth: false,
currentMode:false,
}

export default function appReducer(state=defaultState,action: {
    mode: any;
    user: any;
     type: any 
}){
    switch(action.type){
        case SET_USER:
            return{
                ...state,
                currentUser:action.user,
                isAuth:true,

            }
            case LOGOUT:
                localStorage.removeItem("token");
            return{
                ...state,
                currentUser:{},
                isAuth: false,

            }
            case SET_DARK_MODE:
                return{
                    ...state,
                    currentMode:action.mode,
                    
    
                }
            
        default:
            return state;
    }
}

export const setUser = (user: any) =>({type: SET_USER,user: user});
export const setDarkMode = (mode: any) =>({type: SET_DARK_MODE,mode: mode});
export const logout = () =>({type: LOGOUT});