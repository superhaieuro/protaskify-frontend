import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

export type Project = {
    name: string | null;
    problems: string | null;
    context: string | null;
    actors: string | null;
    functionalRequirements: string | null;
    nonFunctionalRequirements: string | null;
};

type ModalImportProjectListProps = {
    isVisible: boolean;
    onClose: () => void;
    data: string;
};

const ModalImportProjectList: FC<ModalImportProjectListProps> = ({
    isVisible,
    onClose,
    data,
}) => {
    const toast = useContext(ToastContext);
    const [loading, setLoading] = useState(false);

    const handleCreate = () => {
        setLoading(true);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const request = {
                    projects: JSON.parse(data),
                };
                const response = await api.post(
                    "api/v1/admin/import-project",
                    request,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status === 200) {
                    // toast?.setSuccessMessage("Import successfully.");
                    window.location.reload();
                    onClose();
                } else {
                    toast?.setErrorMessage("Failed to send data.");
                }
            } catch (error) {
                console.log(error);
                toast?.setErrorMessage("An error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            fetchUserData();
        }
    }, [loading]);

    if (!isVisible) {
        return null;
    } else {
        const jsonData: Project[] = JSON.parse(data);
        return (
            <div
                className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center"
            >
                <div className="bg-white p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Import projects</div>
                        <button onClick={() => onClose()}>
                            <XButton />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        {/* <div>Project list</div> */}
                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-5 bg-gray-50 flex gap-x-5 rounded-t-lg border-b border-gray-200 ">
                                <div className="w-10">#</div>
                                <div className="w-32">Subject name</div>
                                <div className="w-52">Context</div>
                                <div className="w-52">Problem</div>
                                <div className="w-52">Actors</div>
                                <div className="w-52">Functional requirements</div>
                                <div className="w-52">Non-Functional requirements</div>
                            </div>
                            <div className="max-h-96 overflow-y-auto divide-y">
                                {jsonData.map((project, index) => (
                                    <div key={index} className="p-5 flex gap-x-5">
                                        <div className="w-10">{index + 1}</div>
                                        <div className="w-32">{project.name}</div>
                                        <div className="w-52">{project.context}</div>
                                        <div className="w-52">{project.problems}</div>
                                        <div className="w-52">{project.actors}</div>
                                        <div className="w-52">
                                            {project.functionalRequirements}
                                        </div>
                                        <div className="w-52">
                                            {project.nonFunctionalRequirements}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => onClose()}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate} disabled={loading}>
                            <ApproveButton icon="" message="Create" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalImportProjectList;
