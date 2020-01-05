import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  padding: 0 30px;
  border: 1px solid #eee;
`;

export const Content = styled.div`
  height: 65px;
  /*max-width: 900px;*/
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

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
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

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
  }
`;
