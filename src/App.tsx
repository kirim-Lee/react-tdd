import '../public/scss/style.scss';
import {
  Container,
  Contents,
  Button,
  InputContainer,
  Input,
  TodoItem,
} from './Components';

const App = () => {
  return (
    <Container>
      <Contents>
        <TodoItem label="추가된 할일" onDelete={null} />

        <InputContainer>
          <Input placeholder="할 일을 입력해 주세요" />
          <Button label="추가" backgroundColor="#86efac" hoverColor="#0891b2" />
        </InputContainer>
      </Contents>
    </Container>
  );
};

export default App;
