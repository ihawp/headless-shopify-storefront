import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import FAQ from './pages/FAQ.jsx';
import Search from './pages/Search.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import Individual from './pages/Individual.jsx';

import { NavigationProvider } from './middleware/Navigation.jsx';
import { CartProvider } from './middleware/TrackCart.jsx';

function Errort() {
  return <main>
    <header>
      <h1>Error 404: Page does not exist.</h1>
    </header>
  </main>
}

export default function AppRouter() {
	return <BrowserRouter>

    <NavigationProvider>
    <CartProvider>

      <Header />

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/faq" element={ <FAQ /> } />
        <Route path="/shop" element={ <Shop /> } />
        <Route path="/search/:query" element={ <Search /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/view/:product" element={ <Individual /> } />
        <Route path="*" element={ <Errort /> } />
      </Routes>

      <Footer />

    </CartProvider>
    </NavigationProvider>

	</BrowserRouter>;
}