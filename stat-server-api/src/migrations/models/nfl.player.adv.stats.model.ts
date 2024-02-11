import { DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { timestampColumn } from './model.helpers';

import { PlayerWeeklyStats }  from './nfl.player.stats.model';

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
    pass_bad_throws: {
        type: DataTypes.INTEGER,
    },
    pass_bad_throw_pct: {
        type: DataTypes.FLOAT,
    },
    times_blitzed: {
        type: DataTypes.INTEGER,
    },
    times_hurried: {
        type: DataTypes.INTEGER,
    },
    times_hit: {
        type: DataTypes.INTEGER,
    },
    times_pressured: {
        type: DataTypes.INTEGER,
    },
    times_pressured_pct: {
        type: DataTypes.FLOAT,
    },
    def_times_blitzed: {
        type: DataTypes.INTEGER,
    },
    def_times_hurried: {
        type: DataTypes.INTEGER,
    },
    def_times_hitqb: {
        type: DataTypes.INTEGER,
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
      rushing_yards_before_contact: {
          type: DataTypes.FLOAT,
      },
      rushing_yards_before_contact_avg: {
          type: DataTypes.FLOAT,
      },
      rushing_yards_after_contact: {
        type: DataTypes.FLOAT,
      },
      rushing_yards_after_contact_avg: {
        type: DataTypes.FLOAT,
      },
      rushing_broken_tackles: {
          type: DataTypes.INTEGER,
      },
      receiving_broken_tackles: {
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
      rushing_broken_tackles: {
        type: DataTypes.INTEGER,
      },
      receiving_broken_tackles: {
        type: DataTypes.INTEGER,
      },
      passing_drops: {
          type: DataTypes.INTEGER,
      },
      passing_drop_pct: {
        type: DataTypes.FLOAT,
      },
      receiving_drop: {
        type: DataTypes.INTEGER,
      },
      receiving_drop_pct: {
          type: DataTypes.FLOAT,
      },
      receiving_int: {
        type: DataTypes.INTEGER,
      },
      receiving_rat: {
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
      times_blitzed: {
        type: DataTypes.INTEGER,
      },
      times_hurried: {
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
      tackle_missed_pct: {
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