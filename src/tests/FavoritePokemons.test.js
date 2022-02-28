import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Teste o componente <FavoritePokemons.js />',
  () => {
    test(`Teste se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos`, () => {
      renderWithRouter(<FavoritePokemons pokemons={ [] } />);
      const message = screen.getByText('No favorite pokemon found');
      expect(message).toBeInTheDocument();
    });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  // Ref. Teste escrito usando o seguinte PR como fonte de consulta: https://github.com/tryber/sd-018-a-project-react-testing-library/pull/1/
    renderWithRouter(<FavoritePokemons pokemons={ [data[0], data[1], data[3]] } />);

    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites).toHaveLength(3);
  });
  });
