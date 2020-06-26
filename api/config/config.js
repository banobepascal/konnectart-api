const config = {
  port: process.env.PORT || 4000,
  db: process.env.MONGOLAB_URI || 'mongodb://localhost/konnectart',
  test_db: 'mongodb://localhost/konnectartTest',
  test_port: 8000,
};

export default config;
