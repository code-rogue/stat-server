import { DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { timestampColumn } from './model.helpers';

import { PlayerWeeklyStats }  from './nfl.player.stats.model';

export const WeeklyNextGenStatsPass = sequelize.define(
  'WeeklyNextGenStatsPass',
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    player_weekly_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlayerWeeklyStats,
            key: 'id',
        },
    },
    aggressiveness: {
        type: DataTypes.FLOAT,
    },
    avg_time_to_throw: {
        type: DataTypes.FLOAT,
    },
    avg_air_distance: {
        type: DataTypes.FLOAT,
    },
    max_air_distance: {
        type: DataTypes.FLOAT,
    },
    avg_completed_air_yards: {
        type: DataTypes.FLOAT,
    },
    avg_intended_air_yards: {
        type: DataTypes.FLOAT,
    },
    avg_air_yards_differential: {
        type: DataTypes.FLOAT,
    },
    avg_air_yards_to_sticks: {
        type: DataTypes.FLOAT,
    },
    max_completed_air_distance: {
        type: DataTypes.FLOAT,
    },
    passer_rating: {
        type: DataTypes.FLOAT,
    },
    completion_pct: {
        type: DataTypes.FLOAT,
    },
    expected_completion_pct: {
        type: DataTypes.FLOAT,
    },
    completions_above_expectation_pct: {
        type: DataTypes.FLOAT,
    },
    created_date: timestampColumn(sequelize),
    last_modified: timestampColumn(sequelize),
  },
  {
    schema: 'nfl',
    tableName: 'weekly_nextgen_stats_pass',
    timestamps: false,
  }
);

export const WeeklyNextGenStatsRush = sequelize.define(
    'WeeklyNextGenStatsRush',
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      player_weekly_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: PlayerWeeklyStats,
              key: 'id',
          },
      },
      efficiency: {
          type: DataTypes.FLOAT,
      },
      attempts_gte_eight_defenders_pct: {
          type: DataTypes.FLOAT,
      },
      avg_time_to_los: {
          type: DataTypes.FLOAT,
      },
      expected_yards: {
          type: DataTypes.FLOAT,
      },
      yards_over_expected: {
          type: DataTypes.FLOAT,
      },
      avg_yards: {
          type: DataTypes.FLOAT,
      },
      yards_over_expected_per_att: {
          type: DataTypes.FLOAT,
      },
      yards_over_expected_pct: {
          type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_nextgen_stats_rush',
      timestamps: false,
    }
  );

  export const WeeklyNextGenStatsRec = sequelize.define(
    'WeeklyNextGenStatsRec',
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      player_weekly_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: PlayerWeeklyStats,
              key: 'id',
          },
      },
      avg_cushion: {
          type: DataTypes.FLOAT,
      },
      avg_separation: {
          type: DataTypes.FLOAT,
      },
      avg_intended_air_yards: {
          type: DataTypes.FLOAT,
      },
      catch_pct: {
        type: DataTypes.FLOAT,
      },
      share_of_intended_air_yards_pct: {
          type: DataTypes.FLOAT,
      },
      avg_yac: {
          type: DataTypes.FLOAT,
      },
      avg_expected_yac: {
          type: DataTypes.FLOAT,
      },
      avg_yac_above_expectation: {
          type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_nextgen_stats_rec',
      timestamps: false,
    }
  );