import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1649314801194 implements MigrationInterface {
  name = 'AddUserTable1649314801194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "invoice" ADD "userId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_f8e849201da83b87f78c7497dde" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_f8e849201da83b87f78c7497dde"`,
    );
    await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "userId"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
