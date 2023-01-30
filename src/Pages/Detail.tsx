import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '../Components';
import { useContext, useMemo } from 'react';
import { TodoListContext } from '../Contexts/TodoList';
import styled from 'styled-components';

const ToDo = styled.div`
  min-width: 350px;
  height: 350px;
  overflow-y: auto;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
  padding: 10px;
`;

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { todoList, deleteTodo } = useContext(TodoListContext);

  const id = useMemo(() => {
    return Number(params.id);
  }, [params?.id]);

  const handleDelete = () => {
    deleteTodo(id);
    navigate(-1);
  };

  return (
    <Container>
      <ToDo>{todoList[id]}</ToDo>
      <Button
        label="삭제"
        backgroundColor="#ff1744"
        hoverColor="#f01440"
        onClick={handleDelete}
      />
    </Container>
  );
};

export default Detail;
