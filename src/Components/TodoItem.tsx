import styled from 'styled-components';
import { Button } from './Button';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Label = styled(Link)`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
  text-align: left;
  text-decoration: none;
  color: #333;
`;

interface IProps {
  readonly id: number;
  readonly label: string;
  readonly onDelete?: () => void;
}

export const TodoItem = ({ id, label, onDelete }: IProps) => {
  return (
    <Container>
      <Label to={`/detail/${id}`}>{label}</Label>
      <Button
        label="삭제"
        backgroundColor="#d8b4fe"
        hoverColor="#4f46e5"
        onClick={onDelete}
      />
    </Container>
  );
};
