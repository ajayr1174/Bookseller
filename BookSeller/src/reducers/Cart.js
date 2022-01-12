export default (state=[],action)=>{
    switch(action.type)
    {
        case "LOAD_CART":
            const iscartav=JSON.parse(localStorage.getItem('root:cart'));
            
            if(iscartav)
            return [
                ...state,
                ...iscartav
            ]
            else return state
        case "ADD":
            let d=action.payload;
            let p=d.data;
            p.quantity=1;
            const cartdata=JSON.parse(localStorage.getItem("root:cart"));
            
            if(!cartdata)
            {
                localStorage.setItem('root:cart',JSON.stringify([p]));
            }            
            else
            {
                const index=cartdata.findIndex(item=>item._id===p._id);
                console.log(index)
                if(index===-1){

                const newarr=[p,...cartdata];
                localStorage.setItem('root:cart',JSON.stringify(newarr));

                return  [
                    ...newarr,
                ]
            }
                else 
                {
                    

                    cartdata[index].quantity+=1;
                    localStorage.setItem('root:cart',JSON.stringify(cartdata))
                    return [...cartdata];
                }
            }
        
        case "ADD_INC":
            const id=action.payload.data._id;
            const cart_item=JSON.parse(localStorage.getItem('root:cart'));
            const index=cart_item.findIndex((item)=>item._id===id);
            cart_item[index].quantity+=1;
            localStorage.setItem('root:cart',JSON.stringify(cart_item))
            return cart_item;

        case "DEL_INC":
            const id1=action.payload.data._id;
            const cart_item1=JSON.parse(localStorage.getItem('root:cart'));
            const index1=cart_item1.findIndex((item)=>item._id===id1);
            cart_item1[index1].quantity-=1;
            localStorage.setItem('root:cart',JSON.stringify(cart_item1))
            return cart_item1;

        case "DELETE":
            let d1=action.payload;
            let p1=d1.data;

            const newdata=state.filter((item)=>item._id!==p1._id);
            localStorage.setItem('root:cart',JSON.stringify(newdata))
            return [
                ...newdata
            ]
        default :
            return state
    }
}