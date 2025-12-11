module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Book", {
        isbn: DataTypes.STRING,
        title: DataTypes.STRING,
        author: DataTypes.STRING,
        category: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
            defaultValue: "available"
        },
        total_copies: DataTypes.INTEGER,
        available_copies: DataTypes.INTEGER
    });
};
