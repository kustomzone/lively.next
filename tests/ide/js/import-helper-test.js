/*global declare, it, describe, beforeEach, afterEach*/
import { expect } from "mocha-es6";

import { cleanupUnusedImports, interactivelyInjectImportIntoText } from "lively.morphic/ide/js/import-helper.js";

import { Text } from 'lively.morphic';
import { JavaScriptEditorPlugin } from "lively.morphic/ide/js/editor-plugin.js";

function listItem(item) {
  // make sure that object is of the form
  // {isListItem: true, string: STRING, value: OBJECT}
  if (item && item.isListItem && typeof item.string === "string") return item;
  if (!item || !item.isListItem) return {isListItem: true, string: String(item), value: item};
  var label = item.string || item.label || "no item.string";
  item.string = typeof label === "string" ? label :
    Array.isArray(label) ?
      label.map(ea => String(ea[0])).join(" ") :
      String(label);
  return item;
}

describe("import helper - cleanup unused imports", () => {

  it("runs command on text", async () => {
    var ed = new Text({plugins: [new JavaScriptEditorPlugin()]}),
        dummyWorld = {confirm: () => true};

    ed.world = () => dummyWorld;
    ed.textString = `import { Text } from "lively.morphic";\nfooo;`;

    await cleanupUnusedImports(ed);
    expect(ed.textString).equals(`\nfooo;`, "1");

    ed.textString = `import Text, { Text, Morph } from "lively.morphic";\nMorph;`;
    await cleanupUnusedImports(ed);
    expect(ed.textString).equals(`import { Morph } from 'lively.morphic';\nMorph;`, "1");
  });

});


describe("import helper - injection command", () => {
  // end-to-end test

  var ed, queryMatcher;
  beforeEach(() => {
    ed = new Text({plugins: [new JavaScriptEditorPlugin()]});
    var targetModule = `lively://import-helper-test/${Date.now()}`,
        dummyWorld = {
          filterableListPrompt: (_, items) =>
            ({selected: items
                        .filter(item => queryMatcher(listItem(item).string))
                        .map(ea => ea.value)})
          };

    ed.plugins[0].evalEnvironment.targetModule  = targetModule;
    ed.textString = `import { Text } from "lively.morphic";`;
    ed.world = () => dummyWorld;
  });

  it("runs command on text and inserts code and imports object", async () => {
    queryMatcher = string => string.match(/^(HTML)?Morph\s.*morphic\/index\.js/);
    await interactivelyInjectImportIntoText(ed, {gotoImport: true});
    expect(ed.textString)
      .equals(`import { Text, HTMLMorph, Morph } from "lively.morphic";`, "transformed code");
    expect(ed.selection.text).stringEquals(", HTMLMorph", "selection");
    expect((await ed.plugins[0].runEval("Morph")).value.name)
      .equals("Morph", "import not evaluated");
    expect((await ed.plugins[0].runEval("HTMLMorph")).value.name)
      .equals("HTMLMorph", "import not evaluated");
  });

  it("runs command on text and inserts imports", async () => {
    queryMatcher = string => string.match(/^(HTML)?Morph\s.*morphic\/index\.js/);
    ed.gotoDocumentEnd()
    await interactivelyInjectImportIntoText(ed, {gotoImport: false, insertImportAtCursor: true});
    expect(ed.textString)
      .equals(`import { Text, HTMLMorph, Morph } from "lively.morphic";\nMorph\nHTMLMorph`, "transformed code");
    expect(ed.cursorPosition).deep.equals(ed.documentEndPosition);
  });

});
