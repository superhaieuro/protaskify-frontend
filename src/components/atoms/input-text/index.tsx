import { FC } from "react";

type InputTextProps = {
    title: string;
    placeholder: string;
    value: string;
    readonly: boolean;
    onChange: (e: any) => void;
    error: string;
}

const InputText: FC<InputTextProps> = ({ title, placeholder, value, readonly, onChange, error }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <div className="text-sm font-semibold">{title}</div>
            <input className={`border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg outline-none 
            ${readonly ? "text-gray-600" : "text-black ring-blue-600 focus:ring-1 focus:border-blue-600"}`}
                type="text" placeholder={placeholder} value={value} readOnly={readonly}
                onChange={(e) => onChange(e)} />
            {error !== "" ? <div className="text-xs text-red-600">{error}</div> : null}
        </div>
    )
}

export default InputText;