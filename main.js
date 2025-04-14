// Função para carregar os dados do Pokémon
async function loadPokemon(name) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
  
      // Atualiza imagem no centro da Pokédex
      document.getElementById('pokemon-image').src = data.sprites.front_default;
      document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
  
      // Mostra HP e ataque base
      const hpStat = data.stats.find(stat => stat.stat.name === 'hp');
      const attackStat = data.stats.find(stat => stat.stat.name === 'attack');
      document.getElementById('pokemon-hp').textContent = hpStat.base_stat;
      document.getElementById('pokemon-attack').textContent = attackStat.base_stat;
  
      // Lista habilidades
      const abilities = data.abilities.map(a => a.ability.name).join(', ');
      document.getElementById('pokemon-abilities').textContent = abilities;
  
      // Buscando evolução (via species → evolution chain)
      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();
  
      // Mostra a próxima evolução (simples)
      let nextEvolution = 'Nenhuma';
      let current = evolutionData.chain;
  
      while (current) {
        if (current.species.name === name.toLowerCase() && current.evolves_to.length > 0) {
          nextEvolution = current.evolves_to[0].species.name;
          break;
        }
        current = current.evolves_to[0];
      }
  
      document.getElementById('pokemon-evolution').textContent = nextEvolution;
  
    } catch (err) {
      console.error('Erro ao buscar dados do Pokémon:', err);
    }
  }
  