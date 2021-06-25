/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import { CreateTagService } from '../services/CreateTagService';

class CreateTagController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute({ name });

    return res.status(201).json(tag);
  }
}

export { CreateTagController };
