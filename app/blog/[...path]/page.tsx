"use client";
import { fetchpost } from "@/app/api/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Blog({ params }: any) {
  const [post, setPost] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchpost(params.path);
      setPost(res);
    };
    fetchData();
  }, []);

  return (
    <>
      {post ? (
        <>
          <div className="sm:m-10 grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="bg-gray-100 px-4 py-3 text-gray-800 break-words max-w-md rounded sm:col-span-1">
              <div className="mx-auto text-xl font-semibold">
                <strong>Table of Content</strong>
              </div>
              <ul className="mt-2 list-disc px-2 pl-6">
                {post.tableofContent.map((content: string, index: number) => (
                  <li key={index}>
                    <a
                      className="block hover:bg-gray-200 px-2 py-1 rounded"
                      href={`#${content}`}
                    >
                      {content}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-4">
              <Card className="justify-center p-2 m-1 sm:mr-20">
                <CardHeader>
                  <CardTitle className="text-center font-roboto font-bold text-2xl">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <img
                  src={post.imageurl}
                  alt="image description"
                  className="w-full h-auto max-w-lg mx-auto my-4 rounded-xl"
                />
                <CardContent className="text-center font-roboto text-lg">
                  <div
                    dangerouslySetInnerHTML={{ __html: post.actualcontent }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>Loading..</>
      )}
    </>
  );
}
