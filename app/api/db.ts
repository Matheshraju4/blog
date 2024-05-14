"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createfulldata(
  title: string,
  description: string,
  actualcontent: string,
  imageurl: string,
  tableofContent: string[]
) {
  const date = Date.now();
  const response = await prisma.post.create({
    data: {
      title: title,
      description: description,
      actualcontent: actualcontent,
      imageurl: imageurl,
      date: date.toString(),
      likes: 1,
      table: {
        create: {
          contentarray: tableofContent,
        },
      },
    },
  });
  return response;
}

export async function fetchtitledescription() {
  const response = await prisma.post.findMany();
  const tdi = response.map((item) => ({
    Title: item.title,
    Summary: item.description,
    imageurl: item.imageurl,
  }));
  console.log(tdi);
  return tdi;
}
export async function fetchpost(id: string) {
  const response = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      table: true,
    },
  });

  if (response) {
    const {
      id,
      title,
      description,
      actualcontent,
      imageurl,
      date,
      likes,
      table,
    } = response;
    const { contentarray } = table[0];
    const tableofContent = contentarray;
    let blog = {
      id,
      title,
      description,
      actualcontent,
      imageurl,
      date,
      likes,
      tableofContent,
    };
    console.log("blog", blog);
    return blog;
  }
}
