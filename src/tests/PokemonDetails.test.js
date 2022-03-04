import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('pokemons/25');

      const nameDetails = screen.getByRole('heading', {
        name: /pikachu details/i,
      });

      const summaryHeading = screen.getByRole('heading', {
        name: /summary/i,
        level: 2,
      });

      const summaryParagraph = screen.getByText(
        /this intelligent pokémon roasts hard berries with electricity/i,
        /to make them tender enough to eat./i,
      );

      expect(nameDetails).toBeInTheDocument();
      expect(summaryHeading).toBeInTheDocument();
      expect(summaryParagraph).toBeInTheDocument();
    });

  test(`Teste se existe na página uma seção com os
      mapas contendo as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');

    const gameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });

    const firstLocation = screen.getByText(/kanto viridian forest/i);
    const secondLocation = screen.getByText(/kanto power plant/i);

    const locationImages = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });

    const imgUrls = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];

    expect(gameLocation).toBeInTheDocument();
    expect(firstLocation && secondLocation).toBeInTheDocument();

    // Ref. Utilizei o seguinte repositório como fonte de consulta pra esse teste: https://github.com/tryber/sd-018-a-project-react-testing-library/pull/19
    imgUrls.forEach((url, i) => {
      expect(locationImages[i]).toHaveAttribute('src', url);
      expect(locationImages[i]).toHaveAttribute('alt', 'Pikachu location');
    });
  });

  test('Teste se é possível favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/4');

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    expect(checkbox.checked).toBe(false);

    userEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });
});
