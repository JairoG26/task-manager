const { z } = require('zod');

const StatusEnum = z.enum(['pendiente', 'en_progreso', 'completada']);

const CreateTaskSchema = z.object({
  title: z.string().min(1, 'title is required').max(100),
  description: z.string().optional(),
  status: StatusEnum.optional().default('pendiente'),
  priority: z.coerce.number().int().min(1).max(3).optional().default(2),
  // acepta string ISO o timestamp; z.coerce.date() convierte a Date
  due_date: z.coerce.date().optional().nullable()
});

const UpdateTaskSchema = CreateTaskSchema.partial().refine(
  data => !!Object.keys(data).length,
  { message: 'At least one field must be provided for update' }
);

// Query params para GET /tasks
const GetTasksQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  status: StatusEnum.optional(),
  priority: z.coerce.number().int().min(1).max(3).optional(),
  search: z.string().optional(),
  sortBy: z.string().optional().default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});

// Param ID -> transforma a BigInt
const IdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'id must be a positive integer').transform(s => BigInt(s))
});

module.exports = {
  CreateTaskSchema,
  UpdateTaskSchema,
  GetTasksQuerySchema,
  IdParamSchema,
  StatusEnum
};