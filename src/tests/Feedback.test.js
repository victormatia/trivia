import React from 'react';
import App from "../App";
import Feedback from "../pages/Feedback";
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';


describe("Testes da página Feedback", () => {

    test('Testa se o nome do usuario aparece na tela', ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')

        const playerName = screen.getByTestId('header-player-name')
        expect(playerName).toBeInTheDocument()
    })

    test('Testa se o score do usuario aparece na tela', ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')

        const playerScore = screen.getByTestId('header-score')
        expect(playerScore).toBeInTheDocument()
    })

    test('Testa se o botão de Ranking aparece na tela', async ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')

        const rannkingButton = screen.getByTestId('btn-ranking')
        expect(rannkingButton).toBeInTheDocument()
        userEvent.click(rannkingButton);
        await expect(history.location.pathname).toBe('/ranking');
    })

    test('Testa se o botão de Play Again aparece na tela', ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')
        
        const btnPlayAgain = screen.getByTestId('btn-play-again')
        expect(btnPlayAgain).toBeInTheDocument()
        userEvent.click(btnPlayAgain)
        expect(history.location.pathname).toBe('/')
    })


    test('Testa se a foto está na tela', ()=>{
        renderWithRouterAndRedux(<Feedback />);
        
        const imagem = screen.getByTestId("header-profile-picture");
        expect(imagem).toBeInTheDocument();
      });
})