import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShowtimesTable1768414964081 implements MigrationInterface {
    name = 'AddShowtimesTable1768414964081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "showtimes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "startTime" TIMESTAMP WITH TIME ZONE NOT NULL, "endTime" TIMESTAMP WITH TIME ZONE NOT NULL, "totalSeats" integer NOT NULL, "availableSeats" integer NOT NULL, "movieId" uuid, CONSTRAINT "PK_2d979092e692ec1a7b505893ee2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "showtimes" ADD CONSTRAINT "FK_ebc9c31bc3ceabbf19ce4f1bd4e" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "showtimes" DROP CONSTRAINT "FK_ebc9c31bc3ceabbf19ce4f1bd4e"`);
        await queryRunner.query(`DROP TABLE "showtimes"`);
    }

}
