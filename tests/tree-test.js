/*global declare, it, describe, beforeEach, afterEach, before, after*/
import { Tree, TreeData } from "../tree.js";
import { expect } from "mocha-es6";
import { pt, rect, Color, Rectangle, Transform } from "lively.graphics";
import { arr } from "lively.lang";
import { dummyFontMetric as fontMetric } from "./test-helpers.js";

function testTreeData() {
  class TestTreeData extends TreeData {
    display(node) { return node.morph || node.name }
    isCollapsed(node) { return node.isCollapsed }
    collapse(node, bool) { node.isCollapsed = bool; }
    getChildren(node) { return node.isLeaf ? null : node.isCollapsed ? [] : node.children }
    isLeaf(node) { return node.isLeaf }
  }

  return new TestTreeData({
    name: "root",
    isCollapsed: false,
    isLeaf: false,
    children: [
      {name: "child 1", isLeaf: true},
      {name: "child 2", isLeaf: false, isCollapsed: true, children: [{name: "child 2 - 1", isLeaf: true}]},
      {name: "child 3", isLeaf: false,
       isCollapsed: false,
       children: [
         {name: "child 3 - 1", isLeaf: true},
         {name: "child 3 - 2", isLeaf: true}
       ]},
      {name: "child 4", isLeaf: true},
    ]
  });
}
var tree;

describe("tree", () => {

  beforeEach(() => {
    tree = new Tree({
      fontMetric,
      extent: pt(200,200), fill: Color.white, border: {color: Color.gray, width: 1},
      padding: Rectangle.inset(0), treeData: testTreeData()
    });
  });

  it("renders visible items without root", () => {
    expect(arr.pluck(tree.submorphs[0].submorphs, "textString"))
      .equals(["child 1", "child 2", "child 3", "child 3 - 1", "child 3 - 2", "child 4"]);

    var h = tree.nodeMorphHeight;
    tree.height = h*3;
    tree.scroll = pt(0, 2*h);
    tree.update();
    expect(arr.pluck(tree.submorphs[0].submorphs, "textString"))
      .equals(["child 2", "child 3", "child 3 - 1", "child 3 - 2"]);
  });

  it("selects", () => {
    expect(tree.selectedIndex).equals(-1);
    expect(tree.selection).equals(null)
    tree.selection = tree.treeData.root.children[1];
    expect(tree.selectedIndex).equals(2);
    expect(tree.selection).containSubset({isCollapsed: true, name: "child 2"});
  })
  
  it("descends along path and returns node", async () => {
    var path = ["root", "child 3", "child 3 - 2"],
        td = tree.treeData,
        found = await td.followPath(path,
          (pathPart, node) => td.display(node) === pathPart);
    expect(td.root.children[2].children[1]).equals(found);
  });

});
