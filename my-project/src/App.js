import './App.css';
import AddCompany from './component/quote/Company/AddCompany';
import CompanyPages from './pages/CompanyPages';
import LoginPages from './pages/LoginPages';
import Navbar from './pages/Navbar';
import Quotes from './pages/Quote';

function App() {
  return (
    <div className="App">
      {/* <LoginPages /> */}
      <Navbar />
      <CompanyPages />
      {/* <AddCompany /> */}
    </div >
  );
}

export default App;
