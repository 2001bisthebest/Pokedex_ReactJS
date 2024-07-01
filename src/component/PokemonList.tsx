import React from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../Interface/IPokemon";

const PokemonList: React.FC<Pokemon> = ({ name, photo, ability, types }) => {
    const nameUpper: string = name[0].toUpperCase() + name.slice(1)
    const typesUpper: string[] = types.map((item) => item[0].toUpperCase() + item.slice(1))
    const abilityUpper: string[] = ability.map((item) => item[0].toUpperCase() + item.slice(1))
    const navigate = useNavigate()

    return (
        <div className="w-[1138px] shadow-list rounded-lg p-3.5">
            <button className="h-full flex justify-center items-center gap-[18px] w-full" onClick={() => navigate(`/pokemon-detail/${name}`)}>
                <div className="w-20">
                    <img src={photo} />
                </div>
                <div className="flex flex-col justify-center p-2.5 gap-2 w-full">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-black self-start">{nameUpper}</p>
                        <div className="flex gap-1">
                            {typesUpper ? typesUpper.map((item) =>
                                <div className="flex justify-center items-center text-yellow text-xss font-bold bg-[#FFF4E3] w-fit px-2 py-1 rounded-lg">
                                    <p>{item}</p>
                                </div>
                            ) : ''}
                        </div>
                        <div className="flex text-darkgray font-light text-xs gap-1">
                            <p>Abilites:</p>
                            <p>{abilityUpper.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default PokemonList