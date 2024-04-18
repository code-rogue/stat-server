import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/player.schema';
import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, PlayerModelLabel as ModelLabel, PlayerTable as Table } from '@constants/nfl/service.constants';

describe('Play League Schema', () => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'test',
        password: 'testMe',
        database: 'Postgres',
        port: 255,
    });

    const modelSchema = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        career_status: {
            type: DataTypes.STRING(128),
        },
        game_status_abbr: {
            type: DataTypes.STRING(128),
        },
        game_status: {
            type: DataTypes.STRING(128),
        },
        esb_id: {
            type: DataTypes.STRING(128),
        },
        gsis_id: {
            type: DataTypes.STRING(128),
        },
        gsis_it_id: {
            type: DataTypes.STRING(128),
        },
        smart_id: {
            type: DataTypes.STRING(128),
        },
        pfr_id: {
            type: DataTypes.STRING(128),
        },
        full_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        short_name: {
            type: DataTypes.STRING(128),
        },
        suffix: {
            type: DataTypes.STRING(128),
        },
        created_date: '',
        last_modified: '',
    };

    describe('bioModelOptions', () => {
        it('should return schema model options', () => {
            expect(schema.playerModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.playerSchema()).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});