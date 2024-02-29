import { DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { timestampColumn } from './model.helpers';

import { PlayerWeeklyStats }  from './nfl.player.stats.model';
import { Player }  from './nfl.player.model';

export const WeeklyAdvStatsPass = sequelize.define(
  'WeeklyAdvStatsPass',
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
    pass_drops: {
        type: DataTypes.INTEGER,
    },
    pass_drop_pct: {
        type: DataTypes.FLOAT,
    },
    rec_drop: {
        type: DataTypes.INTEGER,
    },
    rec_drop_pct: {
        type: DataTypes.FLOAT,
    },
    bad_throws: {
        type: DataTypes.INTEGER,
    },
    bad_throw_pct: {
        type: DataTypes.FLOAT,
    },
    blitzed: {
        type: DataTypes.INTEGER,
    },
    hurried: {
        type: DataTypes.INTEGER,
    },
    hit: {
        type: DataTypes.INTEGER,
    },
    pressured: {
        type: DataTypes.INTEGER,
    },
    pressured_pct: {
        type: DataTypes.FLOAT,
    },
    created_date: timestampColumn(sequelize),
    last_modified: timestampColumn(sequelize),
  },
  {
    schema: 'nfl',
    tableName: 'weekly_adv_stats_pass',
    timestamps: false,
  }
);

export const WeeklyAdvStatsRush = sequelize.define(
    'WeeklyAdvStatsRush',
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
      yards_before_contact: {
          type: DataTypes.FLOAT,
      },
      yards_before_contact_avg: {
          type: DataTypes.FLOAT,
      },
      yards_after_contact: {
        type: DataTypes.FLOAT,
      },
      yards_after_contact_avg: {
        type: DataTypes.FLOAT,
      },
      broken_tackles: {
          type: DataTypes.INTEGER,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_adv_stats_rush',
      timestamps: false,
    }
  );

  export const WeeklyAdvStatsRec = sequelize.define(
    'WeeklyAdvStatsRec',
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
      broken_tackles: {
        type: DataTypes.INTEGER,
      },
      drops: {
        type: DataTypes.INTEGER,
      },
      drop_pct: {
          type: DataTypes.FLOAT,
      },
      interceptions: {
        type: DataTypes.INTEGER,
      },
      qb_rating: {
        type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_adv_stats_rec',
      timestamps: false,
    }
  );

  export const WeeklyAdvStatsDef = sequelize.define(
    'WeeklyAdvStatsDef',
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
      targets: {
        type: DataTypes.INTEGER,
      },
      completions_allowed: {
        type: DataTypes.INTEGER,
      },
      completion_pct: {
          type: DataTypes.FLOAT,
      },
      yards_allowed: {
        type: DataTypes.FLOAT,
      },
      yards_allowed_per_cmp: {
        type: DataTypes.FLOAT,
      },
      yards_allowed_per_tgt: {
        type: DataTypes.FLOAT,
      },
      rec_td_allowed: {
        type: DataTypes.INTEGER,
      },
      passer_rating_allowed: {
        type: DataTypes.FLOAT,
      },
      adot: {
        type: DataTypes.FLOAT,
      },
      air_yards_completed: {
          type: DataTypes.FLOAT,
      },
      yards_after_catch: {
        type: DataTypes.FLOAT,
      },
      blitzed: {
        type: DataTypes.INTEGER,
      },
      hurried: {
          type: DataTypes.INTEGER,
      },
      pressures: {
        type: DataTypes.FLOAT,
      },
      tackles_combined: {
        type: DataTypes.FLOAT,
      },
      tackles_missed: {
        type: DataTypes.FLOAT,
      },
      tackles_missed_pct: {
        type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_adv_stats_def',
      timestamps: false,
    }
  );