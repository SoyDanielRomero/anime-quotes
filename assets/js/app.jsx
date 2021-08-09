const App = () => {
  const { useState, useEffect } = React;
  const { Card, Container, Button, Form } = ReactBootstrap;
  const [query, setQuery] = useState('naruto');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    'https://animechan.vercel.app/api/quotes/anime?title=naruto'
  );
  const [isError, setIsError] = useState(false);

  // !Fetching Data
  useEffect(() => {
    const getConfig = {
      method: 'get',
      url: url,
      data: {
        anime: '',
        character: '',
        quote: '',
      },
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios(getConfig);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  return (
    <>
      <header>
        <h1>Get the TOP 10 of your favorite anime's quotes</h1>
      </header>
      <main>
        <Container>
          <Form
            onSubmit={(event) => {
              setUrl(
                `https://animechan.vercel.app/api/quotes/anime?title=${query}`
              );
              event.preventDefault();
            }}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Enter your favorite Anime'
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          {isError && <div>Something went wrong ...</div>}

          {isLoading ? (
            <div>Loading quotes...</div>
          ) : (
            <ul>
              {data.map((item, i) => (
                <li key={i}>
                  <Card>
                    <Card.Body>
                      <blockquote className='blockquote mb-0'>
                        <p>{item.quote}</p>
                        <span className='blockquote-footer'>
                          <cite title='Source Title'>{item.character}</cite>
                        </span>
                      </blockquote>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </main>
      <footer>Made with ❤️ by Daniel Romero</footer>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
