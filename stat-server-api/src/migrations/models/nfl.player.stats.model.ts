import { DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { timestampColumn } from './model.helpers';

import { Player }  from './nfl.player.model';

export const PlayerWeeklyStats = sequelize.define(
    'PlayerWeeklyStats',
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      game_id: {
        type: DataTypes.STRING(32),
      },
      pfr_game_id: {
        type: DataTypes.STRING(32),
      },
      player_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: Player,
              key: 'id',
          },
      },
      season: {
          type: DataTypes.STRING(16),
      },
      week: {
          type: DataTypes.STRING(16),
      },
      game_type: {
          type: DataTypes.STRING(16),
          defaultValue: 'REG',
      },
      opponent: {
          type: DataTypes.STRING(16),
      },
      fantasy_points: {
        type: DataTypes.FLOAT,
      },
      fantasy_points_ppr: {
          type: DataTypes.FLOAT,
      },
    },
    {
      schema: 'nfl',
      tableName: 'player_weekly_stats',
      timestamps: false,
    }
);

export const WeeklyStatsPass = sequelize.define(
  'WeeklyStatsPass',
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
    attempts: {
        type: DataTypes.INTEGER,
    },
    completions: {
        type: DataTypes.INTEGER,
    },
    pass_yards: {
        type: DataTypes.FLOAT,
    },
    yards_after_catch: {
        type: DataTypes.FLOAT,
    },
    air_yards: {
        type: DataTypes.FLOAT,
    },
    pass_air_conversion_ratio: {
        type: DataTypes.FLOAT,
    },
    pass_first_downs: {
        type: DataTypes.INTEGER,
    },
    dakota: {
        type: DataTypes.FLOAT,
    },
    pass_epa: {
        type: DataTypes.FLOAT,
    },
    pass_tds: {
        type: DataTypes.INTEGER,
    },
    pass_two_pt_conversions: {
        type: DataTypes.INTEGER,
    },
    interceptions: {
        type: DataTypes.INTEGER,
    },
    sacks: {
        type: DataTypes.FLOAT,
    },
    sack_yards: {
        type: DataTypes.FLOAT,
    },
    sack_fumbles: {
        type: DataTypes.INTEGER,
    },
    sack_fumbles_lost: {
        type: DataTypes.INTEGER,
    },
    created_date: timestampColumn(sequelize),
    last_modified: timestampColumn(sequelize),
  },
  {
    schema: 'nfl',
    tableName: 'weekly_stats_pass',
    timestamps: false,
  }
);

