import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import mockRankingLocalStorage from './helpers/mockRankingLocalStorage';

describe('Implementa casos de teste em Ranking.jsx', () => {
  test('Testa se a tela de ranking é renredizada corretamente', async () => {
    localStorage.setItem('ranking', JSON.stringify(mockRankingLocalStorage))
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/ranking'] });

    await waitFor(() => {
      const namePlayers = [0, 1].map((e) => screen.getByTestId(`player-name-${e}`));
      const scorePlayer = [0, 1].map((e) => screen.getByTestId(`player-score-${e}`));

      expect(history.location.pathname).toBe('/ranking')
      expect(namePlayers).toHaveLength(2);
      expect(namePlayers[0].innerHTML).toBe('Trybe');
      expect(namePlayers[1].innerHTML).toBe('Victor');
      expect(scorePlayer).toHaveLength(2);
      expect(scorePlayer[0].innerHTML).toBe('39');
      expect(scorePlayer[1].innerHTML).toBe('32');
    });
  });

  test('Testa se é possível retornar para a página de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/ranking'] });

    expect(history.location.pathname).toBe('/ranking')

    const buttonGoHome = screen.getByTestId(/btn-go-home/i);
    userEvent.click(buttonGoHome);

    expect(history.location.pathname).toBe('/');
  });
});
