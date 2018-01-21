test('must render App in root div', () => {
  const rootDiv = document.createElement('div');
  rootDiv.setAttribute('id', 'root');
  document.body.appendChild(rootDiv);

  require('./index'); // eslint-disable-line global-require

  expect(document.getElementById('root').children).toHaveLength(1);
});
