import React, { useState } from "react";

export default function AddComment() {
  const [comment, setComment] = useState("");

  const handlePost = () => {
    if (comment.trim()) {
      alert("Comment Posted: " + comment);
      setComment("");
    }
  };

  return (
    <div className="w-full h-[500px] p-6 md:p-10 bg-[#202216]  border border-[#f2de9b] rounded-lg shadow-lg flex flex-col justify-between relative">
      {/* Background Image */}
      <img
        src="/comment.png" // Replace with your image path
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
      />

      {/* Content */}
      <div className="relative flex flex-col items-end gap-4">
        {/* Input Field - Textarea */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full h-[200px] md:w-[500px] md:h-[300px] px-4 py-2 bg-[#2c2f23] opacity-30 hover:opacity-100 transition-all duration-500 border-2 border-[#f2de9b] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f2de9b] text-sm resize-none"
        ></textarea>

        {/* Post Button */}
        <button
          onClick={handlePost}
          className="w-full md:w-[150px] px-6 py-3 bg-[#f2de9b] text-black font-bold rounded-lg hover:bg-[#b1a06e] transition text-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
}
