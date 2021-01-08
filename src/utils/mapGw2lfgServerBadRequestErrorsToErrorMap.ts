interface Gw2lfgServerBadRequestErrorData {
  property: string;
  constraints: { [key: string]: string[] };
}

// maps complicated bad-request errors structure into simple property:message map
export function mapGw2lfgServerBadRequestErrorsToErrorMap(
  errors: Gw2lfgServerBadRequestErrorData[]
) {
  const errorMap: Record<string, string> = {};

  for (const { property, constraints } of errors) {
    const message = Object.values(constraints).join("\n");
    errorMap[property] = message;
  }

  return errorMap;
}