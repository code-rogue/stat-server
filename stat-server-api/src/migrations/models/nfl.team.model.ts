import { sequelize } from '../../sequelize';
import { TeamModelLabel } from '../../constants/nfl/service.constants';
import { teamModelOptions, teamSchema } from '../../team/models/schema/team.schema';

export const Team = sequelize.define(
    TeamModelLabel,
    teamSchema(),
    teamModelOptions(sequelize),
);