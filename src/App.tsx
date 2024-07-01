import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import PokeList from './pages/PokeList';
import Pokeball from './pages/Pokeball';
import PokemonDetail from './pages/PokemonDetail';
import SearchPokemon from './pages/SearchPokemon';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/pokelist" replace={true} />} />
            <Route path="/pokelist" element={<PokeList />} />
            <Route path="/pokemon-detail/:name" element={<PokemonDetail />} />
            <Route path='/pokeball' element={<Pokeball />} />
            <Route path='/searchpokemon' element={<SearchPokemon />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
