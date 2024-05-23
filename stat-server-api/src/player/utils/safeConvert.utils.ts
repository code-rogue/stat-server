export function safeConvertInt(value: number | string): number {
    if(typeof(value) === "string")
       return parseInt(value);   

    return value;
 }

 export function safeConvertFloat(value: number | string): number {
    if(typeof(value) === "string") {
       return parseFloat(value);
    }

    return value;
 }