// POST /tasks
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 */
router.post('/tasks', validate(CreateTaskSchema, 'body'), createTask);

// GET /tasks
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get a list of tasks
 *     tags: [Tasks]
 */
router.get('/tasks', validate(GetTasksQuerySchema, 'query'), getTasks);

// GET /tasks/:id
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 */
router.get('/tasks/:id', validate(IdParamSchema, 'params'), getTaskById);

// PUT /tasks/:id
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 */
router.put('/tasks/:id', validate(IdParamSchema, 'params'), validate(UpdateTaskSchema, 'body'), updateTask);

// DELETE /tasks/:id
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 */
router.delete('/tasks/:id', validate(IdParamSchema, 'params'), deleteTask);
