import DashedButton from "../../atoms/dashed-button";
import FeatureBoardItemBox from "../../atoms/feature-board-item-box";
import TaskBoardItemBox from "../../atoms/task-board-item-box";

const StudentFeatureTask = () => {
    return (
        <div className="flex gap-5">
            <div className="w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                <div className="text-xs flex justify-between text-gray-600">
                    <div>Feature board</div>
                    <div>2</div>
                </div>
                <FeatureBoardItemBox
                    totalTask={10}
                    doneTask={6}
                    title="Login module for example"
                    startDate={new Date()}
                    endDate={new Date()} />

                <FeatureBoardItemBox
                    totalTask={10}
                    doneTask={2}
                    title="Login module for example"
                    startDate={new Date()}
                    endDate={new Date()} />

                <FeatureBoardItemBox
                    totalTask={10}
                    doneTask={4}
                    title="Login module for example"
                    startDate={new Date()}
                    endDate={new Date()} />

                <DashedButton
                    icon="add"
                    message="Create new feature" />
            </div>

            <div className="w-2/3 bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex flex-col gap-2 h-fit">
                <div className="text-xs flex justify-between text-gray-600">
                    <div>Tasks board</div>
                    <div>2</div>
                </div>

                <TaskBoardItemBox
                    picture=""
                    status="High"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />

                <TaskBoardItemBox
                    picture=""
                    status="Low"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />

                <TaskBoardItemBox
                    picture=""
                    status="Medium"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />

                <TaskBoardItemBox
                    picture=""
                    status="Medium"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />

                <TaskBoardItemBox
                    picture=""
                    status="Low"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />

                <DashedButton
                    icon="add"
                    message="Create new task" />
            </div>
        </div>
    )
}

export default StudentFeatureTask;