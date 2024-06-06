import { DataTypes } from 'sequelize';

export function timestampColumn(): any {
    return {
        type: DataTypes.DATE,
        set() {
            // Do not allow changing the 'created_date' manually
        },
    }
}

export function timestampUpdateTrigger(schema: string, tableName: string): string {
    return `CREATE TRIGGER ${tableName}_update_trigger
    BEFORE UPDATE ON ${schema}.${tableName}
    FOR EACH ROW
        EXECUTE FUNCTION public.update_trigger_function();`;
}

export function timestampInsertTrigger(schema: string, tableName: string): string {
    return `CREATE TRIGGER ${tableName}_insert_trigger
    BEFORE INSERT ON ${schema}.${tableName}
    FOR EACH ROW
        EXECUTE FUNCTION public.insert_trigger_function();`;
}