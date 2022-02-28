import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    test('O primeiro link deve possuir o texto "Home"', () => {
      renderWithRouter(<App />);
      const homeTitle = screen.getByRole('link', {
        name: 'Home',
      });
      expect(homeTitle).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto "About"', () => {
      renderWithRouter(<App />);
      const aboutTitle = screen.getByRole('link', {
        name: 'About',
      });
      expect(aboutTitle).toBeInTheDocument();
    });

    test('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
      renderWithRouter(<App />);
      const favoritesTitle = screen.getByRole('link', {
        name: 'Favorite Pokémons',
      });
      expect(favoritesTitle).toBeInTheDocument();
    });
  });
