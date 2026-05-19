import PokemonList from "../components/PokemonList";
export default function Home() {
  return (
    <section>
      <h2>Benvingut a la Pokédex</h2>
      <p>Consulta informació dels Pokémon utilitzant la PokéAPI.</p>
      <PokemonList/>
    </section>
 
  );
}