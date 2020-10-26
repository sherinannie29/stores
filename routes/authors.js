const express = require("express");
const router = express.Router();
const { validate } = require("../controllers/mainController");
const { getData, writeData } = require("../utils/utils");

router.put("/:id", validate("putAuthor"), async (req, res, next) => {
  try {
    const authorToAdd = req.body.addAuthor;
    const addId = req.params.id;

    if (authorToAdd.id != addId) {
      throw new Error("Invalid request.");
    } else {
      let data = await getData();
      const authors = data["authors"];
      let authorPos = null;

      const authorDetails = authors.filter((author, index) => {
        if (author.id === authorToAdd.id) {
          authorPos = index;
          return author;
        }
      });

      if (authorPos != null) {
        //null checked needed here as pos can be 0 which becomes falsy.
        if (authorDetails[0].id != addId)
          //If the author already exists ID cannot be modified.
          throw new Error("Cannot modify Id for the author.");
        else authors.splice(authorPos, 1, authorToAdd);

        data = { ...data, authors };
        writeData(data);
        res.send(`Updated details for author with id: ${addId}`);
      } else {
        authors.push(authorToAdd);
        data = { ...data, authors };
        writeData(data);
        res.send(`Added details for author with id: ${addId}`);
      }
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

module.exports = router;
