import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://discvrai-task-backend.onrender.com/api/products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setDisplayedProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleAsk = async () => {
    if (!query.trim()) {
      setDisplayedProducts(allProducts);
      setSummary('');
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('https://discvrai-task-backend.onrender.com/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      //filter product is happning based on llm Ids return
      const filtered = allProducts.filter(p => data.productIds.includes(p.id));
      
      setDisplayedProducts(filtered);
      setSummary(data.summary);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>AI Product Discovery</h1>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Ask me to find a product... (e.g., 'Show me cheap phones' or 'Need something for gaming')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button onClick={handleAsk} disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Ask AI'}
        </button>
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}
      
      {summary && (
        <div className="summary-box">
          <strong>AI Summary:</strong> {summary}
        </div>
      )}

      <h2>Products</h2>
      {displayedProducts.length === 0 && !isLoading ? (
        <p>No products found matching your criteria.</p>
      ) : (
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;