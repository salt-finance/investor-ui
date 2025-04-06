import type { Reviver } from 'utils/http_client';

export const fromJson = <T>(
  json: Record<string, any>,
  reviever?: Reviver,
): T | undefined => {

  var parsed = JSON.parse(JSON.stringify(json));

  if (Array.isArray(parsed.response) && reviever) {
    parsed.response = parsed.response.map((item: any) => {
      return reviever(item);
    });
  }

  return parsed;
}
