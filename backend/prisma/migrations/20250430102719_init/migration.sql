/*
  Warnings:

  - Added the required column `contractType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('PERMANENT', 'CONTRACT', 'LOCUM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contractType" "ContractType" NOT NULL;
