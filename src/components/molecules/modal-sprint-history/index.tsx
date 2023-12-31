import { FC } from "react";
import XButton from "../../atoms/x-button";
import StatusBox from "../../atoms/status-box";

type ModalSprintHistoryProps = {
    isVisible: boolean;
    onClose: () => void;
    sprintList: Sprint[] | undefined;
    group: Group;
};

type Sprint = {
    id: string;
    name: string;
    note: string;
    feedbackList: Feedback[];
    startDate: Date;
    endDate: Date;
}

type Feedback = {
    feedback: string;
    sprint: Sprint;
}

type Group = {
    id: string;
    name: string;
    score: string;
    feedbackList: Feedback[];
}

const ModalSprintHistory: FC<ModalSprintHistoryProps> = ({ isVisible, onClose, sprintList, group }) => {
    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Feedback history</div>
                        <button onClick={() => {
                            onClose();
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 max-h-96 overflow-auto whitespace-pre-wrap">
                        {sprintList!.map((sprintItem) => (
                            <div className="text-sm">
                                <div className="flex gap-1.5 items-center">
                                    <div className="text-sm font-bold">{sprintItem.name}</div>
                                    {
                                        new Date(sprintItem.endDate) > new Date() ?
                                            <StatusBox color="green" message="On-going" /> :
                                            <StatusBox color="gray" message="Finished" />
                                    }
                                </div>
                                <div className="text-gray-600">{
                                    group?.feedbackList.find(fb => fb.sprint.id === sprintItem.id)?.feedback ?? "No feedback is available yet."
                                }</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalSprintHistory;