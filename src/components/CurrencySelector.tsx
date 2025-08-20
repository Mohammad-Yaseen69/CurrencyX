import { useMemo } from "react";
import Select from "react-select";
import { currencies } from "../utils/currencies";


const CurrencySelector = ({
    val,
    setter,
    title,
}: {
    val: string;
    setter: (val: string) => void;
    title: string;
}) => {
    const defaultValue = useMemo(
        () => currencies.find((c) => c.value === val),
        [val]
    );

    return (
        <div className="flex-1 text-left w-full">
            <label className="block mb-2">{title}</label>
            <Select
                options={currencies}
                value={defaultValue}
                onChange={(opt) => setter(opt?.value || "")}
                isSearchable
                className="text-black"
                styles={{
                    control: (base: object) => ({
                        ...base,
                        borderRadius: "0.5rem",
                        backgroundColor: "#1f1f1f",
                        borderColor: "#3f3f3f",
                        padding: "2px",
                    }),
                    menu: (base: object) => ({
                        ...base,
                        backgroundColor: "#1f1f1f",
                        color: "white",
                        cursor: "pointer"
                    }),
                    singleValue: (base: object) => ({
                        ...base,
                        color: "white",
                    }),
                    input: (base: object) => ({
                        ...base,
                        color: "white",
                    }),
                    option: (base: object) => ({
                        ...base,
                        backgroundColor: "#27272a",
                        color: "white",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "transparent", 
                            color: "#38bdf8", 
                        },
                    })
                }}
            />
        </div>
    );
};

export default CurrencySelector;
