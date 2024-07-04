export const getPriceQueryParams = (searchParams, key, value) => {
    const hasValueInParam = searchParams.has(key);
  
    if (value && hasValueInParam) {
      searchParams.set(key, value);
    } else if (value) {
      searchParams.append(key, value);
    } else if (hasValueInParam) {
      searchParams.delete(key);
    }
  
    return searchParams;
  };


export const calculateOrderCost=(cartItems)=>{
  const itemsPrice=cartItems?.reduce(
    (acc,item)=>acc+ item.price * item.quantity,0
  )
}