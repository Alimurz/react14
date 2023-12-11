import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import todoReducer from "./todo/reducer";
import todoFilterReducer from "./todo-filter/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos: todoReducer,
  activeTodoFilter: todoFilterReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))