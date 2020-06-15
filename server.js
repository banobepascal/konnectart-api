// const express = require("express");
import express from 'express';
const app = express();

const port = 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port} ...`)
);

export default server;
