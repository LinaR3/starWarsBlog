import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Detail = () => {
    const { type, id } = useParams(); // Extraemos los parámetros de la URL
    const [details, setDetails] = useState(null);

    useEffect(() => {
        // Fetch específico para los detalles de este elemento
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(res => res.json())
            .then(data => setDetails(data.result.properties))
            .catch(err => console.error(err));
    }, [type, id]);

    if (!details) return <div className="text-white text-center mt-20">Loading Force data...</div>;

    const imgType = type === "people" ? "characters" : type;

    return (
        <div className="container mx-auto mt-10 p-4 bg-zinc-900/80 rounded-lg text-white">
            <div className="flex flex-col md:flex-row gap-8">
                <img 
                    src={`https://starwars-visualguide.com/assets/img/${imgType}/${id}.jpg`} 
                    className="w-full md:w-1/2 rounded-lg shadow-2xl"
                    alt="Detail"
                />
                <div>
                    <h1 className="text-5xl font-bold text-red-600 mb-4">{details.name}</h1>
                    <p className="text-lg text-zinc-300">
                        Long ago in a galaxy far, far away... Aquí puedes poner una descripción genérica 
                        o usar más datos de la API.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8 border-t border-red-600 pt-4 text-red-500 font-bold uppercase text-sm">
                        <div>{type === "people" ? "Birth Year" : "Climate"}: <span className="text-white">{type === "people" ? details.birth_year : details.climate}</span></div>
                        <div>{type === "people" ? "Gender" : "Gravity"}: <span className="text-white">{type === "people" ? details.gender : details.gravity}</span></div>
                        <div>{type === "people" ? "Height" : "Diameter"}: <span className="text-white">{type === "people" ? details.height : details.diameter}</span></div>
                        <div>{type === "people" ? "Skin Color" : "Population"}: <span className="text-white">{type === "people" ? details.skin_color : details.population}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};