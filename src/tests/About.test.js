import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstP = screen.getByText(/this application simulates a pokédex/i);
    const secondP = screen.getByText(/one can filter pokémons by type/i);

    expect(firstP && secondP).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
