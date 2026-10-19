import { createPrismaClient } from "../src/index";

const prisma = createPrismaClient();

async function main(): Promise<void> {
  const existingClass = await prisma.class.findFirst({
    where: { name: "Hifz", section: "A", year: new Date().getFullYear() },
  });

  const classRecord =
    existingClass ??
    (await prisma.class.create({
      data: {
        name: "Hifz",
        section: "A",
        year: new Date().getFullYear(),
      },
    }));

  await prisma.user.upsert({
    where: { email: "admin@mms.local" },
    update: {},
    create: {
      email: "admin@mms.local",
      passwordHash: "change-me-in-production",
      role: "ADMIN",
      firstName: "System",
      lastName: "Admin",
    },
  });

  const studentCount = await prisma.student.count({ where: { classId: classRecord.id } });
  if (studentCount === 0) {
    await prisma.student.create({
      data: {
        firstName: "Sample",
        lastName: "Student",
        dateOfBirth: new Date("2010-05-15"),
        gender: "MALE",
        guardianName: "Guardian Name",
        guardianPhone: "+8801000000000",
        classId: classRecord.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
