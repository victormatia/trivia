import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import mockResponseQuestions from "./helpers/mockResponseQuestions";
import mockResponseToken from "./helpers/mockResponseToken";
import renderWithRyouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testa se as perguntas são exibidas na tela', () => {
  test('Testa se, quando o toekn é inválido, o usuário é redirecionado para a tela de login', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue('token errado'),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseQuestions),
    });

    const { history } = renderWithRyouterAndRedux(<App />);


      const nameInput = screen.getByTestId("input-player-name");
      const emailInput= screen.getByTestId("input-gravatar-email");
      const buttonLogin = screen.getByTestId("btn-play");

      userEvent.type(nameInput, 'Lucas Andrade');
      userEvent.type(emailInput, 'trybe@gmail.com');
      userEvent.click(buttonLogin);

      
      await waitFor(() => {
        const token = localStorage.getItem('token');
        expect(history.location.pathname).toBe('/')
        expect(token).toBe(null)
      });

  });

  test('Testa se as perguntas são rendierizadas corretamente na tela', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseToken),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseQuestions),
    })

    const { history } = renderWithRyouterAndRedux(<App />);


      const nameInput = screen.getByTestId("input-player-name");
      const emailInput= screen.getByTestId("input-gravatar-email");
      const buttonLogin = screen.getByTestId("btn-play");

      userEvent.type(nameInput, 'Lucas Andrade');
      userEvent.type(emailInput, 'trybe@gmail.com');
      userEvent.click(buttonLogin);

      
      await waitFor(() => {
        const token = localStorage.getItem('token');
        const category = screen.getByTestId(/question-category/i);
        const question = screen.getByTestId(/question-text/i);
        const correctAnswer = screen.getAllByTestId(/correct-answer/i);
        const wrongAnswers = [0, 1, 2].map((e) => screen.getByTestId(`wrong-answer-${e}`));

        expect(history.location.pathname).toBe('/game')
        expect(token).toBe('426045d2d34c5038c2db429399979b7a3c0c60d5bc75b1d98738ddc893742432')
        expect(category.innerHTML).toBe('History');
        expect(question.innerHTML).toBe('During the Mongolian invasions of Japan, what were the Mongol boats mostly stopped by?');
        expect(correctAnswer).toHaveLength(1);
        expect(wrongAnswers).toHaveLength(3);

      });

  });
})