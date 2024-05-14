"use client";
import { fetchpost } from "@/app/api/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { parse } from "node-html-parser";

export default function Blog({ params }: any) {
  const [post, setPost] = useState<ContentProps>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchpost(params.path);
      if (res) {
        // Modify actualcontent to include href links for table of content
        let modifiedContent = parse(res.actualcontent);
        res.tableofContent.forEach((toc) => {
          const id = toc.toLowerCase().replace(/\s+/g, "-");

          const headingElement = modifiedContent.querySelector(
            `h1:contains("${toc}")`
          );
          if (headingElement) {
            const anchor = `<a id="${id}" class="text-black font-bold text-2xl">${toc}</a>`;

            headingElement.replaceWith(anchor);
          }
        });
        res.actualcontent = modifiedContent.toString();
      }
      setPost(res);
    };
    fetchData();
  }, [params.path]);

  useEffect(() => {
    if (post) {
      const actualcontent = post.actualcontent.toLowerCase();
      const tableofContent = post.tableofContent;
      console.log(actualcontent.match(tableofContent[0].toLowerCase()));
      console.log(
        actualcontent.toLowerCase().includes(tableofContent[0].toLowerCase())
      ); // Will now log the correct value
    }
  }, [post]);

  return (
    <>
      {post ? (
        <>
          <div className="sm:m-10 grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="bg-gray-50 px-4 py-3 text-gray-800 break-words max-w-md rounded sm:col-span-1">
              <div className="mx-auto text-xl font-semibold">
                <strong>Table of Content</strong>
              </div>
              <ul className="mt-2 list-disc px-2 pl-6">
                {post.tableofContent.map((content: string, index: number) => (
                  <li key={index}>
                    <a
                      className="block hover:bg-gray-200 px-2 py-1 rounded"
                      href={`#${content.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {content}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-4">
              <Card className="justify-center p-2 m-1 bg-blue-50 sm:mr-20">
                <CardHeader>
                  <CardTitle className="text-center font-roboto font-bold text-4xl">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <img
                  src={post.imageurl}
                  alt="image description"
                  className="w-full h-auto max-w-lg mx-auto my-4 rounded-xl"
                />
                <CardContent className="text-center font-roboto text-md ">
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

interface ContentProps {
  id: number;
  title: string;
  description: string;
  actualcontent: string;
  imageurl: string;
  date: string;
  likes: number;
  tableofContent: string[];
}
