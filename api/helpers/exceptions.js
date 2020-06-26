const exceptionHandler = (validator, res, next) => {
  const { error } = validator;
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export default exceptionHandler;
