export interface Pokemon {
    name: string,
    ability: string[],
    photo: string,
    types: string[]
}
export interface PokemonStat extends Pokemon {
    stats: string[]
}
