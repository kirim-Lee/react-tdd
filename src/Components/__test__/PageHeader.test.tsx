import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import PageHeader from '../PageHeader';

describe('<PageHeader />', () => {
  it('렌더 테스트', () => {
    const router = createMemoryRouter(
      [{ path: '*', element: <PageHeader /> }],
      { initialEntries: ['/'], initialIndex: 0 }
    );

    const { container } = render(<RouterProvider router={router} />);

    const label = screen.getByText('할 일 목록');
    expect(label).toBeInTheDocument();

    const goBack = screen.queryByText('돌아가기');
    expect(goBack).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('/add 로 접속했을때 돌아가기 링크표기와 올바른 타이틀 표기 확인', () => {
    const router = createMemoryRouter(
      [{ path: '*', element: <PageHeader /> }],
      { initialEntries: ['/'], initialIndex: 0 }
    );

    router.navigate('/add');

    render(<RouterProvider router={router} />);

    const label = screen.getByText('할 일 추가');
    expect(label).toBeInTheDocument();

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
  });

  it('/detail/:id 로 접속했을 때 렌더링 잘 되는지 확인', () => {
    const router = createMemoryRouter(
      [{ path: '*', element: <PageHeader /> }],
      { initialEntries: ['/detail/1'], initialIndex: 0 }
    );

    render(<RouterProvider router={router} />);

    const label = screen.getByText('할 일 상세');
    expect(label).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  });

  it('정의되지 않은 경로는 에러로 타이틀 노출되는지 확인', () => {
    const router = createMemoryRouter(
      [{ path: '*', element: <PageHeader /> }],
      { initialEntries: ['/badUrl'], initialIndex: 0 }
    );

    render(<RouterProvider router={router} />);

    const label = screen.getByText('에러');
    expect(label).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  });

  it('돌아가기 버튼 눌렀을 때 홈으로 잘 돌아가는지 확인', async () => {
    const router = createMemoryRouter(
      [{ path: '*', element: <PageHeader /> }],
      { initialEntries: ['/badUrl'], initialIndex: 0 }
    );

    render(<RouterProvider router={router} />);

    const goBack = screen.getByText('돌아가기');

    fireEvent.click(goBack);

    const label = screen.getByText('할 일 목록');
    expect(label).toBeInTheDocument();
    expect(goBack).not.toBeInTheDocument();
  });
});
