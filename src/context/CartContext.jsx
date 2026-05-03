import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(item => item.id === action.product.id)
      if (existing) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(item => item.id !== action.id)
    case 'INCREMENT':
      return state.map(item =>
        item.id === action.id ? { ...item, qty: item.qty + 1 } : item
      )
    case 'DECREMENT':
      return state
        .map(item =>
          item.id === action.id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const count = items.reduce((sum, item) => sum + item.qty, 0)

  const addToCart = (product) => {
    dispatch({ type: 'ADD', product })
    setDrawerOpen(true)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        count,
        drawerOpen,
        setDrawerOpen,
        addToCart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
