export function omitKeyFromObject(key: any, obj: any) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}