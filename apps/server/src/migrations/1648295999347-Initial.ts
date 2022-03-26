import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1648295999347 implements MigrationInterface {
  name = 'Initial1648295999347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "city" character varying NOT NULL, "postCode" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice_client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_c2dcbb1f285e8b596858aceb923" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "priceCents" integer NOT NULL, "invoiceId" uuid NOT NULL, CONSTRAINT "PK_621317346abdf61295516f3cb76" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "invoiceDate" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "paymentTerms" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'draft', "clientName" character varying NOT NULL, "clientEmail" character varying NOT NULL, "clientStreet" character varying NOT NULL, "clientCity" character varying NOT NULL, "clientPostCode" character varying NOT NULL, "clientCountry" character varying NOT NULL, "senderStreet" character varying NOT NULL, "senderCity" character varying NOT NULL, "senderPostCode" character varying NOT NULL, "senderCountry" character varying NOT NULL, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice_item" ADD CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice_item" DROP CONSTRAINT "FK_553d5aac210d22fdca5c8d48ead"`,
    );
    await queryRunner.query(`DROP TABLE "invoice"`);
    await queryRunner.query(`DROP TABLE "invoice_item"`);
    await queryRunner.query(`DROP TABLE "invoice_client"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
