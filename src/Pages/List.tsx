import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, TodoList } from '../Components';

const AddButton = styled(Link)`
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  cursor: pointer;
  position: absolute;
  bottom: -30px;
  background-color: #304ffe;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  &:hover {
    background-color: #1e40ff;
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const List = () => {
  return (
    <Container>
      <TodoList />
      <AddButton to="/add">+</AddButton>
    </Container>
  );
};

export default List;
