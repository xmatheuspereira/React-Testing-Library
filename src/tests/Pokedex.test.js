import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const headingTitle = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(headingTitle).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista
      quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);

    const currentPokemon = screen.getByText(/pikachu/i);
    expect(currentPokemon).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const singlePokemon = screen.getAllByRole('link', {
      name: /more details/i,
    });

    expect(singlePokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const numberOfButtons = 7;

    expect(allButtons).toHaveLength(numberOfButtons);

    const eletric = screen.getByRole('button', { name: /electric/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    const bug = screen.getByRole('button', { name: /bug/i });
    const poison = screen.getByRole('button', { name: /poison/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const normal = screen.getByRole('button', { name: /normal/i });
    const dragon = screen.getByRole('button', { name: /dragon/i });

    expect(eletric).toHaveTextContent('Electric');
    expect(fire).toHaveTextContent('Fire');
    expect(bug).toHaveTextContent('Bug');
    expect(poison).toHaveTextContent('Poison');
    expect(psychic).toHaveTextContent('Psych');
    expect(normal).toHaveTextContent('Normal');
    expect(dragon).toHaveTextContent('Dragon');
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const ButtonAll = screen.getByRole('button', { name: /all/i });
    expect(ButtonAll).toBeInTheDocument();

    userEvent.click(ButtonAll);

    const firstPokemon = pokemons[0].name;
    expect(firstPokemon).toBe('Pikachu');
  });
});
