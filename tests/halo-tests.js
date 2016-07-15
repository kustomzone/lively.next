/*global declare, it, describe, beforeEach, afterEach, before, after*/
import { expect } from "mocha-es6";
import { createDOMEnvironment } from "../rendering/dom-helper.js";
import { morph, Renderer } from "../index.js";
import { pt, Color, Rectangle } from "lively.graphics";

var world, submorph1;

function createDummyWorld() {
  world = morph({
    type: "world", name: "world", extent: pt(300,300),
    submorphs: [{
        name: "submorph1", extent: pt(100,100), position: pt(10,10), fill: Color.red,
        submorphs: [{name: "submorph2", extent: pt(20,20), position: pt(5,10), fill: Color.green}]
      }
    ]
  });
  submorph1 = world.submorphs[0];
}

var renderer, domEnv;
async function createAndRenderDummyWorld() {
  createDummyWorld();
  domEnv = await createDOMEnvironment();
  renderer = new Renderer(world, domEnv.document.body, domEnv);
  renderer.startRenderWorldLoop()
}

function cleanup() {
  renderer && renderer.clear();
  domEnv && domEnv.destroy();
}

describe("halos", () => {

  beforeEach(async () => createAndRenderDummyWorld());
  afterEach(() => cleanup());

// createAndRenderDummyWorld()
// cleanup()

  it("halo items are placed correctly", () => {
    submorph1.origin = pt(20,30);
    var halo = world.showHaloFor(submorph1),
        innerButton = halo.buttonControls.find(item =>
          submorph1.bounds().containsPoint(item.globalBounds().center()));
    expect(innerButton).equals(undefined, `halo item ${innerButton} is inside the bounds of its target`);
    expect(halo.originHalo().position).equals(submorph1.origin);
  });
});
