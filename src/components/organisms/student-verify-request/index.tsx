import { useEffect, useState } from "react";
import api from "../../../config/axios";
import NormalButton from "../../atoms/normal-button";
import ModalVerifyTask from "../../molecules/modal-verify-task";
import StatusBox from "../../atoms/status-box";
import LeaderRoute from "../../../utils/leader-route";
import NullTableCell from "../../atoms/null-table-cell";

type Feature = {
    id: string,
    name: string,
    description: string,
    status: boolean,
    startDate: Date,
    endDate: Date
    taskList: Tasks[]
}

type Tasks = {
    id: string,
    name: string,
    status: string,
    feedback: string,
    priority: string,
    description: string,
    createDate: Date,
    finishDate: Date,
    taskIndex: number,
    feature: Feature,
    student: Student
}

type Student = {
    RollNumber: string;
    FullName: string;
    picture: string;
}

const StudentVerifyRequest = () => {
    const [taskList, setTaskList] = useState<Tasks[]>([]);
    const [featureList, setFeatureList] = useState<Feature[]>([]);
    const [showVerifyTaskModal, setShowVerifyTaskModal] = useState(false);
    const [tempFeature, setTempFeature] = useState<Feature | undefined>();
    const [tempTask, setTempTask] = useState<Tasks | undefined>();

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const studentId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const featureData = await api.get(`/api/v1/common/view-features?userId=${studentId}&role=STUDENT`);
                const taskData = await api.get(`/api/v1/common/view-all-task-of-group?userId=${studentId}&role=STUDENT`);
                setFeatureList(JSON.parse(JSON.stringify(featureData.data)));

                const sortedTaskList = JSON.parse(JSON.stringify(taskData.data)).sort((a: Tasks, b: Tasks) => {
                    const featureNameA = featureList.find(feature =>
                        feature.taskList.some(task => task.id === a.id))?.name ?? "No feature";

                    const featureNameB = featureList.find(feature =>
                        feature.taskList.some(task => task.id === b.id))?.name ?? "No feature";

                    return featureNameA.localeCompare(featureNameB);
                });

                setTaskList(sortedTaskList);
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="w-full flex flex-col gap-2 h-fit">
            <div className="border border-gray-200 rounded-lg text-sm overflow-auto">
                <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                    <div className="w-10">
                        #
                    </div>

                    <div className="w-96">
                        Task name
                    </div>

                    <div className="w-96">
                        Feature
                    </div>

                    <div className="w-36">
                        Priority
                    </div>

                    <div className="w-56">
                        Assign to
                    </div>
                </div>
                {taskList.filter(task => task.status === "Verifying").length != 0 ?
                    <div className="divide-y">
                        {taskList.filter(task => task.status === "Verifying").map((taskItem, index) => (
                            <div key={index} className="p-5 flex gap-x-5">
                                <div className="w-10 my-1.5">
                                    {index + 1}
                                </div>

                                <div className="w-96 my-1.5">
                                    {taskItem.name}
                                </div>

                                <div className="w-96 my-1.5">
                                    {featureList.find(feature => feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                </div>

                                <div className="w-36 my-2">
                                    <StatusBox color={taskItem.priority === "High" ? "red" : taskItem.priority === "Medium" ? "yellow" : "green"} message={taskItem.priority} />
                                </div>

                                <div className="h-fit mr-auto flex items-center gap-1.5">
                                    <img className="w-8 h-8 rounded-full" src={taskItem.student.picture}></img>
                                    <div>{taskItem.student.FullName}</div>
                                </div>

                                <LeaderRoute>
                                    <button className="h-fit" onClick={() => {
                                        setShowVerifyTaskModal(true);
                                        setTempTask(taskItem);
                                        setTempFeature(featureList.find(feature =>
                                            feature.taskList.some(task => task.id === taskItem.id)));
                                    }}>
                                        <NormalButton icon="" message="Review" />
                                    </button>
                                </LeaderRoute>
                            </div>
                        ))}
                    </div> :
                    <NullTableCell />}
            </div>

            <ModalVerifyTask
                isVisible={showVerifyTaskModal}
                onClose={() => setShowVerifyTaskModal(false)}
                task={tempTask}
                feature={tempFeature} />
        </div>
    )
}

export default StudentVerifyRequest;