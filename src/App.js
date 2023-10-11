import './App.css';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import {
  TwitterShareButton,
  TumblrShareButton,
  TwitterIcon,
  TumblrIcon,
} from 'react-share';
import html2canvas from 'html2canvas';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quotesRandom, setQuotesRandom] = useState([]);
  const [color, setColor] = useState(['#00000']);

  async function fetchData() {
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.json();
    console.log(data);
    setQuotes(data);
    let randomize = Math.floor(Math.random() * data.length);
    setQuotesRandom(data[randomize]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getNewQuote = () => {
    const colors = [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857',
    ];

    let randomize = Math.floor(Math.random() * quotes.length);
    let randomizeColor = Math.floor(Math.random() * colors.length);
    setQuotesRandom(quotes[randomize]);
    setColor(colors[randomizeColor]);
  };

  const screenShot = async () => {
    const element = document.getElementById('quote-machine');

    const canvas = await html2canvas(element);
    const capture = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = capture;
    link.download = 'capture.png';
    link.click();
  };

  return (
    <div style={{ background: color, minHeight: '100vh' }} id="quote-machine">
      <div className="container" id="quote-box">
        <div className="card">
          {quotesRandom ? (
            <>
              <h3 id="text">&quot;{quotesRandom.text}</h3>
              <p id="author">~{quotesRandom.author || 'No author'}~</p>
            </>
          ) : (
            <h2>Loading...</h2>
          )}
          <div className="clicks">
            <button onClick={getNewQuote} id="new-quote">
              Generate Quote
            </button>
            <div className="social-icons">
              <TwitterShareButton
                title={quotesRandom.text}
                url="http://localhost:3001"
              >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <TumblrShareButton
                title={quotesRandom.text}
                url="http://localhost:3001"
              >
                <TumblrIcon size={32} round={true} />
              </TumblrShareButton>
              <button id="download-icon" onClick={screenShot}>
                {' '}
                <FaDownload />{' '}
              </button>
            </div>
          </div>
          <p>by Dacosta</p>
        </div>
      </div>
    </div>
  );
}

export default App;
