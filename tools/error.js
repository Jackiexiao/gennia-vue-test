/**
 * 解析Cloudbase返回的错误唏嘘你
 * @param {String} message
 * @returns
 */
export function getError(message) {
  // 匹配code
  const codeRegex = /\[(\d+)\]/;
  const codeMatch = message.match(codeRegex);
  const code = codeMatch ? codeMatch[1] : "";

  // 匹配message
  const messageRegex = /\]\s(.*)/;
  const messageMatch = message.match(messageRegex);
  const errorMessage = messageMatch ? messageMatch[1] : "";

  return {
    code,
    message: errorMessage,
  };
}
