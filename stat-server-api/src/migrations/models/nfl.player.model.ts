import { DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { timestampColumn } from './model.helpers';

export const Player = sequelize.define(
  'Player',
  {
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
    created_date: timestampColumn(sequelize),
    last_modified: timestampColumn(sequelize),
  },
  {
    schema: 'nfl',
    tableName: 'players',
    timestamps: false,
  }
);

export const PlayerBio = sequelize.define(
    'PlayerBio',
    {
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
                model: Player,
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
        created_date: timestampColumn(sequelize),
        last_modified: timestampColumn(sequelize),
    },
    {
        schema: 'nfl',
        tableName: 'player_bio',
        timestamps: false,
    }
  );

  export const PlayerLeagueData = sequelize.define(
    'PlayerLeagueData',
    {
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
                model: Player,
                key: 'id',
            },
        },
        position_group: {
            type: DataTypes.STRING(16),
        },
        position: {
            type: DataTypes.STRING(16),
        },
        jersey_number: {
            type: DataTypes.INTEGER,
        },
        years_of_experience: {
            type: DataTypes.INTEGER,
        },
        team: {
            type: DataTypes.STRING(8),
        },
        team_seq: {
            type: DataTypes.STRING(8),
        },
        team_id: {
            type: DataTypes.STRING(8),
        },
        rookie_year: {
            type: DataTypes.STRING(4),
        },
        draft_team: {
            type: DataTypes.STRING(8),
        },
        draft_number: {
            type: DataTypes.STRING(4),
        },
        draft_round: {
            type: DataTypes.STRING(4),
        },
        season: {
            type: DataTypes.STRING(4),
        },
        created_date: timestampColumn(sequelize),
        last_modified: timestampColumn(sequelize),
    },
    {
        schema: 'nfl',
        tableName: 'player_league',
        timestamps: false,
    }
  );