import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e40ff;
`;

const Title = styled.div`
  padding: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const GoBack = styled(Link)`
  padding: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  position: absolute;
  left: 20px;
`;

const PageHeader = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    if (pathname === '/') return '할 일 목록';
    if (pathname === '/add') return '할 일 추가';
    if (pathname.startsWith('/detail')) return '할 일 상세';
    return '에러';
  }, [pathname]);

  return (
    <Container>
      <Title>{title}</Title>
      {pathname !== '/' && <GoBack to="/">돌아가기</GoBack>}
    </Container>
  );
};
export default PageHeader;
