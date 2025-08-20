import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CurrencySelector from "./CurrencySelector";
import Input from "../elements/Input";
import { formatCurrency } from "../utils/currencyFormat";



const makeRequest = async (from: string) => {
    return axios.get(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/latest/${from}`)
}
const Conversion = () => {
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("PKR");
    const [amount, setAmount] = useState(1.0);
    const { data, refetch, isLoading, error, isError, } = useQuery({
        queryKey: ["getExchange"],
        queryFn: () => makeRequest(from),
        staleTime: 3600000
    })

    const rate = useMemo(() => {
        return data?.data?.conversion_rates?.[to] * amount
    }, [data, to, amount])

    return (
        <div className="border-[1px] text-white font-[600] flex flex-col text-center items-stretch min-w-[500px] border-zinc-700 p-5 rounded-lg bg-zinc-900 max-sm:min-w-full max-sm:w-full max-sm:min-h-[80vh] max-sm:justify-between">
            <h1 className="text-[30px] mb-5">Currency Converter</h1>

            <div>
                <Input
                    label="Enter Amount"
                    placeholder="Enter the amount"
                    val={String(amount)}
                    type="number"
                    setter={(e) => { setAmount(Number(e.target.value)) }}
                />

                <div className="flex items-center gap-3 mb-4 max-sm:flex-col max-sm:gap-0">
                    <CurrencySelector setter={setFrom} title="From" val={from} />

                    <button
                        onClick={() => {
                            setFrom(to)
                            setTo(from)
                        }}
                        className="mt-6 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full border border-zinc-600 transition-colors"
                    >
                        <ArrowLeftRight className="w-5 h-5 text-white" />
                    </button>

                    <CurrencySelector setter={setTo} title="To" val={to} />
                </div>

                <button disabled={isLoading} onClick={() => {
                    if (from !== data?.data?.base_code) {
                        refetch()
                    }
                }} className="w-full mt-3 bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded-lg">
                    {isLoading ? "Loading..." : "Convert"}
                </button>
            </div>

            <div className="mt-5 text-xl">
                {isError && <p> {error.message} </p>}
                {
                    !isError &&
                    <p>
                        Converted Amount: <span className="text-green-400"> {(rate && from === data?.data?.base_code) ? formatCurrency(rate, to) : "---"} </span>
                    </p>
                }
            </div>
        </div>
    );
};

export default Conversion;