const unified = require("unified");
const parse = require("remark-parse");
const github = require("remark-gfm");
const githubReferences = require("remark-github");
const breaks = require("remark-breaks");
const rehype = require("remark-rehype");
const stringify = require("rehype-stringify");

const {
  GITHUB_REPOSITORY_OWNER,
  GITHUB_REPOSITORY_NAME,
} = require("../lib/constants.js");

const repository = [GITHUB_REPOSITORY_OWNER, GITHUB_REPOSITORY_NAME].join("/");

module.exports = async function (markdown) {
  const output = await unified()
    .use(parse)
    .use(github)
    .use(breaks)
    .use(githubReferences, {
      repository,
    })
    .use(rehype)
    .use(stringify)
    .process(markdown);

  return String(output);
};