export const WeeklyStatsRush = sequelize.define(
    'WeeklyStatsRush',
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
      carries: {
          type: DataTypes.INTEGER,
      },
      rush_yards: {
          type: DataTypes.FLOAT,
      },
      rush_first_downs: {
        type: DataTypes.INTEGER,
      },
      rush_epa: {
        type: DataTypes.FLOAT,
      },
      rush_tds: {
          type: DataTypes.INTEGER,
      },
      rush_two_pt_conversions: {
        type: DataTypes.INTEGER,
      },
      rush_fumbles: {
          type: DataTypes.INTEGER,
      },
      rush_fumbles_lost: {
          type: DataTypes.INTEGER,
      },
      special_teams_tds: {
        type: DataTypes.INTEGER,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_stats_rush',
      timestamps: false,
    }
  );

  export const WeeklyStatsRec = sequelize.define(
    'WeeklyRecStats',
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
      receptions: {
          type: DataTypes.INTEGER,
      },
      targets: {
        type: DataTypes.INTEGER,
      },
      target_share: {
        type: DataTypes.FLOAT,
      },
      rec_yards: {
          type: DataTypes.FLOAT,
      },
      yards_after_catch: {
        type: DataTypes.FLOAT,
      },
      air_yards: {
        type: DataTypes.FLOAT,
      },
      air_yards_share: {
        type: DataTypes.FLOAT,
      },
      air_conversion_ratio: {
        type: DataTypes.FLOAT,
      },
      weighted_opportunity_rating: {
        type: DataTypes.FLOAT,
      },
      rec_epa: {
        type: DataTypes.FLOAT,
      },
      rec_tds: {
          type: DataTypes.INTEGER,
      },
      rec_two_pt_conversions: {
        type: DataTypes.INTEGER,
      },
      rec_first_downs: {
        type: DataTypes.INTEGER,
      },
      rec_fumbles: {
          type: DataTypes.INTEGER,
      },
      rec_fumbles_lost: {
          type: DataTypes.INTEGER,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_stats_rec',
      timestamps: false,
    }
  );

  export const WeeklyStatsDef = sequelize.define(
    'WeeklyStatsDef',
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
      tackles: {
          type: DataTypes.FLOAT,
      },
      tackles_solo: {
        type: DataTypes.FLOAT,
      },
      tackle_assists: {
        type: DataTypes.FLOAT,
      },
      tackles_for_loss: {
          type: DataTypes.FLOAT,
      },
      tackles_for_loss_yards: {
        type: DataTypes.FLOAT,
      },
      fumbles_forced: {
        type: DataTypes.FLOAT,
      },
      sacks: {
        type: DataTypes.FLOAT,
      },
      sack_yards: {
        type: DataTypes.FLOAT,
      },
      qb_hits: {
        type: DataTypes.FLOAT,
      },
      interceptions: {
        type: DataTypes.FLOAT,
      },
      interception_yards: {
          type: DataTypes.FLOAT,
      },
      pass_defended: {
        type: DataTypes.FLOAT,
      },
      def_tds: {
        type: DataTypes.FLOAT,
      },
      fumbles: {
          type: DataTypes.FLOAT,
      },
      fumble_recovery_own: {
          type: DataTypes.FLOAT,
      },
      fumble_recovery_yards_own: {
        type: DataTypes.FLOAT,
      },
      fumble_recovery_opp: {
        type: DataTypes.FLOAT,
      },
      fumble_recovery_yards_opp: {
        type: DataTypes.FLOAT,
      },
      safety: {
        type: DataTypes.FLOAT,
      },
      penalty: {
        type: DataTypes.FLOAT,
      },
      penalty_yards: {
        type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_stats_def',
      timestamps: false,
    }
  );

  export const WeeklyStatsKick = sequelize.define(
    'WeeklyStatsKick',
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
      fg_att: {
        type: DataTypes.INTEGER,
      },
      fg_made: {
          type: DataTypes.INTEGER,
      },
      fg_missed: {
        type: DataTypes.INTEGER,
      },
      fg_blocked: {
        type: DataTypes.INTEGER,
      },
      fg_pct: {
        type: DataTypes.FLOAT,
      },
      fg_long: {
          type: DataTypes.FLOAT,
      },
      fg_made_0_19: {
        type: DataTypes.INTEGER,
      },
      fg_made_20_29: {
          type: DataTypes.INTEGER,
      },
      fg_made_30_39: {
          type: DataTypes.INTEGER,
      },
      fg_made_40_49: {
          type: DataTypes.INTEGER,
      },
      fg_made_50_59: {
          type: DataTypes.INTEGER,
      },
      fg_made_60_: {
          type: DataTypes.INTEGER,
      },
      fg_missed_0_19: {
        type: DataTypes.INTEGER,
      },
      fg_missed_20_29: {
          type: DataTypes.INTEGER,
      },
      fg_missed_30_39: {
          type: DataTypes.INTEGER,
      },
      fg_missed_40_49: {
          type: DataTypes.INTEGER,
      },
      fg_missed_50_59: {
          type: DataTypes.INTEGER,
      },
      fg_missed_60_: {
          type: DataTypes.INTEGER,
      },
      fg_made_distance: {
        type: DataTypes.FLOAT,
      },
      fg_missed_distance: {
        type: DataTypes.FLOAT,
      },
      fg_blocked_distance: {
        type: DataTypes.FLOAT,
      },
      fg_made_list: {
        type: DataTypes.STRING(64),
      },
      fg_missed_list: {
        type: DataTypes.STRING(64),
      },
      fg_blocked_list: {
        type: DataTypes.STRING(64),
      },
      gwfg_att: {
        type: DataTypes.INTEGER,
      },
      gwfg_distance: {
          type: DataTypes.FLOAT,
      },
      gwfg_made: {
        type: DataTypes.INTEGER,
      },
      gwfg_missed: {
        type: DataTypes.INTEGER,
      },
      gwfg_blocked: {
        type: DataTypes.INTEGER,
      },
      pat_att: {
        type: DataTypes.INTEGER,
      },
      pat_made: {
        type: DataTypes.INTEGER,
      },
      pat_missed: {
        type: DataTypes.INTEGER,
      },
      pat_blocked: {
        type: DataTypes.INTEGER,
      },
      pat_pct: {
          type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_stats_kick',
      timestamps: false,
    }
  );