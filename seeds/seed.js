const sequelize = require('../config/config');
const {FuelStation} = require('../models');

const stationData = require('./stationData.json');

const seedDataBase = async () => {
    await sequelize.sync({force: true});
    for (const station of stationData) {
        await FuelStation.create({
            ...station
        });
    }

    process.exit(0);
};

seedDataBase();