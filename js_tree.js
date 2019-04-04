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

var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

window.addEventListener("load", makeTree);

function makeTree() {
      var fragment = document.createElement("aside");
      fragment.setAttribute("id", "treeBox");
      var fragchild1 = document.createElement("h1");
      fragment.appendChild(fragchild1);
      fragchild1.appendChild(document.createTextNode("Node Tree"));
      document.getElementById("main").appendChild(fragment);

      var nodeList = document.createElement("ol")
      fragment.appendChild(nodeList);

      var sourceArticle = document.querySelectorAll("#main article");

      makeBranches(sourceArticle, nodeList);

      document.getElementById("totalNodes").innerHTML = nodeCount;
      document.getElementById("elemNodes").innerHTML = elemCount;
      document.getElementById("textNodes").innerHTML = textCount;
      document.getElementById("wsNodes").innerHTML = wsCount;
}

function makeBranches(treeNode, nestedList) {
      nodeCount++;
      var liElem = document.createElement("li");
      var spanElem = document.createTextNode("+--<span></span>");
      liElem.appendChild(spanElem);
      nestedList.appendChild(liElem);

      if (treeNode.nodeType == 1) {
            console.log("this is true")
            elemCount++;
            spanElem.setAttribute("class", "elementNode");
            spanElem.appendChild("<" + spanElem.nodeName.textContent + ">")
      } else if (treeNode.nodeType == 2) {
            console.log("this is true 2")
            textCount++;
            var textString = treeNode;
            if (isWhiteSpaceNode(textString) == true) {
                  console.log("this is true 3")
                  wsCount++;
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  var fragtext2 = "#text";
                  spanElem.appendChild(fragtext2);
            } else {
                  console.log("this is true 4")
                  spanElem.setAttribute("class", "textNode")
                  spanElem.appendChild("" + textString + "")
            }
      }
      if (document.getElementById("main").childNodes > 0) {
            console.log("this is true 5")
            var newList = document.createElement("ol");
            newList.appendChild(document.createTextNode("|"));
            nestedList.appendChild("newList");
            for (var n = document.getElementById("main").firstChild; n !== null; n = n.nextSibling) {
                  makeBranches(n, newList);
            }
      }

}


// PREMADE
function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}