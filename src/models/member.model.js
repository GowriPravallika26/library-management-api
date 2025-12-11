module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Member", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        membership_number: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
            defaultValue: "active"
        }
    });
};
