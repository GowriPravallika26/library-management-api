module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Transaction", {
        borrowed_at: DataTypes.DATE,
        due_date: DataTypes.DATE,
        returned_at: DataTypes.DATE,
        status: {
            type: DataTypes.STRING,
            defaultValue: "active"
        }
    });
};
