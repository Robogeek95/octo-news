import React from "react";

export default function ChatBox({ imageUrl = "./hero_avatar.png" }) {
  return (
    <div className="py-2 px-4 rounded-lg bg-white w-80 h-20 border-2">
      <div className="flex gap-4 h-full items-center">
        <img src={imageUrl} className="h-16" />
        <div className="w-full">
          <div className="w-7/12 h-4 rounded bg-gray-200 mb-2"></div>
          <div className="w-11/12 h-2 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
