"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    const ageNum = parseInt(formData.age);
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email.";
    }
    if (!formData.age || isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      errs.age = "Age must be 10–100.";
    }
    if (!formData.gender) errs.gender = "Please select a gender.";

    setErrors(errs);
    if (Object.keys(errs).length) toast.error("Please fix the errors.");
    return !Object.keys(errs).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success("Form submitted!");
    const params = new URLSearchParams(formData as any).toString();
    setTimeout(() => router.push(`/success?${params}`), 1200);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", age: "", gender: "", comments: "" });
    setErrors({});
    toast.info("Form reset.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-200 space-y-6"
      >
        <h1 className="text-3xl font-bold text-indigo-700 text-center">Feedback Form</h1>

        {/** FIELD HELPER **/}
        {[
          { label: "Full Name", name: "fullName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Age", name: "age", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              name={name}
              type={type}
              value={(formData as any)[name]}
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

        {/** GENDER **/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
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
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
          )}
        </div>

        {/** COMMENTS **/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
            className="block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/** BUTTONS **/}
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
