import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    const categories = [
        { name: "Characters", slug: "people" },
        { name: "Planets", slug: "planets" },
        { name: "Vehicles", slug: "vehicles" }
    ];

    return (
        /* w-full y fixed top-0 son la clave para que se ajuste a toda la pantalla */
        <nav className="bg-black/80 backdrop-blur-xl border-b border-zinc-800 w-full fixed top-0 left-0 z-[100] shadow-2xl">
            {/* Contenedor fluido con padding responsivo */}
            <div className="w-full px-6 md:px-12 flex justify-between items-center h-20">
                
                {/* 1. Logo con brillo Galáctico */}
                <Link to="/" onClick={() => actions.changeCategory("people")}>
                    <img 
                        src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG34.png" 
                        alt="Star Wars Logo" 
                        className="h-8 md:h-10 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-500"
                    />
                </Link>

                {/* 2. Categorías con estilo Sci-Fi */}
                <div className="hidden lg:flex gap-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => actions.changeCategory(cat.slug)}
                            className={`text-[10px] tracking-[0.6em] uppercase font-black transition-all duration-300 relative group ${
                                store.activeCategory === cat.slug 
                                ? "text-red-600" 
                                : "text-zinc-500 hover:text-white"
                            }`}
                        >
                            {cat.name}
                            {/* Línea animada inferior */}
                            <span className={`absolute -bottom-2 left-0 h-[2px] bg-red-600 transition-all duration-500 ${
                                store.activeCategory === cat.slug ? "w-full" : "w-0 group-hover:w-full"
                            }`}></span>
                        </button>
                    ))}
                </div>

                {/* 3. Favoritos (Dossier Archive) */}
                <div className="relative group">
                    <button className="bg-transparent border border-zinc-700 hover:border-yellow-500 text-white text-[9px] tracking-[0.3em] font-bold py-3 px-6 transition-all duration-300 flex items-center gap-4">
                        FAVORITES 
                        <span className="text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-sm">
                            {store.favorites.length}
                        </span>
                    </button>

                    {/* Dropdown flotante */}
                    <ul className="absolute right-0 mt-4 w-72 bg-black/95 backdrop-blur-2xl border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hidden group-hover:block z-[110] animate-in fade-in slide-in-from-top-2">
                        {store.favorites.length === 0 ? (
                            <li className="p-6 text-center text-zinc-600 text-[10px] tracking-widest italic">ARCHIVE EMPTY</li>
                        ) : (
                            store.favorites.map((fav) => (
                                <li key={fav.uid} className="flex justify-between items-center p-4 hover:bg-zinc-900/50 border-b border-zinc-900 last:border-0">
                                    <span className="text-zinc-300 text-[10px] uppercase tracking-tighter truncate w-44">{fav.name}</span>
                                    <button 
                                        onClick={() => actions.deleteFavorite(fav.uid)}
                                        className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};