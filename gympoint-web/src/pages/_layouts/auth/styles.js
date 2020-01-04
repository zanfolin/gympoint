import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100vh;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
  height: 60vh;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  span {
    color: #000;
    text-align: left;
    font-weight: bold;
  }

  input {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: rgba(0, 0, 0, 0.5);
    margin: 0 0 10px;
    width: 100%;

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  button {
    margin: 5px, 0, 0;
    height: 44px;
    background-color: #ee4d64;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    color: #fff;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }
  }
`;
