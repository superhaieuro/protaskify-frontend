import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import TextareaAutosize from 'react-textarea-autosize';
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import InputText from "../../atoms/input-text";
import InputDate from "../../atoms/input-date";
import { ToastContext } from "../../../utils/toast-context";
import api from "../../../config/axios";

type ModalCreateNewFeatureProps = {
    isVisible: boolean;
    onClose: () => void;
};

const ModalCreateNewFeature: FC<ModalCreateNewFeatureProps> = ({ isVisible, onClose }) => {
    const [inputDescription, setInputDescription] = useState("");
    const [inputName, setInputName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [inputNameError, setInputNameError] = useState("");
    const [inputDescriptionError, setInputDescriptionError] = useState("");

    const toast = useContext(ToastContext);

    const tomorrow = (date: Date): Date => {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        setEndDate(nextDay);
        return nextDay;
    }

    useEffect(() => {
        if (endDate < startDate) {
            setEndDate(tomorrow(startDate));
            toast?.setErrorMessage("End date cannot be earlier than the start date.");
        }
    }, [startDate, endDate]);

    const handleCreate = () => {
        let valid = true;
        if (inputName.length < 5 || inputName.length > 200) {
            setInputNameError("Name must be from 5 to 200 characters.");
            valid = false;
        } else {
            setInputNameError("");
        }

        if (inputDescription.length < 5) {
            setInputDescriptionError("Description must be from 5 characters.");
            valid = false;
        } else {
            setInputDescriptionError("");
        }

        if (valid === true) {
            try {
                const request = {
                    name: inputName,
                    description: inputDescription,
                    status: false,
                    startDate: startDate,
                    endDate: endDate
                }
                const fetchUserData = async () => {
                    const response = await api.post("/api/v1/student/create-feature", request, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });
                    if (response.status === 201) {
                        // toast?.setSuccessMessage("Create feature successfully.");
                        window.location.reload();
                    } else {
                        toast?.setErrorMessage("Failed to send data.");
                    }
                }
                fetchUserData();
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">New feature</div>
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputDescription("");
                            setInputNameError("");
                            setInputDescriptionError("");
                            setStartDate(new Date());
                            setEndDate(new Date());
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Feature name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="flex gap-5">
                        <div className="w-full">
                            <InputDate value={startDate} title="Start date" readonly={false} onChange={(e) => setStartDate(e)} />
                        </div>

                        <div className="w-full">
                            <InputDate value={endDate} title="End date" readonly={false} onChange={(e) => setEndDate(e)} />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-sm font-semibold">Description</div>
                            <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600"
                                minRows={5} maxRows={10} value={inputDescription} onChange={(e) => { setInputDescription(e.target.value) }} />
                            {inputDescriptionError !== "" ? <div className="text-xs text-red-600">{inputDescriptionError}</div> : null}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputDescription("");
                            setInputNameError("");
                            setInputDescriptionError("");
                            setStartDate(new Date());
                            setEndDate(new Date());
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate}>
                            <ApproveButton icon="" message="Create" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalCreateNewFeature;