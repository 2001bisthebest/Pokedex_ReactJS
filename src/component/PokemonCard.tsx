import React from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../Interface/IPokemon";

const PokemonCard: React.FC<Pokemon> = ({ name, photo, types }) => {
    const nameUpper: string = name[0].toUpperCase() + name.slice(1)
    const typesUpper: string[] = types.map((item) => item[0].toUpperCase() + item.slice(1))
    const navigate = useNavigate()
    return (
        <div className="w-[250px] h-[384px] shadow-card rounded-lg">
            <div className="h-full flex flex-col justify-between">
                <div className="w-full">
                    <img src={photo} />
                </div>
                <div className="flex flex-col justify-center p-2.5 gap-4 h-full bg-gray">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-black">{nameUpper}</p>
                        <div className="flex gap-1">
                            {typesUpper ? typesUpper.map((item) =>
                                <div className="flex justify-center items-center text-yellow text-xss font-bold bg-[#FFF4E3] w-fit px-2 py-1 rounded-lg" key={item}>
                                    <p>{item}</p>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                    <button className="bg-black rounded-lg h-[38px] text-gray font-bold text-btn hover:bg-yellow hover:border-[#F8F1D8] hover:border-4 hover:text-black" onClick={() => navigate(`/pokemon-detail/${name}`)}>Detail</button>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard