// import '../public/scss/style.scss';
const logo = new URL('../public/images/logo.jpeg', import.meta.url);

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo.href} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
