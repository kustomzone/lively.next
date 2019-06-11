// Copyright (C) 2017 by Marijn Haverbeke <marijnh@gmail.com> and others
// https://codemirror.net/LICENSE

import "../js/mode.js";
import "../css/mode.js";
import "../xml/mode.js";

import {
  passIndent,
  getMode,
  defineMode,
  defineMIME,
  copyState,
  startState
} from "../editor-modes.js";


var defaultTags = {
  script: [
    ["lang", /(javascript|babel)/i, "javascript"],
    ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
    ["type", /./, "text/plain"],
    [null, null, "javascript"]
  ],
  style:  [
    ["lang", /^css$/i, "css"],
    ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
    ["type", /./, "text/plain"],
    [null, null, "css"]
  ]
};

function maybeBackup(stream, pat, style) {
  var cur = stream.current(), close = cur.search(pat);
  if (close > -1) {
    stream.backUp(cur.length - close);
  } else if (cur.match(/<\/?$/)) {
    stream.backUp(cur.length);
    if (!stream.match(pat, false)) stream.match(cur);
  }
  return style;
}

var attrRegexpCache = {};
function getAttrRegexp(attr) {
  var regexp = attrRegexpCache[attr];
  if (regexp) return regexp;
  return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
}

function getAttrValue(text, attr) {
  var match = text.match(getAttrRegexp(attr))
  return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : ""
}

function getTagRegexp(tagName, anchored) {
  return new RegExp((anchored ? "^" : "") + "<\/\s*" + tagName + "\s*>", "i");
}

function addTags(from, to) {
  for (var tag in from) {
    var dest = to[tag] || (to[tag] = []);
    var source = from[tag];
    for (var i = source.length - 1; i >= 0; i--)
      dest.unshift(source[i])
  }
}

function findMatchingMode(tagInfo, tagText) {
  for (var i = 0; i < tagInfo.length; i++) {
    var spec = tagInfo[i];
    if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0]))) return spec[2];
  }
}

defineMode("htmlmixed", function (config, parserConfig) {
  var htmlMode = getMode(config, {
    name: "xml",
    htmlMode: true,
    multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
    multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag
  });

  var tags = {};
  var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
  addTags(defaultTags, tags);
  if (configTags) addTags(configTags, tags);
  if (configScript) for (var i = configScript.length - 1; i >= 0; i--)
    tags.script.unshift(["type", configScript[i].matches, configScript[i].mode])

  function html(stream, state) {
    var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName
    if (tag && !/[<>\s\/]/.test(stream.current()) &&
        (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) &&
        tags.hasOwnProperty(tagName)) {
      state.inTag = tagName + " "
    } else if (state.inTag && tag && />$/.test(stream.current())) {
      var inTag = /^([\S]+) (.*)/.exec(state.inTag)
      state.inTag = null
      var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2])
      var mode = getMode(config, modeSpec)
      var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
      state.token = function (stream, state) {
        if (stream.match(endTagA, false)) {
          state.token = html;
          state.localState = state.localMode = null;
          return null;
        }
        return maybeBackup(stream, endTag, state.localMode.token(stream, state.localState));
      };
      state.localMode = mode;
      state.localState = startState(mode, htmlMode.indent(state.htmlState, ""));
    } else if (state.inTag) {
      state.inTag += stream.current()
      if (stream.eol()) state.inTag += " "
    }
    return style;
  };


  return {
    startState: function () {
      var state = startState(htmlMode);
      return {token: html, inTag: null, localMode: null, localState: null, htmlState: state};
    },

    copyState: function (state) {
      var local;
      if (state.localState) {
        local = copyState(state.localMode, state.localState);
      }
      return {token: state.token, inTag: state.inTag,
              localMode: state.localMode, localState: local,
              htmlState: copyState(htmlMode, state.htmlState)};
    },

    token: function (stream, state) {
      return state.token(stream, state);
    },

    indent: function (state, textAfter, line) {
      if (!state.localMode || /^\s*<\//.test(textAfter))
        return htmlMode.indent(state.htmlState, textAfter);
      else if (state.localMode.indent)
        return state.localMode.indent(state.localState, textAfter, line);
      else
        return passIndent;
    },

    innerMode: function (state) {
      return {state: state.localState || state.htmlState, mode: state.localMode || htmlMode};
    },

    electricInput: htmlMode.electricInput,
    blockCommentStart: htmlMode.blockCommentStart,
    blockCommentEnd: htmlMode.blockCommentEnd,
    skipAttribute: htmlMode.skipAttribute
  };
}, "xml", "javascript", "css");

defineMIME("text/html", "htmlmixed");