import { DataTypes, Sequelize } from 'sequelize';

export function timestampColumn(sequelize: Sequelize): any {
    return {
        type: DataTypes.DATE,
        set() {
            // Do not allow changing the 'created_date' manually
        },
    }
}

export function timestampUpdateTrigger(triggerName: string, schema: string, tableName: string): string {
    return `CREATE TRIGGER ${triggerName}
    BEFORE UPDATE ON ${schema}.${tableName}
    FOR EACH ROW
        EXECUTE FUNCTION public.update_trigger_function();`;
}

export function timestampInsertTrigger(triggerName: string, schema: string, tableName: string): string {
    return `CREATE TRIGGER ${triggerName}
    BEFORE INSERT ON ${schema}.${tableName}
    FOR EACH ROW
        EXECUTE FUNCTION public.insert_trigger_function();`;
}