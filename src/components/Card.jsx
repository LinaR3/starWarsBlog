import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

// IMPORTANTE: Agregar la palabra 'export' aquí abajo
export const Card = ({ item, type }) => {
    const { store, actions } = useContext(Context);
    
    const imageType = type === "people" ? "characters" : type;
    const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${item.uid}.jpg`;

    const isFavorite = store.favorites.some(fav => fav.uid === item.uid);

    return (
        <div className="min-w-[18rem] bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden m-2 shadow-xl flex-shrink-0">
            <img 
                src={imageUrl} 
                className="w-full h-64 object-cover" 
                alt={item.name}
                onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
            />
            <div className="p-4 text-center">
                <h5 className="text-xl font-bold text-white mb-4">{item.name}</h5>
                <div className="flex justify-between items-center">
                    <Link to={`/detail/${type}/${item.uid}`} className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition-all">
                        Learn more!
                    </Link>
                    <button 
                        onClick={() => isFavorite ? actions.deleteFavorite(item.uid) : actions.addFavorite(item)}
                        className="text-yellow-400 text-2xl hover:scale-125 transition-transform"
                    >
                        {isFavorite ? "★" : "☆"}
                    </button>
                </div>
            </div>
        </div>
    );
};