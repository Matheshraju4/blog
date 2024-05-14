"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Topcontents from "@/src/Topcontents";

import { Header } from "@/src/header";
import Newscard from "@/src/newscard";
import { useEffect, useState } from "react";
import { createfulldata, fetchtitledescription } from "./api/db";
interface ContentProps {
  Title: string;
  Summary: string;
  imageurl: string;
}
export default function Home() {
  const [contentArray, setcontentArray1] = useState<ContentProps[]>([]);
  useEffect(() => {
    const db = async () => {
      const response = await fetchtitledescription();

      setcontentArray1(response);
      console.log("data", response);
    };

    db();
  }, []);
  console.log(
    "Contentarray",
    contentArray.length > 0 ? contentArray[0] : "No data yet"
  );

  return (
    <>
      {contentArray.length > 0 ? (
        <>
          <Card className="justify-center white p-0 m-1 sm:m-3 ">
            <CardHeader className="text-2xl p-4">Learn Law</CardHeader>
          </Card>
          <div className="sm:m-10 sm:grid sm:grid-cols-4 place-content-center gap-4 sm:h-2/6 sm:p-4 grid-cols-1">
            <Header content={contentArray[0]} />
            <Topcontents contents={contentArray} />
          </div>
          <CardHeader className="text-center text-2xl font-bold pb-0 mb-0">
            New Contents
          </CardHeader>
          <Newscard contents={contentArray} />
        </>
      ) : (
        <Card className="justify-center white p-0 m-1 sm:m-3 ">
          <CardHeader className="text-2xl p-4">Learn Law</CardHeader>
        </Card>
      )}
    </>
  );
}
