import { type RequestHandler, Router } from 'express';
import fs from 'fs';

const router = Router();

fs.readdirSync(__dirname).forEach(file => {
  if (!file.startsWith('index')) {
    const endpoint = `/${file.split('.')[0]}`;
    import(`./${file}`)
      .then(res => {
        const route: RequestHandler = res.default;
        router.use(endpoint, route);
      })
      .catch(error => {
        router.use('/', (req, res) => {
          res.status(500).json({ error: error.message });
        });
      });
  }
});

export default router;
