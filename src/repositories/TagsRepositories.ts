import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../database/entities/Tag';

@EntityRepository(Tag)
class TagRepositories extends Repository<Tag> {}

export { TagRepositories };
