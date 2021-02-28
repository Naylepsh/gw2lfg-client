interface Gw2lfgServer400ErrorData {
  property: string;
  constraints: { [key: string]: string[] };
}

/**
 * Maps complicated bad-request errors structure into simple property:message map
 */
export function mapGw2lfgServer400ErrorsToErrorMap(
  errors: Gw2lfgServer400ErrorData[]
) {
  const errorMap: Record<string, string> = {};

  for (const { property, constraints } of errors) {
    const message = Object.values(constraints).join("\n");
    errorMap[property] = message;
  }

  return errorMap;
}
