"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Brenden Riley
   Date:   4.2.19

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

// Global variables to be used later
var nodeCount = 1;
var elemCount = 0;
var textCount = 1;
var wsCount = 1;

// loads the tree in on the page laoding
window.onload = makeTree;

// creates the aside tree on the right
function makeTree() {
      // fragments for the aside on the right
      var aside = document.createElement("aside");
      aside.id = "treeBox";
      aside.innerHTML = "<h1>Node Tree</h1>";

      // inserts the aside into the document inside the main article
      var sectionMain = document.getElementById("main");
      sectionMain.appendChild(aside);

      // creates the list for the aside
      var nodeList = document.createElement("ol")
      aside.appendChild(nodeList);

      // sets the article that will be used as a source (the book says to use querySelectorAll() but that breaks everything)
      var sourceArticle = document.querySelector("#main article");

      // runs the make branches function for the aside
      makeBranches(sourceArticle, nodeList);

      // displays the number of differenet types of nodes within the page
      document.getElementById("totalNodes").textContent = nodeCount;
      document.getElementById("elemNodes").textContent = elemCount;
      document.getElementById("textNodes").textContent = textCount;
      document.getElementById("wsNodes").textContent = wsCount;
}

// the function will make the branches of the page
function makeBranches(treeNode, nestedList) {
      // nodeCount increases every time the function is run
      nodeCount++;
      // A list item is created with +-- beside it
      var liElem = document.createElement("li");
      liElem.innerHTML = ("+--");

      // A span is created to put into different nodes
      var spanElem = document.createElement("span")
      liElem.appendChild(spanElem);
      nestedList.appendChild(liElem);

      // Checks to see if the element is either an element or text node
      if (treeNode.nodeType === 1) {
            // increases the number of element nodes
            elemCount++;
            // sets the class of each span, and puts in the element name that it is
            spanElem.setAttribute("class", "elementNode");
            spanElem.textContent = "<" + treeNode.nodeName + ">"
      } else if (treeNode.nodeType === 3) {
            // increases the number of text nodes
            textCount++;
            // sets the text string
            var textString = treeNode.nodeValue;

            // Checks to see if the text node is white space or not, and subsequently sets their classes to reflect this
            if (isWhiteSpaceNode(textString)) {
                  // increases the number of white spave nodes
                  wsCount++;
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  spanElem.textContent = textString;

            } else {
                  spanElem.setAttribute("class", "textNode")
                  spanElem.textContent = textString;
            }
      }
      // Will add a decorative pipe between each of the elements and text nodes wihtin the aside, and adds recursion so all nodes are accounted for
      if (treeNode.childNodes.length > 0) {
            var newList = document.createElement("ol");
            newList.innerHTML = "|";
            nestedList.appendChild(newList);
            for (var n = treeNode.firstChild; n != null; n = n.nextSibling) {
                  makeBranches(n, newList);
            }
      }

}


// PREMADE
function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}