import styled from 'styled-components';

interface ContainerProps {
  readonly backgroundColor: string;
  readonly hoverColor: string;
}

const Container = styled.button<ContainerProps>`
  text-align: center;
  font-weight: bold;
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 20px;
  border-radius: 8px;
  border: 0;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    box-shadow: insect 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Label = styled.div`
  color: #fff;
  font-size: 16px;
`;

interface IProps extends Partial<ContainerProps> {
  readonly label?: string;
  readonly onClick?: () => void;
}

export const Button = ({
  label,
  backgroundColor = '#304ffe',
  hoverColor = '#1e40ff',
  onClick,
}: IProps) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      onClick={onClick}
    >
      <Label>{label}</Label>
    </Container>
  );
};
