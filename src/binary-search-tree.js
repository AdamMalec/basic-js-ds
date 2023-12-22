const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {

    function addWithin(node, data) {

      if (!node) return new Node(data);

      if (node.data === data) return node;

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }

    this.tree = addWithin(this.tree, data);
  }

  has(data) {

    function searchWithin(node, data) {

      if (!node) return false;

      if (node.data === data) return true;

      if (data < node.data) {
        return searchWithin(node.left, data)
      } else {
        return searchWithin(node.right, data);
      }
    }

    return searchWithin(this.tree, data);
  }

  find(data) {
    function searchWithin(node, data) {

      if (!node) return null;

      if (node.data === data) return node;

      if (data < node.data) {
        return searchWithin(node.left, data)
      } else {
        return searchWithin(node.right, data);
      }
    }

    return searchWithin(this.tree, data);
  }

  remove(data) {

    function removeNode(node, data) {

      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {

        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while(minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }

    this.tree = removeNode(this.tree, data);
  }

  min() {

    if (!this.tree) return;

    let node = this.tree;
    while (node.left) {
      node = node.left;
    }

    return node.data
  }

  max() {

    if (!this.tree) return;

    let node = this.tree;
    while (node.right) {
      node = node.right;
    }

    return node.data
  }
}

module.exports = {
  BinarySearchTree
};
