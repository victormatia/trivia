import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import mockResponseQuestions from "./helpers/mockResponseQuestions";
import mockResponseToken from "./helpers/mockResponseToken";
import renderWithRyouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testa se as perguntas são exibidas na tela', () => {
  test('Testa se as informações do usuário aparecem na Header', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseToken) // fetch token
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockResponseQuestions) // fetch questions
    })

    const { history, store } = renderWithRyouterAndRedux(<App />); // rederiza app em /


      const nameInput = screen.getByTestId("input-player-name");
      const emailInput= screen.getByTestId("input-gravatar-email");
      const buttonLogin = screen.getByTestId("btn-play");

      userEvent.type(nameInput, 'Lucas Andrade');
      userEvent.type(emailInput, 'trybe@gmail.com');
      userEvent.click(buttonLogin);

      await waitFor(() => {
            expect(store.getState().player.questionsAndAnswer).toHaveLength(5)
          })
      
      const category = await screen.findByTestId(/question-category/i);

      await waitFor(()=>{
        expect(history.location.pathname).toBe('/game')
        expect(screen.findByTestId(/question-category/i).innerHTML).toBe('History')
        screen.debug();
      })

  })

  // test('Testa se as informações do usuário aparecem na Header', async () => {
    
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mockResponseQuestions) // fetch questions
  //   })
  //   localStorage.setItem('token', 'dashdasgdhasgdfhg')
  //   const { history, store } = renderWithRyouterAndRedux(<App />, { initialEntries: ['/game'] }); // rederiza app em /
    
    
  //   await waitFor(() => {
  //     expect(store.getState().player.questionsAndAnswer).toHaveLength(5)
  //   })
    
  //   const state = store.getState().player.questionsAndAnswer;
  //   console.log(state);
    
  //   const category = await screen.findByTestId(/question-category/i);

  //     await waitFor(()=>{
  //       expect(history.location.pathname).toBe('/game')
  //       expect(screen.findByTestId(/question-category/i).innerHTML).toBe('History')
  //       screen.debug();
  //     })

  // })
})