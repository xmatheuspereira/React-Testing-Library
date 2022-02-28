import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />',
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

    test(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação`, () => {
      const { history } = renderWithRouter(<App />);
      const homeTitle = screen.getByRole('link', {
        name: 'Home',
      });

      userEvent.click(homeTitle);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

    test(`Teste se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação`, () => {
      const { history } = renderWithRouter(<App />);
      const homeTitle = screen.getByRole('link', {
        name: 'About',
      });

      userEvent.click(homeTitle);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });

    test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação`, () => {
      const { history } = renderWithRouter(<App />);
      const favoritesTitle = screen.getByRole('link', {
        name: 'Favorite Pokémons',
      });

      userEvent.click(favoritesTitle);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

    test(`Teste se a aplicação é redirecionada para a página Not Found
    ao entrar em uma URL desconhecida`, () => {
      const { history } = renderWithRouter(<App />);
      history.push('/*');

      const notFound = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji',
      });
      expect(notFound).toBeInTheDocument();
    });
  });
