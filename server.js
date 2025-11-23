const app = require('./src/app');
const { port } = require('./src/config');

app.listen(port, () => {
  console.log(`Serveur demarre sur http://localhost:${port}`);
});
