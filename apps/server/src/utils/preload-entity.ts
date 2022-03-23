import { DeepPartial, Repository } from 'typeorm';

export async function preloadEntity<T>(
  entity: DeepPartial<T>,
  repository: Repository<T>,
) {
  const entityStored = await repository.findOne(entity);
  if (entityStored != undefined) {
    return entityStored;
  }
  return repository.create(entity);
}
