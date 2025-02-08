const { PrismaClient } = require("@prisma/client"); // Import the Prisma Client

const prisma = new PrismaClient(); // Create a new instance of the Prisma Client

module.exports = prisma; // Export the Prisma Client instance for use in other parts of your application


