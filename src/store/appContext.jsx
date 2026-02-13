import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicializamos el contexto. Cualquier componente podrá importar este Consumer
export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// Este estado será compartido por toda la aplicación
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * La razón de esto:
			 * Aquí ejecutamos las acciones que queremos que ocurran nada más empezar.
			 * Equivale al componentDidMount o al inicio de un script de Python.
			 */
			state.actions.getPeople();
			state.actions.getPlanets();
			state.actions.getVehicles();
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;