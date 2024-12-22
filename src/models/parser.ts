export const fromJson = <T>(
    json: Record<string, any>
): T | undefined => {
    return JSON.parse(JSON.stringify(json));
};
export const fromJsonList = <T>(
    jsonList: Record<string, any>[]
): T[] => {


    return jsonList.map((json) => fromJson<T>(json)).filter((item) => item !== null && item !== undefined);
};
