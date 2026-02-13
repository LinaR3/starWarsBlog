import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Spline from '@splinetool/react-spline';

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [scrollScale, setScrollScale] = useState(1);

    useEffect(() => {
        actions.getPeople();
        actions.getPlanets();
        actions.getVehicles();

        const handleScroll = () => {
            const value = window.scrollY;
            const newScale = 1 + value / 2000; // Zoom un poco más lento para que no maree
            setScrollScale(newScale);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const dataToShow = store[store.activeCategory] || [];

    return (
        <div className="bg-black min-h-screen overflow-x-hidden">
            {/* Fondo Spline Fijo con Zoom */}
            <div className="h-screen w-full fixed top-0 left-0 z-0">
                <div style={{ transform: `scale(${scrollScale})` }} className="w-full h-full transition-transform duration-150">
                    <Spline scene="https://prod.spline.design/sG6REsZkQIbhLGsF/scene.splinecode" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
            </div>

            {/* Contenido en Zig-Zag */}
            <div className="relative z-20 pt-[85vh] pb-32 px-6 md:px-20">
                <div className="max-w-7xl mx-auto flex flex-col space-y-24">
                    {dataToShow.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const imgType = store.activeCategory === "people" ? "characters" : store.activeCategory;

                        return (
                            <div 
                                key={item.uid} 
                                // W-FULL es vital aquí. Justify-start para impares, Justify-end para pares.
                                className={`w-full flex ${isEven ? 'justify-end' : 'justify-start'}`}
                            >
                                {/* Tarjeta Intercalada */}
                                <div className={`flex flex-col md:flex-row gap-8 items-center max-w-4xl w-full ${isEven ? 'md:flex-row-reverse text-right' : 'md:flex-row text-left'}`}>
                                    
                                    {/* Caja de Imagen "Liquid" */}
                                    <div className="w-full md:w-1/2 group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-700"></div>
                                        <img 
                                            src={`https://starwars-visualguide.com/assets/img/${imgType}/${item.uid}.jpg`}
                                            className="relative rounded-lg border border-white/10 w-full h-[350px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                                            alt={item.name}
                                            onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                                        />
                                    </div>

                                    {/* Bloque de Texto */}
                                    <div className="w-full md:w-1/2 p-4">
                                        <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-2 break-words">
                                            {item.name}
                                        </h2>
                                        <div className={`h-1 w-20 bg-red-600 mb-6 ${isEven ? 'ml-auto' : 'mr-auto'}`}></div>
                                        
                                        <div className={`flex gap-4 items-center ${isEven ? 'justify-end' : 'justify-start'}`}>
                                            <button 
                                                onClick={() => window.location.href = `/detail/${store.activeCategory}/${item.uid}`}
                                                className="border border-white/30 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                                            >
                                                Dossier
                                            </button>
                                            <button 
                                                onClick={() => store.favorites.some(f => f.uid === item.uid) ? actions.deleteFavorite(item.uid) : actions.addFavorite(item)}
                                                className="text-2xl hover:scale-125 transition-transform"
                                            >
                                                {store.favorites.some(f => f.uid === item.uid) ? "❤️" : "🤍"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};