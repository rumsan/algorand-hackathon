export const stringToUint8Array = (string: string) => {
    const arrayOfSignature = string.split(',').map(Number);
    return new Uint8Array(arrayOfSignature);
}