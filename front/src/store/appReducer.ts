const SET_USER = "SET_USER";
const LOGOUT ="LOGOUT";
const SET_DARK_MODE ="SET_DARK_MODE";
const USED_BY_ADMIN = 'USED_BY_ADMIN';
const ADMIN_DATA = "ADMIN_DATA";


const defaultState = {
currentUser: {},
isAuth: false,
currentMode:JSON.parse( localStorage.getItem("darkMode") as string )?JSON.parse( localStorage.getItem("darkMode") as string ):false,
usedByAdmin:false,
adminData:{
    email:'',
    password:'',
    name:'',
}
}

export default function appReducer(state=defaultState,action: {
    mode: any;
    user: any;
     type: any;
     foreign: any; 
     admin:any;
     data:any;
     
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
            case USED_BY_ADMIN:
                return{
                    ...state,
                    usedByAdmin:action.admin,
                    
    
                }
                case ADMIN_DATA:
                    return{
                        ...state,
                       adminData:action.data,
                        
        
                    }
            
        default:
            return state;
    }
}

export const setUser = (user: any) =>({type: SET_USER,user: user});
export const setDarkMode = (mode: any) =>({type: SET_DARK_MODE,mode: mode});
export const setUsedByAdmin = (admin: any) =>({type: USED_BY_ADMIN,admin: admin});
export const setAdminData = (data: any) =>({type: ADMIN_DATA,data: data});
export const logout = () =>({type: LOGOUT});