import property from "./property";
import status from "./status";
import status_history from "./status_history";
import users from "./users";

property.hasMany(status_history, { foreignKey: "property_id" });
status_history.belongsTo(property, { foreignKey: "property_id" });
status_history.belongsTo(status, { foreignKey: "status_id" });
status.hasMany(status_history, { foreignKey: "status_id" });

export { property, status, status_history, users };
