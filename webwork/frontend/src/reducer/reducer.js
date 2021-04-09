import * as actionTypes from '../actions/actions';

const initialState ={
	user:null,
	active:null,
	pending:null,
	resolved:null,
	loading:false
}

const reducer = (state = initialState,action) =>{
	switch (action.type) {
		case actionTypes.CHANGE_USER:
		{
			// console.log("userInfo edited")
			return{
				...state,
				user:action.user
			}
		}
		case actionTypes.CHANGE_ACTIVE:
		{
			// console.log("userInfo edited")
			return{
				...state,
				active:action.active
			}
		}
		case actionTypes.CHANGE_PENDING:
		{
			// console.log("userInfo edited")
			return{
				...state,
				pending:action.pending
			}
		}
		case actionTypes.CHANGE_RESOLVED:
		{
			// console.log("userInfo edited")
			return{
				...state,
				resolved:action.resolved
			}
		}
		
	}
	return state;
};

export default reducer;