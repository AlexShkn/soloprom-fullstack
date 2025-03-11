-- CreateTable
CREATE TABLE "PagesSearch" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PagesSearch_pkey" PRIMARY KEY ("id")
);
