import { useNavigate } from 'react-router-dom';
import { Container, InputContainer } from '../Components';

const Add = () => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate('/', { replace: true });
  };
  return (
    <Container>
      <InputContainer onAdd={goMain} />
    </Container>
  );
};
export default Add;
