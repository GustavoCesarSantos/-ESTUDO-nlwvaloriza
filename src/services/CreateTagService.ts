import { getCustomRepository } from 'typeorm';
import { TagRepositories } from '../repositories/TagsRepositories';

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const tagRepositories = getCustomRepository(TagRepositories);

    if (!name) throw new Error('Not passed name');

    const tagAlreadyExists = await tagRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) throw new Error('Tag already exists');

    const tag = tagRepositories.create({
      name,
    });

    tagRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
