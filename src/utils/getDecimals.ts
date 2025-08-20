export const getDecimalPoint = (val: string) => {
    const part = val.split(".")[1]
    for (let idx = 0; idx < part?.length; idx++) {
        const char = part[idx];
        if (+char !== 0) {
            if (idx + 1 <= 2) {
                return 2;
            } else {
                return idx + 2;
            }
        }
    }

    return 2
}