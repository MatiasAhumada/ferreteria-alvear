import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  "Electricidad",
  "PVC",
  "Herramientas de mano",
  "Artículos varios",
  "Maquinaria",
  "Construcción",
  "Bulonería",
  "Plomería",
  "Pinturería",
];

async function main() {
  for (const categoryName of CATEGORIES) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
  }

  console.log("Categorías creadas exitosamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
