// This middleware takes a Zod schema and validates req.body against it
// If validation fails — return 400 with clear error messages
// If validation passes — call next() and let controller run

export const validate = (schema) => (req, res, next) => {
  // safeParse does NOT throw — it returns { success, data, error }
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // result.error.errors is an array of all validation errors
    // We map it to get just the messages in a clean format
    const errorMessages = result.error.errors.map((err) => ({
      field: err.path.join("."), // which field failed e.g "email"
      message: err.message,      // what went wrong e.g "Invalid email"
    }));

    return res.status(400).send({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
  }

  // Validation passed — replace req.body with the parsed/cleaned data
  req.body = { ...req.body, ...result.data };
  next();
};
