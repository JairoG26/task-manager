const { ZodError } = require('zod');

/**
 * validate(schema, where)
 * where: 'body' | 'query' | 'params'
 */

function validate(schema, where = 'body') {
  return (req, res, next) => {
    try {
      const payload = where === 'body' ? req.body : where === 'query' ? req.query : req.params;
      const parsed = schema.parse(payload);
      
      if (where === 'body') req.body = parsed;
      else if (where === 'query') req.query = parsed;
      else req.params = parsed;
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }));
        return res.status(400).json({ error: 'Validation error', details });
      }
      return res.status(500).json({ error: 'Internal validation error' });
    }
  };
}

module.exports = validate;
