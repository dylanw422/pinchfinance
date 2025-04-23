"use client";
import { useEffect, useState } from "react";
import { AvatarCircles } from "../magicui/avatar-circles";
import axios from "axios";
import { useUserCount } from "@/queries/user-count";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
  },
];

export default function ClientSection() {
  const { data: userCount } = useUserCount();

  return (
    <section id="clients" className="text-center mx-auto max-w-[80rem] px-6 md:px-8">
      <div className="py-14">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-center text-sm font-semibold">
            JOIN {userCount} OTHER USERS ON OUR WAITLIST
          </h2>
          <div className="mt-6 w-full flex justify-center">
            <AvatarCircles numPeople={userCount - 6} avatarUrls={avatars.slice(0, userCount)} />
          </div>
        </div>
      </div>
    </section>
  );
}
