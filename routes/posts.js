const express = require("express");
const router = express.Router();
const fs = require("fs");
const filePath = "stores.json";
const { getData, writeData } = require("../utils/utils");

router.get("", async (req, res, next) => {
  try {
    const filterTitle = req.query.title;
    const filterAuthor = req.query.author;

    const sort = req.query._sort;
    const order = req.query._order;

    const searchKey = req.query.q;

    let data = await getData();
    const posts = data.posts;

    if (filterTitle && filterAuthor) {
      const filteredPosts = posts.filter(
        (post) => post.title === filterTitle || post.author === filterAuthor
      );
      filteredPosts ? res.send(filteredPosts) : res.send(`No records found`);
    } else if (sort && order) {
      const sortedPosts =
        order === "asc"
          ? posts.sort((a, b) => a[sort] - b[sort])
          : posts.sort((a, b) => b[sort] - a[sort]);
      res.send(sortedPosts);
    } else if (searchKey) {
      foundList = posts.find((post) =>
        Object.values(post).some((val) => val.includes(searchKey))
      );
      foundList ? res.send(foundList) : res.send(`No records found`);
    } else {
      res.send(posts);
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const paramId = req.params.id;

    let data = await getData();
    const posts = data.posts;
    const postDetails = posts.filter((post) => post.id === paramId);
    postDetails.length > 0
      ? res.send(postDetails[0])
      : res.send("User not found");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const updateDetails = req.body;
    let postPos = null;

    let data = await getData();
    const posts = data.posts;

    const postToUpdate = posts.filter((post, index) => {
      if (post.id === postId) {
        postPos = index;
        return post;
      }
    });

    if (postPos != null) {
      //null checked needed here as pos can be 0 which becomes falsy.
      if (updateDetails.id && updateDetails.id != postId) {
        throw new Error("Cannot modify id.");
      } else {
        const final = Object.keys(updateDetails).map(
          (key) => (postToUpdate[0][key] = updateDetails[key])
        );
        posts.splice(postPos, 1, postToUpdate[0]);

        data = { ...data, posts };
        writeData(data);
        res.send(`Updated details successfully`);
      }
    } else {
      res.send("Record not found");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteId = req.params.id;
    let data = await getData();
    const posts = data.posts;
    const deletedPosts = posts.filter((post) => post.id != deleteId);

    if (deletedPosts.length < posts.length) {
      data.posts = deletedPosts;
      writeData(data);
      res.send(`Post with id : ${deleteId} deleted successfully.`);
    } else {
      res.send(`Post with id : ${deleteId} not found.`);
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

module.exports = router;
