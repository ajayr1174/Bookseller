export default (state=[],action)=>{
    switch(action.type){
    case 'LOAD_BOOKS':
        const {data}=action.payload
        
        return [
            ...data,
            ...state
        ]
    default :
        return state
    }
}