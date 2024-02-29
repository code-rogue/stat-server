import { DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { timestampColumn } from './model.helpers';

import { Player }  from './nfl.player.model';

export const PlayerSeasonStats = sequelize.define(
    'PlayerSeasonStats',
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
        allowNull: false,
        type: DataTypes.STRING(16),
      },
      age: {
        type: DataTypes.INTEGER,
      },
      games_played: {
        type: DataTypes.INTEGER,
      },
      games_started: {
        type: DataTypes.INTEGER,
      },
      fantasy_points: {
        type: DataTypes.FLOAT,
      },
      fantasy_points_ppr: {
          type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'player_season_stats',
      timestamps: false,
    }
);

export const SeasonAdvStatsPass = sequelize.define(
    'SeasonAdvStatsPass',
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      player_season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlayerSeasonStats,
            key: 'id',
        },
      },      
      attempts: {
        type: DataTypes.INTEGER,
      },
      throw_aways: {
        type: DataTypes.INTEGER,
      },
      spikes: {
        type: DataTypes.INTEGER,
      },
      drops: {
        type: DataTypes.INTEGER,
      },
      drop_pct: {
        type: DataTypes.FLOAT,
      },
      bad_throws: {
        type: DataTypes.INTEGER,
      },
      bad_throw_pct: {
        type: DataTypes.FLOAT,
      },
      pocket_time: {
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
      batted_balls: {
        type: DataTypes.INTEGER,
      },
      on_tgt_throws: {
        type: DataTypes.INTEGER,
      },
      on_tgt_throws_pct: {
        type: DataTypes.FLOAT,
      },
      rpo_plays: {
        type: DataTypes.INTEGER,
      },
      rpo_yards: {
        type: DataTypes.FLOAT,
      },
      rpo_pass_attempts: {
        type: DataTypes.FLOAT,
      },
      rpo_pass_yards: {
        type: DataTypes.FLOAT,
      },
      rpo_rush_attempts: {
        type: DataTypes.FLOAT,
      },
      rpo_rush_yards: {
        type: DataTypes.FLOAT,
      },
      pa_pass_attempts: {
        type: DataTypes.FLOAT,
      },
      pa_pass_yards: {
        type: DataTypes.FLOAT,
      },
      created_date: timestampColumn(sequelize),
      last_modified: timestampColumn(sequelize),
    },
    {
      schema: 'nfl',
      tableName: 'season_adv_stats_pass',
      timestamps: false,
    }
  );
  
  export const SeasonAdvStatsRush = sequelize.define(
      'SeasonAdvStatsRush',
      {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        player_season_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PlayerSeasonStats,
                key: 'id',
            },
        },
        attempts: {
            type: DataTypes.INTEGER,
        },
        yards: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        longest_rush: {
            type: DataTypes.FLOAT,
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
        broken_tackles_avg: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(sequelize),
        last_modified: timestampColumn(sequelize),
      },
      {
        schema: 'nfl',
        tableName: 'season_adv_stats_rush',
        timestamps: false,
      }
    );
  
    export const SeasonAdvStatsRec = sequelize.define(
      'SeasonAdvStatsRec',
      {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        player_season_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PlayerSeasonStats,
                key: 'id',
            },
        },
        targets: {
            type: DataTypes.INTEGER,
        },
        receptions: {
        type: DataTypes.INTEGER,
        },
        yards: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        longest_rec: {
            type: DataTypes.FLOAT,
        },
        air_yards: {
            type: DataTypes.FLOAT,
        },
        air_yards_avg: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact_avg: {
            type: DataTypes.FLOAT,
        },
        adot: {
            type: DataTypes.FLOAT,
        },
        broken_tackles: {
          type: DataTypes.INTEGER,
        },
        broken_tackles_avg: {
            type: DataTypes.FLOAT,
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
        tableName: 'season_adv_stats_rec',
        timestamps: false,
      }
    );
  
    export const SeasonAdvStatsDef = sequelize.define(
      'SeasonAdvStatsDef',
      {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        player_season_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PlayerSeasonStats,
                key: 'id',
            },
        },
        interceptions: {
            type: DataTypes.INTEGER,
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
        tds_allowed: {
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
        qbkd: {
          type: DataTypes.FLOAT,
        },
        sacks: {
            type: DataTypes.FLOAT,
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
        tableName: 'season_adv_stats_def',
        timestamps: false,
      }
    );