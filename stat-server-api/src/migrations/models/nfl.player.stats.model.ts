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

export const WeeklyPassingStats = sequelize.define(
  'WeeklyPassingStats',
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
    passing_yards: {
        type: DataTypes.FLOAT,
    },
    yards_after_catch: {
        type: DataTypes.FLOAT,
    },
    air_yards: {
        type: DataTypes.FLOAT,
    },
    passing_air_conversion_ratio: {
        type: DataTypes.FLOAT,
    },
    passing_first_downs: {
        type: DataTypes.INTEGER,
    },
    dakota: {
        type: DataTypes.FLOAT,
    },
    passing_epa: {
        type: DataTypes.INTEGER,
    },
    passing_tds: {
        type: DataTypes.INTEGER,
    },
    passing_two_pt_conversions: {
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
    tableName: 'weekly_passing_stats',
    timestamps: false,
  }
);

export const WeeklyRushingStats = sequelize.define(
    'WeeklyRushingStats',
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
      rushing_yards: {
          type: DataTypes.FLOAT,
      },
      rushing_first_downs: {
        type: DataTypes.INTEGER,
      },
      rushing_epa: {
        type: DataTypes.FLOAT,
      },
      rushing_tds: {
          type: DataTypes.INTEGER,
      },
      rushing_two_pt_conversions: {
        type: DataTypes.INTEGER,
      },
      rushing_fumbles: {
          type: DataTypes.INTEGER,
      },
      rushing_fumbles_lost: {
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
      tableName: 'weekly_rushing_stats',
      timestamps: false,
    }
  );

  export const WeeklyReceivingStats = sequelize.define(
    'WeeklyReceivingStats',
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
      receiving_yards: {
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
      receiving_epa: {
        type: DataTypes.FLOAT,
      },
      receiving_tds: {
          type: DataTypes.INTEGER,
      },
      receiving_two_pt_conversions: {
        type: DataTypes.INTEGER,
      },
      receiving_first_downs: {
        type: DataTypes.INTEGER,
      },
      receiving_fumbles: {
          type: DataTypes.INTEGER,
      },
      receiving_fumbles_lost: {
          type: DataTypes.INTEGER,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_receiving_stats',
      timestamps: false,
    }
  );

  export const WeeklyDefensiveStats = sequelize.define(
    'WeeklyDefensiveStats',
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
      def_tackles: {
          type: DataTypes.FLOAT,
      },
      def_tackles_solo: {
        type: DataTypes.FLOAT,
      },
      def_tackle_assists: {
        type: DataTypes.FLOAT,
      },
      def_tackles_for_loss: {
          type: DataTypes.FLOAT,
      },
      def_tackles_for_loss_yards: {
        type: DataTypes.FLOAT,
      },
      def_fumbles_forced: {
        type: DataTypes.FLOAT,
      },
      def_sacks: {
        type: DataTypes.FLOAT,
      },
      def_sack_yards: {
        type: DataTypes.FLOAT,
      },
      def_qb_hits: {
        type: DataTypes.FLOAT,
      },
      def_interceptions: {
        type: DataTypes.FLOAT,
      },
      def_interception_yards: {
          type: DataTypes.FLOAT,
      },
      def_pass_defended: {
        type: DataTypes.FLOAT,
      },
      def_tds: {
        type: DataTypes.FLOAT,
      },
      def_fumbles: {
          type: DataTypes.FLOAT,
      },
      def_fumble_recovery_own: {
          type: DataTypes.FLOAT,
      },
      def_fumble_recovery_yards_own: {
        type: DataTypes.FLOAT,
      },
      def_fumble_recovery_opp: {
        type: DataTypes.FLOAT,
      },
      def_fumble_recovery_yards_opp: {
        type: DataTypes.FLOAT,
      },
      def_safety: {
        type: DataTypes.FLOAT,
      },
      def_penalty: {
        type: DataTypes.FLOAT,
      },
      def_penalty_yards: {
        type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'weekly_defensive_stats',
      timestamps: false,
    }
  );

  export const WeeklyKickingStats = sequelize.define(
    'WeeklyKickingStats',
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
      tableName: 'weekly_kicking_stats',
      timestamps: false,
    }
  );