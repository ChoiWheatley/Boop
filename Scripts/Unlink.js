/**
{
  "api": 1,
  "name": "Markdown: Unlink [text](url) → text",
  "description": "마크다운 링크를 표시 텍스트만 남기고 제거합니다. 이미지는 유지합니다.",
  "author": "you",
  "icon": "link",
  "tags": "markdown,link,unlink,cleanup"
}
**/

function main(input) {
  let text = input.fullText;

  // 1) 인라인 링크: [text](url)  (이미지 구문 `![]()` 은 제외)
  //   - 앞에 '!' 가 붙지 않은 경우만 매칭: (^|[^!])
  //   - URL에 괄호가 포함되는 복잡 케이스까지 완벽히 처리하려면 파서가 필요하지만,
  //     일반적인 문서에서는 이 정규식으로 충분합니다.
  text = text.replace(
    /(^|[^!])\[(.*?)\]\([^)]+\)/g,
    (_, pre, label) => `${pre}${label}`
  );

  // 2) 레퍼런스 링크: [text][id]  → text
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1");

  // 3) 레퍼런스 정의 줄 제거: [id]: https://... "title"
  text = text.replace(
    /^[ \t]*\[[^\]]+\]:[ \t]*<?[^>\s]+>?(?:[ \t]+["'(][^"'()]+["')])?[ \t]*$/gm,
    ""
  );

  input.fullText = text;
}

