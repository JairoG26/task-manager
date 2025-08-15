const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  create: (data) => prisma.task.create({ data }),
  findMany: (options) => prisma.task.findMany(options),
  count: (where) => prisma.task.count({ where }),
  findById: (id) => prisma.task.findUnique({ where: { id: id } }),
  update: (id, data) => prisma.task.update({ where: { id: id }, data }),
  delete: (id) => prisma.task.delete({ where: { id: id } }),
};