import { getDecimalPoint } from "./getDecimals";

export const formatCurrency = (value: number, currency: string = "USD", locale: string = "en-US") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: getDecimalPoint(String(value)),
        maximumFractionDigits: getDecimalPoint(String(value)),
    }).format(value);
};
