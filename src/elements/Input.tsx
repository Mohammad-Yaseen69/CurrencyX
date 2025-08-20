import type React from "react"

const Input = ({ val, setter, label, type, placeholder }: { val: string, setter: (e: React.ChangeEvent<HTMLInputElement>) => void, label: string, type: string, placeholder: string }) => {
    return (
        <div className="w-full mb-4 text-left">
            <label className="block mb-2">{label}</label>
            <input
                type={type}
                value={val}
                onChange={setter}
                placeholder={placeholder}
                className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-600 focus:outline-none focus:border-blue-500"
            />
        </div>
    )
}

export default Input
