const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			vehicles: [],
			favorites: [],
            activeCategory: "people",
		},
		actions: {
			// Usamos funciones flecha y async/await para manejar la asincronía
			getPeople: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/people");
					if (!response.ok) throw new Error("Error cargando personajes");
					const data = await response.json();
					
					// La razón de usar setStore es para que React detecte el cambio de estado
					setStore({ people: data.results });
				} catch (error) {
					console.error("Error en getPeople:", error);
				}
			},

			getPlanets: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/planets");
					const data = await response.json();
					setStore({ planets: data.results });
				} catch (error) {
					console.error("Error en getPlanets:", error);
				}
			},

			getVehicles: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/vehicles");
					const data = await response.json();
					setStore({ vehicles: data.results });
				} catch (error) {
					console.error("Error en getVehicles:", error);
				}
			},

			// Lógica para favoritos (backend-like)
			addFavorite: (item) => {
				const store = getStore();
				// Verificamos si el item ya está en favoritos por su uid
				if (!store.favorites.find(fav => fav.uid === item.uid)) {
					setStore({ favorites: [...store.favorites, item] });
				}
			},

			deleteFavorite: (uid) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter(fav => fav.uid !== uid);
				setStore({ favorites: updatedFavorites });
			},

            changeCategory: (category) => {
                setStore({ activeCategory: category });
            },   
		}
	};
};

export default getState;