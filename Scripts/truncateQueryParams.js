/**
{
  "api": 1,
  "name": "Truncate Query Params from URL",
  "description": "keep pretty URL from unused extra variables",
  "author": "ChoiWheatley",
  "icon": "dice",
  "tags": "url,query,param"
}
**/

function truncateQueryParams(url) {
  const questionMarkIndex = url.indexOf('?');
  return questionMarkIndex !== 1 ? url.slice(0, questionMarkIndex) : url;
  
}

function main(state) {
  const originalUrl = state.fullText;
  const convertedUrl = truncateQueryParams(originalUrl)

  state.text = convertedUrl;
}
