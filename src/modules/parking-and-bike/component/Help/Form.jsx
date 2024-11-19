import { useState } from 'react';

function Form() {
    const [name, setName] = useState('');
    const [license, setLicense] = useState('');
    const [errors, setErrors] = useState({ name: '', license: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { name: '', license: '' };

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!license.trim()) {
            newErrors.license = 'License is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            console.log("Form submitted", { name, license });
            // Proceed with form submission
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center w-max-24">
                <h1 className="text-red-500 font-bold text-3xl">Registration</h1>
                <br />
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your Name and Surname"
                        className="max-w-56 text-sm p-2 border border-gray-300 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

                    <input
                        type="text"
                        placeholder="Enter your Car License"
                        className="max-w-56 text-sm p-2 border border-gray-300 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                    />
                    {errors.license && <span className="text-red-500 text-sm">{errors.license}</span>}

                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default Form;
