import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import mockResponseFailure from "./helpers/mockResponseFailure";
import mockResponseQuestions from "./helpers/mockResponseQuestions";
import mockResponseToken from "./helpers/mockResponseToken";
import renderWithRyouterAndRedux from "./helpers/renderWithRouterAndRedux";

const { results } = mockResponseQuestions;

describe('Testa se as perguntas são exibidas na tela', () => {
  test('Testa se, quando a requisição falha, o usuário é redirecionado para a tela de login', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseToken),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseFailure),
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
        expect(history.location.pathname).toBe('/');
        expect(token).toBe(null);
      });

  });

  test('Testa se a pergunta é rendierizadas corretamente na tela', async () => {
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
      const category = screen.getByTestId(/question-category/i);
      const question = screen.getByTestId(/question-text/i);
      const correctAnswer = screen.getAllByTestId(/correct-answer/i);
      const wrongAnswers = [0, 1, 2].map((e) => screen.getByTestId(`wrong-answer-${e}`));

      expect(history.location.pathname).toBe('/game')
      expect(category.innerHTML).toBe('History');
      expect(question.innerHTML).toBe('During the Mongolian invasions of Japan, what were the Mongol boats mostly stopped by?');
      expect(correctAnswer).toHaveLength(1);
      expect(wrongAnswers).toHaveLength(3);

    });

  });

  test('Testa se é possível passar para a próxima pergunta', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseToken),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseQuestions),
    })
    
    const { history, store } = renderWithRyouterAndRedux(<App />);

    const nameInput = screen.getByTestId("input-player-name");
    const emailInput= screen.getByTestId("input-gravatar-email");
    const buttonLogin = screen.getByTestId("btn-play");

    userEvent.type(nameInput, 'Lucas Andrade');
    userEvent.type(emailInput, 'trybe@gmail.com');
    userEvent.click(buttonLogin);

    const questions = [0, 1, 2, 3, 4];

    await waitFor(() => {

      questions.forEach((e) => {
        // const category = screen.getByTestId(/question-category/i);
        // const question = screen.getByTestId(/question-text/i);
        const correctAnswer = screen.getAllByTestId(/correct-answer/i);
        
        // expect(category.innerHTML).toBe(results[e].category);
        expect(correctAnswer).toHaveLength(1);
        userEvent.click(correctAnswer[0]);

        const nextButton = screen.getByTestId(/btn-next/i)
        expect(nextButton).toBeInTheDocument();
        
        userEvent.click(nextButton);

      })

      const score = screen.getByTestId(/header-score/i)
      console.log(score.innerHTML);
      expect(score).toEqual('350');
      
    });
    
    console.log(store.getState());
    screen.debug();
  });
});
