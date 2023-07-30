const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

async function consultarVentasPorFecha(fechaInicio) {
  try {
    const ventasConDetalles = await prisma.seller.findMany({
      include: {
        sales: {
          include: {
            customers: true,
            salesDetails: {
              include: {
                products: true,
                branchOffice: true,
              },
            },
          },
        },
      },
      where: {
        sales: {
          some: {
            salesDetails: {
              some: {
                branchOffice: {
                  // Utiliza startsWith para verificar el inicio del campo 'fecha' en la tabla BranchOffice
                  fecha: {
                    startsWith: fechaInicio,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log(ventasConDetalles);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejemplo de uso
const fechaInicio = '2023-07-03';
consultarVentasPorFecha(fechaInicio);