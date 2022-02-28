import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const notFoundMessage = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });

    expect(notFoundMessage).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
