import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const shortenUrl = () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      new URL(url);
    } catch {
      alert("Please enter a valid URL");
      return;
    }

    const code = generateCode();
    const shortened = `https://short.ly/${code}`;

    setShortUrl(shortened);

    const newItem = {
      original: url,
      shortened: shortened
    };

    setHistory((prev) => [newItem, ...prev]);

    setUrl("");
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };

  const clearHistory = () => {
    setHistory([]);
    setShortUrl("");
  };

  return (
    <div className="app">

      <header className="navbar">
        <h1>Shortly</h1>

        <span className="tagline">
          Simple URL Shortener
        </span>
      </header>

      <main>

        <section className="hero">

          <h2>
            Shorten your URL
          </h2>

          <p>
            Turn long URLs into simple, shareable links.
          </p>

          <div className="url-box">

            <input
              type="url"
              placeholder="https://example.com/very-long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  shortenUrl();
                }
              }}
            />

            <button onClick={shortenUrl}>
              Shorten
            </button>

          </div>

          {shortUrl && (
            <div className="result">

              <div>
                <span>Your shortened URL</span>

                <strong>
                  {shortUrl}
                </strong>
              </div>

              <button onClick={copyUrl}>
                Copy
              </button>

            </div>
          )}

        </section>

        {history.length > 0 && (
          <section className="history">

            <div className="history-header">

              <h3>
                Recent URLs
              </h3>

              <button
                className="clear-btn"
                onClick={clearHistory}
              >
                Clear
              </button>

            </div>

            <div className="url-list">

              {history.map((item, index) => (
                <div
                  className="url-item"
                  key={index}
                >

                  <div className="original-url">
                    <span>Original</span>

                    <p>
                      {item.original}
                    </p>
                  </div>

                  <div className="short-url">
                    <span>Short URL</span>

                    <p>
                      {item.shortened}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        item.shortened
                      );
                    }}
                  >
                    Copy
                  </button>

                </div>
              ))}

            </div>

          </section>
        )}

      </main>

      <footer>
        <p>
          Built with React
        </p>
      </footer>

    </div>
  );
}

export default App;