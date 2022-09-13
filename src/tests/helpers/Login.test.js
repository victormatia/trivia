import React from "react";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

describe('Testes na página de login', () => {
    test('Testa Se a página de login é renderizada corretamente', () => {
      const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId("input-player-name");
    const emailInput= screen.getByTestId("input-gravatar-email");
    const buttonLogin = screen.getByTestId("btn-play");
    const buttonSettings = screen.getByTestId("btn-settings");

      expect(nameInput).toBeInTheDocument(); 
      expect(emailInput).toBeInTheDocument();
      expect(buttonLogin).toBeInTheDocument();
      expect(buttonSettings).toBeInTheDocument();
      expect(buttonLogin.disabled).toBeTruthy();
      expect(history.location.pathname).toBe('/');
    })

    test('Testa inputs de texto',() => {
      renderWithRouterAndRedux(<App />)
      const emailInput= screen.getByTestId("input-gravatar-email");
      const nameInput = screen.getByTestId("input-player-name");

      userEvent.type(nameInput,'Lucas Andrade')
      userEvent.type(emailInput,'trybe@gmail.com.br')

      expect(emailInput).toHaveValue('trybe@gmail.com.br')
      expect(nameInput).toHaveValue('Lucas Andrade')
    });  

    
    test('Testa se o Botão play deveria gerar token e redirecionar a página', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByTestId("input-player-name");
        const emailInput= screen.getByTestId("input-gravatar-email");
        const buttonLogin = screen.getByTestId("btn-play");

        expect(nameInput).toBeInTheDocument(); 
        expect(emailInput).toBeInTheDocument();
        expect(buttonLogin).toBeInTheDocument();
        expect(buttonLogin.disabled).toBeTruthy();

        userEvent.type(nameInput, 'Lucas Andrade');
        userEvent.type(emailInput, 'trybe@gmail.com');

        expect(buttonLogin.disabled).toBeFalsy();

        userEvent.click(buttonLogin);

        await waitFor(()=>{
        expect(history.location.pathname).toBe('/game')
    })    
  });
      test('Testa se ao clicar em setting a página é redirecionada', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const buttonSettings = screen.getByTestId("btn-settings");
    
        expect(buttonSettings).toBeInTheDocument();
    
        userEvent.click(buttonSettings);
        
        expect(history.location.pathname).toBe('/settings');
      })
    });
