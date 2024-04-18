import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/bio.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { NFLSchema, BioModelLabel as ModelLabel, BioTable as Table } from '@constants/nfl/service.constants';

describe('Play Bio Schema', () => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'test',
        password: 'testMe',
        database: 'Postgres',
        port: 255,
    });

    const model: Model = null;
    const modelSchema = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model,
                key: 'id',
            },
        },
        birth_date: {
            type: DataTypes.DATEONLY,
        },
        college: {
            type: DataTypes.STRING(64),
        },
        college_conference: {
            type: DataTypes.STRING(64),
        },
        height: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        headshot_url: {
            type: DataTypes.STRING(512),
        },
        created_date: '',
        last_modified: '',
    };

    describe('bioModelOptions', () => {
        it('should return schema model options', () => {
            expect(schema.bioModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.bioSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});