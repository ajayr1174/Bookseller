export default(state=[],action)=>
{
    switch(action.type)
    {
        case "LOAD_ORDERS":
        {
            const {data}=action.payload;
            const newArr=[...data];
            return newArr

        }
        default: return state
    }
}