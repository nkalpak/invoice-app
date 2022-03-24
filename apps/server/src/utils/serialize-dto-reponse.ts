import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

export function serializeDtoResponse<TInst, TClass>(
  instance: TInst,
  cls: ClassConstructor<TClass>,
) {
  return plainToInstance(cls, instanceToPlain(instance), {
    excludeExtraneousValues: true,
  });
}
