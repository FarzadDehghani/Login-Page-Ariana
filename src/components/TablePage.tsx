import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteFormData, updateFormData } from "../redux/slices/formSlice";

const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const TablePage = () => {
    const formData = useSelector((state: RootState) => state.form.data);
    const dispatch = useDispatch();

    const handleDelete = (index: number) => {
        dispatch(deleteFormData(index));
    };

    const handleEdit = (index: number) => {
        const updatedName = prompt("Enter new name:", formData[index].name);
        const updatedFamily = prompt("Enter new family:", formData[index].family);
        const updatedBirthday = prompt("Enter new birthday (yyyy-mm-dd):", formData[index].birthday);
        const updatedOptions = prompt("Enter new options (comma-separated):", formData[index].options.join(","));

        if (updatedName && updatedFamily && updatedBirthday && updatedOptions) {
            const updatedFormData = {
                ...formData[index],
                name: updatedName,
                family: updatedFamily,
                birthday: updatedBirthday,
                options: updatedOptions.split(",").map((option) => option.trim()),
            };
            dispatch(updateFormData({ index, formData: updatedFormData }));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 shadow rounded w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4">Submitted Data</h2>
                {formData.length === 0 ? (
                    <p className="text-gray-500">No data available</p>
                ) : (
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Family</th>
                                <th className="border border-gray-300 px-4 py-2">Birthday</th>
                                <th className="border border-gray-300 px-4 py-2">Options</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.map((entry, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{entry.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{entry.family}</td>
                                    <td className="border border-gray-300 px-4 py-2">{calculateAge(entry.birthday)} years</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {entry.options.join(", ")}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                            onClick={() => handleEdit(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TablePage;
