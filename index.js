const app = require('./app'); // Replace with the path to your Express app file

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(3000, () => {
      const { port } = server.address();
      console.log(`Express server listening on port ${port}`);
      resolve();
    });
  });
};

