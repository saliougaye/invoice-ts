-- CreateTable
CREATE TABLE "Invoicer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "iva" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Invoicer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "iva" TEXT NOT NULL,
    "invoicerId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_invoicerId_fkey" FOREIGN KEY ("invoicerId") REFERENCES "Invoicer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
