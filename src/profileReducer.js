import { ADD_PROFILE, REMOVE_PROFILE, CALCULATE_AVERAGE_AGE } from "./action";

const initialState = {
    profiles: [],
    averageAge: 0,
  };
  
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PROFILE:
        return {
          ...state,
          profiles: [...state.profiles, action.payload],
        };
        
        case REMOVE_PROFILE:
        return {...state, profiles: state.profiles.filter(profile => profile.id !== action.payload)} 

        case CALCULATE_AVERAGE_AGE:
        const totalAge = state.profiles.reduce((acc ,curr)=> acc + curr.age,0)
        const averageAge = state.profiles.length > 0 ? totalAge / state.profiles.length : 0
        
        return {...state, averageAge: averageAge}

        default:
            return state
    }

}
export default profileReducer;