import { useEffect, useState } from "react";
import api from "../../../config/axios";
import StatusBox from "../../atoms/status-box";

type Lecturer = {
    RollNumber: string;
    FullName: string;
    picture: string;
    MemberCode: string;
    status: boolean;
}

const AdminLecturerList = () => {
    const [lecturerList, setLecturerList] = useState<Lecturer[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get("/api/v1/admin/view-all-lecturers");
                setLecturerList(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col gap-2 text-sm">
            <div className="border border-gray-200 rounded-lg overflow-auto">
                <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                    <div className="w-10">#</div>
                    <div className="w-56">Roll Number</div>
                    <div className="w-72">Email</div>
                    <div className="w-60">Full Name</div>
                    <div className="w-36">Status</div>
                </div>
                <div className="divide-y">
                    {lecturerList.map((lecturerItem, index) => (
                        <div key={index} className="p-5 flex gap-x-5 items-center">
                            <div className="w-10">{index + 1}</div>
                            <div className="w-56">{lecturerItem.RollNumber}</div>
                            <div className="w-72">{lecturerItem.MemberCode}</div>
                            <div className="w-60 flex gap-1.5">{lecturerItem.FullName}</div>
                            <div className="w-36">
                                <StatusBox color={lecturerItem.status ? "green" : "red"} message={lecturerItem.status ? "On" : "Off"} />
                            </div>

                            {/* <button className="h-fit" onClick={() => {
                                setTempStudent(student);
                                setShowModalEditStudent(true);
                            }}>
                                <NormalButton icon="" message="Edit" />
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminLecturerList;