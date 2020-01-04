import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  border: unset;
  padding: 0 30px;
  margin-top: 15px;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
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
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  width: 50%;

  div {
    text-align: right;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }

    span {
      color: red;
      cursor: pointer;
    }

    form {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    a {
      background-color: #ee4d64;
      color: #fff;
      width: 150px;
      height: 30px;
      border: unset;
      border-radius: 4px;
      margin-right: 10px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }

    div {
      background-color: #fff;
      color: #000;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 30px;
      display: flex;
      align-items: center;
      width: 150px;
      padding-left: 5px;

      input {
        border: unset;
        width: 80%;
        padding-left: 5px;
      }
    }
  }
`;

export const Lista = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  padding-top: 10px;

  table {
    width: 98%;
    /*border: 1px solid black;*/
    border-collapse: collapse;

    thead tr {
      font-weight: bold;
      color: black;
    }

    tbody tr {
      height: 50px;
      border-bottom: 1px solid #f5f5f5;
      color: #999999;
    }

    td {
      /*border: 1px solid black;*/
    }

    td:nth-child(2),
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(5) {
      text-align: center;
    }
    /*td:nth-child(4) {
      width: 15%;
    }

    td:nth-child(1) {
      width: 35%;
    }*/

    td:nth-child(6) button {
      background-color: unset;
      border: none;
    }
    td:nth-child(6) button:nth-child(2) {
      color: red;
      margin-right: 10px;
    }

    td:nth-child(6) button:nth-child(1) {
      color: blue;
    }
  }
`;

export const Pagination = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  padding-top: 10px;
`;
