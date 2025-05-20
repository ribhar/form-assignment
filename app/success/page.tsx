"use client";

import { useSearchParams } from "next/navigation";
import { useRouter }       from "next/navigation";
import { useEffect }       from "react";
import { toast }           from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // show toast when page loads
  useEffect(() => {
    toast.success("Form submitted successfully!");
  }, []);

  const fullName = searchParams.get("fullName");
  const email    = searchParams.get("email");
  const age      = searchParams.get("age");
  const gender   = searchParams.get("gender");
  const comments = searchParams.get("comments");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-200 space-y-6">
        <h1 className="text-3xl font-bold text-green-600 text-center">
          Submission Successful 🎉
        </h1>

        <div className="bg-gray-100 p-6 rounded-xl space-y-3">
          <p>
            <span className="font-medium">Full Name:</span> {fullName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {email}
          </p>
          <p>
            <span className="font-medium">Age:</span> {age}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {gender}
          </p>
          <p>
            <span className="font-medium">Comments:</span> {comments || "N/A"}
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
        >
          Submit Another Response
        </button>
      </div>
    </main>
  );
}
