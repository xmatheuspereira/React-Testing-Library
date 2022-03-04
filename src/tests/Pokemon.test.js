import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Renderiza um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const averageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(averageWeight).toBeInTheDocument();

    const pokemonImage = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test(`Teste se o card do Pokémon indicado na Pokédex 
    contém um link de navegação para exibir detalhes deste Pokémon.
    O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`,
  () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test(`Teste se ao clicar no link de navegação do Pokémon,
    é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`,
  () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });

    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('pokemons/25');

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(checkbox);

    const isFavoriteImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(isFavoriteImg).toBeInTheDocument();
    expect(isFavoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
