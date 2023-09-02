export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updatedCart = (state) => {
  //Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  )

  //Calculate shipping price (iF items price > 10000 XPF then shipping price = 0 else shipping price = 1000 XPF)
  state.shippingPrice = addDecimals(state.itemsPrice > 10000 ? 0 : 1000)

  //Calculate tax price (15% of items price)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
  //Calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice),
  )

  localStorage.setItem('cart', JSON.stringify(state))
  return state
}
