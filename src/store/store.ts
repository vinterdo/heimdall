import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as layoutDuck from "./ducks/layout";

const rootPersistConfig = {
    key: "root",
    storage,
    whitelist: []
};

const appReducer = combineReducers({
    layout: layoutDuck.reducer,
});

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};

export type AppState = ReturnType<typeof rootReducer>;

export type AppAction = layoutDuck.types.LayoutActionTypes;

export default function configureStore() {
    const middlewares = [];
    if (process.env.NODE_ENV !== "production") {
        middlewares.push(logger);
    }
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(persistReducer(rootPersistConfig, rootReducer), middlewareEnhancer);
    const persistor = persistStore(store);

    return { store, persistor };
}