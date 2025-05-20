"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    comments: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const ageNum = parseInt(formData.age, 10);

    if (!formData.fullName.trim()) errs.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email.";
    }
    if (!formData.age || isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      errs.age = "Age must be between 10 and 100.";
    }
    if (!formData.gender) errs.gender = "Please select a gender.";

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please fix the errors.");
    }

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success("Form submitted!");
    const params = new URLSearchParams(formData as Record<string, string>).toString();
    setTimeout(() => router.push(`/success?${params}`), 1200);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", age: "", gender: "", comments: "" });
    setErrors({});
    toast.info("Form reset.");
  };

  const fields: { label: string; name: keyof typeof formData; type: string }[] = [
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Age", name: "age", type: "number" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-200 space-y-6"
        noValidate
      >
        <h1 className="text-3xl font-bold text-indigo-700 text-center">Feedback Form</h1>

        {fields.map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              className={`
                block w-full px-4 py-2 border
                ${errors[name] ? "border-red-400" : "border-gray-300"}
                rounded-xl shadow-sm focus:outline-none focus:ring-2
                focus:ring-indigo-300 focus:border-indigo-500
              `}
            />
            {errors[name] && (
              <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`
              block w-full px-4 py-2 border
              ${errors.gender ? "border-red-400" : "border-gray-300"}
              rounded-xl shadow-sm focus:outline-none focus:ring-2
              focus:ring-indigo-300 focus:border-indigo-500
            `}
          >
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
          )}
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
            className="block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
