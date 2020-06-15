const config = {
  port: process.env.PORT || 3000,
  db: process.env.MONGOLAB_URI || 'mongodb://localhost/konnectart',
  test_port: 5000,
  test_db: 'mongodb://localhost/konnectartTest',
};

export default config;
