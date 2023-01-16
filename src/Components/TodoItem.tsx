import styled from 'styled-components';
import { Button } from './Button';

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Label = styled.div`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
`;

interface IProps {
  readonly label: string;
  readonly onDelete?: () => void;
}

export const TodoItem = ({ label, onDelete }: IProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Button
        label="삭제"
        backgroundColor="#d8b4fe"
        hoverColor="#4f46e5"
        onClick={onDelete}
      />
    </Container>
  );
};
