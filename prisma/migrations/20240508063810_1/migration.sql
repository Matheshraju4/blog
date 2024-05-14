-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "actualcontent" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableofContent" (
    "postcon" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "contentarray" TEXT[],

    CONSTRAINT "TableofContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_postId_key" ON "Post"("postId");

-- AddForeignKey
ALTER TABLE "TableofContent" ADD CONSTRAINT "TableofContent_postcon_fkey" FOREIGN KEY ("postcon") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
