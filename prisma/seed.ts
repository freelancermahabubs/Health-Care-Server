// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   try {
//     // Delete all entries for each model

//     await prisma.prescription.deleteMany();
//     await prisma.review.deleteMany();
//     await prisma.payment.deleteMany();
//     await prisma.appointment.deleteMany();
//     await prisma.doctorSchedule.deleteMany();
//     await prisma.schedule.deleteMany();
//     console.log('All data deleted successfully.');
//   } catch (error) {
//     console.error('Error deleting data:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main().catch(error => {
//   console.error('Error in main:', error);
//   process.exit(1);
// });


import {UserRole} from "@prisma/client";
import prisma from "../src/shared/prisma";
import * as bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("superadmin", 12);

    const superAdminData = await prisma.user.create({
      data: {
        email: "super@admin.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
            //email: "super@admin.com",
            contactNumber: "01234567890",
          },
        },
      },
    });

    console.log("Super Admin Created Successfully!", superAdminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin().catch(error => {
  console.error('Error in SuperAdmin:', error);
  process.exit(1);
});;
