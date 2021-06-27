import { Request, Response } from 'express';
import { ListComplimentsService } from '../services/ListComplimentsService';

class ListComplimentsController {
  async handle(req: Request, res: Response) {
    const listComplimentsService = new ListComplimentsService();

    const compliments = await listComplimentsService.execute();

    return res.status(200).json(compliments);
  }
}

export { ListComplimentsController };
