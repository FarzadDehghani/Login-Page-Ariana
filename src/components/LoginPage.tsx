import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFormData } from "../redux/slices/formSlice";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@nextui-org/react";

const LoginPage = () => {
    const [form, setForm] = useState({
        name: "",
        family: "",
        birthday: "",
        options: [] as string[],
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Check if any field is empty
        if (!form.name || !form.family || !form.birthday || form.options.length === 0) {
            alert("Please fill in all the fields.");
            return;
            // Stop submission if validation fails
        }

        // If all fields are filled, dispatch the form data and navigate
        dispatch(addFormData(form));
        navigate("/table");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="bg-white p-6 shadow rounded w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-4 p-2 border rounded-full"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Family"
                    className="w-full mb-4 p-2 border rounded-full"
                    onChange={(e) => setForm({ ...form, family: e.target.value })}
                />

                <DatePicker
                    label="Birth date"
                    className="max-w-[284px] mb-4 bg-white border rounded-full"
                    onChange={(value) => {
                        // Ensure value is a valid date
                        const date = value instanceof Date ? value : new Date(value);
                        setForm({ ...form, birthday: date.toLocaleDateString() });
                    }}
                />

                <select
                    className="w-full mb-4 p-2 border rounded-full"
                    value={form.options}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            options: Array.from(e.target.selectedOptions, (option) => option.value),
                        })
                    }
                >
                    <option value="" disabled>Choose a Skill</option>
                    <option value="html">html</option>
                    <option value="css">css</option>
                    <option value="js">js</option>
                </select>

                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full w-full hover:bg-blue-600"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
