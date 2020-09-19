const databaseErrorCodes = {
  DUPLICATE_KEY: 11000,
};

/**
 * @returns {
     "message": "",
 }
 */
export const createDatabaseError = (error) => {
  if (error.code && error.message) {
    if (error.code === databaseErrorCodes.DUPLICATE_KEY) {
      return { message: "Une fiche existe déjà pour cet élève" };
    }
  }
};

/**
 * @returns {
     "email": "Please enter a valid E-mail!",
     "password": "Length of the password should be between 6-1000"
 }
 */
export const createValidationError = (error) => {
  let validationError = {};

  Object.keys(error).forEach((key) => {
    validationError[key] = error[key].message;
  });

  return validationError;
};

export const createServerError = (error) => {
  console.error(error);

  if (error.code) return createDatabaseError(error);
  if (error.name === "ValidationError") return createValidationError(error);

  return {
    message: error.message,
  };
};
