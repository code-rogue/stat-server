import { Sequelize } from 'sequelize';

export function twoColumnSeasonJoin<T>(
    sequelize: Sequelize, 
    model: T, sourceLabel: string, 
    targetLabel: string): any 
{
    return {
        model,
        on: {
            col1: sequelize.where(sequelize.col(`${sourceLabel}.player_id`), "=", sequelize.col(`${targetLabel}.player_id`)),
            col2: sequelize.where(sequelize.col(`${sourceLabel}.season`), "=", sequelize.col(`${targetLabel}.season`))
        },
    }
}