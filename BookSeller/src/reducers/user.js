const init_state={
    user:null,
    token:null,
    address:null
}
export default(state=init_state,action)=>{
    switch(action.type)
    {
        case "LOGIN":
            console.log(action)
            const {data}=action.payload;
            const token=data.token
            const user=data.user;
            const add=data.address
            localStorage.setItem('root:myshopping',JSON.stringify(data));
            return {
                ...state,
                token,
                user,
                adddress:add
            }
        case "IS_LOGIN":
            const item=JSON.parse(localStorage.getItem('root:myshopping'));
            if(item && item.token && item.user && item.user._id && item.user.name)
            {
                const tok=item.token;
                const user1=item.user;
                
                return ({
                    ...state,
                    token:tok,
                    user:user1
                })

            }
            else
            {
                return state;
            }
        case "LOGOUT":
            localStorage.removeItem('root:myshopping');
            return {
                init_state
            }
        default:
            return state;
    }
}