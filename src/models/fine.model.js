module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Fine", {
        amount: DataTypes.FLOAT,
        paid_at: DataTypes.DATE
    });
};
