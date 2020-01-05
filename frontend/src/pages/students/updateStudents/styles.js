import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  border: unset;
  padding: 0 30px;
  margin-top: 15px;
  width: 100%;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  width: 70%;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;

  nav {
    display: flex;
    align-items: center;
    width: 50%;

    img {
      margin-right: 2px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
    a {
      font-weight: bold;
      color: #7159c2;
      margin-left: 30px;
    }

    a:link,
    a:visited,
    a:hover {
      color: #999;
    }

    a:active {
      font-weight: bolder;
      color: black;
    }

    aside {
      display: flex;
      align-items: center;
      width: 50%;
    }
  }
`;
export const Commands = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  div {
    text-align: right;
    display: flex;
    align-items: center;
    flex-direction: row;

    a {
      background-color: #ccc;

      color: #fff;
      width: 100px;
      height: 30px;
      border: unset;
      border-radius: 4px;

      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-right: 5px;

      &:hover {
        background: ${darken(0.03, '#ccc')};
      }
    }

    button:nth-child(2) {
      background-color: #ee4d64;

      color: #fff;
      width: 100px;
      height: 30px;
      border: unset;
      border-radius: 4px;

      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;

export const Lista = styled.div`
  margin-top: 10px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  padding-top: 10px;

  table {
    width: 99%;
  }

  table tr {
    height: 70px;
  }

  table tr td label {
    font-weight: bold;
  }

  table tr td input {
    width: 100%;
    border: 1px solid #999;
    padding: 5px;
    margin-top: 5px;
    border-radius: 4px;
  }
`;
