import { createContext, useContext, useReducer, useEffect } from 'react';

//Crear el contexto
const CartContext = createContext();

//Clave para localStorage
const CART_STORAGE_KEY = 'sneakers_cart';

//Funcion para calcular totales
function calculateTotals(state) {
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return {
        ...state,
        itemCount,
        total
    };
}

//Funcion para obtener el estado inicial desde localStorage
const getInitialState = () => {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            console.log('Loading cart from localStorage:', parsedCart);
            
            return calculateTotals(parsedCart);
        }
    } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
    }
    
    console.log('Using default initial state');
    return {
        items: [], //Array de productos en el carrito
        total: 0,  //Total del carrito
        itemCount: 0 //Cantidad total de items
    };
};

//Estado inicial del carrito
const initialState = getInitialState();

//Tipos de acciones
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART'
};

//Funcion reducer para manejar las acciones del carrito
function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM:
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                //Si el producto ya existe, aumentar la cantidad
                const updatedItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return calculateTotals({ ...state, items: updatedItems });
            } else {
                //Si es un producto nuevo, agregarlo con cantidad 1
                const newItem = { ...action.payload, quantity: 1 };
                const updatedItems = [...state.items, newItem];
                return calculateTotals({ ...state, items: updatedItems });
            }

        case CART_ACTIONS.REMOVE_ITEM:
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            return calculateTotals({ ...state, items: filteredItems });

        case CART_ACTIONS.UPDATE_QUANTITY:
            const updatedItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: Math.max(0, action.payload.quantity) }
                    : item
            ).filter(item => item.quantity > 0); //Eliminar items con cantidad 0
            return calculateTotals({ ...state, items: updatedItems });

        case CART_ACTIONS.CLEAR_CART:
            console.log('Reducer: CLEAR_CART action received');
            return {
                items: [],
                total: 0,
                itemCount: 0
            };

        default:
            return state;
    }
}

//Proovedor de informacion del carrito
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    //Guarda en localStorage cada vez que el estado cambie
    useEffect(() => {
        console.log('CartContext state changed:', state);
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error al guardar el carrito en localStorage:', error);
        }
    }, [state]);

    //Funciones para manipular el carrito
    const addToCart = (product) => {
        dispatch({
            type: CART_ACTIONS.ADD_ITEM,
            payload: product
        });
    };

    const removeFromCart = (productId) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_ITEM,
            payload: productId
        });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { id: productId, quantity }
        });
    };

    const clearCart = () => {
        console.log('clearCart called - clearing cart...');
        dispatch({
            type: CART_ACTIONS.CLEAR_CART
        });
        //Tambien limpiar localStorage
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
            console.log('localStorage cleared');
        } catch (error) {
            console.error('Error al limpiar el carrito del localStorage:', error);
        }
    };

    //Funcion para debuggear el localStorage 
    const debugCart = () => {
        console.log('Estado actual del carrito:', state);
        console.log('localStorage:', localStorage.getItem(CART_STORAGE_KEY));
    };

    const value = {
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        debugCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

//Hook personalizado para usar el contexto, CONTROL DE CARRITO ENTRE PAGINAS
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
}
