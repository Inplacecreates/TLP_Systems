/*
  Warnings:

  - You are about to drop the column `decision` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Approval` table. All the data in the column will be lost.
  - The `status` column on the `Incident` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `duration` on the `LocumShift` table. All the data in the column will be lost.
  - You are about to drop the column `shiftDate` on the `LocumShift` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `OperationRequest` table. All the data in the column will be lost.
  - The `status` column on the `OperationRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Approval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Leave` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `LocumShift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `LocumShift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `LocumShift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `OperationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EMPLOYEE', 'FINANCE', 'HR', 'SUPERVISOR');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'COMPLETED';
ALTER TYPE "Status" ADD VALUE 'CANCELLED';

-- DropForeignKey
ALTER TABLE "Approval" DROP CONSTRAINT "Approval_leaveId_fkey";

-- AlterTable
ALTER TABLE "Approval" DROP COLUMN "decision",
DROP COLUMN "notes",
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "incidentId" TEXT,
ADD COLUMN     "locumShiftId" TEXT,
ADD COLUMN     "operationId" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "leaveId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "severity" "Severity" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "type" "LeaveType" NOT NULL;

-- AlterTable
ALTER TABLE "LocumShift" DROP COLUMN "duration",
DROP COLUMN "shiftDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "OperationRequest" DROP COLUMN "details",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EMPLOYEE';

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "locumShiftId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_locumShiftId_key" ON "Invoice"("locumShiftId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_locumShiftId_fkey" FOREIGN KEY ("locumShiftId") REFERENCES "LocumShift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_leaveId_fkey" FOREIGN KEY ("leaveId") REFERENCES "Leave"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_locumShiftId_fkey" FOREIGN KEY ("locumShiftId") REFERENCES "LocumShift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "OperationRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
