const { body } = require("express-validator");


const validate = (method) => {
  switch (method) {
    case "putAuthor": {
      return [
        body(`id`).exists().isInt(),
        body(`userName`, `userName doesn't exists`).exists(),
      ];
    }
  }
};

module.exports = { validate };
