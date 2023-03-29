import './App.scss';
import Products from '../features/Products';
import SearchProduct from '../components/SearchProduct';
import { useState } from 'react';
import Modal from '../components/Modal';

function App() {
  const [searchParams, setSearchParams] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = (event: any) => {
    setSearchParams(event.target.value);
  }
  const handleModalSwitch = () => {
    setIsModalOpen(!isModalOpen)
  }
  return (
    <div className="App">
      <header className="header">
        <h2 className='header__title'>Products List</h2>
      </header>
      <main>
        <div className='top-actions'>
          <SearchProduct handleSearch={handleSearch} />
          <button className="top-actions__button" onClick={handleModalSwitch}>Add new product</button>
        </div>
        <Products search={searchParams} />
        {isModalOpen && <Modal handleClose={handleModalSwitch} modalTitle="Add New Product"/>}
      </main>
    </div>
  );
}
export default App;
