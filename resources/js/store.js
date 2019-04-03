import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "items"]
};
const persistedReducer = persistReducer(persistConfig, reducers);
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composer(applyMiddleware(thunk)));

export default store;
export const persistor = persistStore(store);
