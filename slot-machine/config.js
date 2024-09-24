const BLUE_COLOR = 0x1099bb;
const YELLOW_COLOR = 0xFBFF4B;

const CONFIG = {
    env: 'dev', // dev, prod
    userId: 100,

    backgroundColor: BLUE_COLOR,

    rollsQuantity: 3,
    rollWidth: 160,
    rollHorizontalMargin: 30,

    rollsContainerBorderColor: YELLOW_COLOR,
    rollsContainerBorderMargin: 10,

    rowsQuantity: 3,

    symbolSize: 150,
    symbolVerticalMargin: 30,

    headerHeight: 75,
    headerWidth: 640,
    headerContentTop: 55,

    footerHeight: 150,

    spinButton: {
        width: 200,
        height: 75,
        radius: 20,
        color: YELLOW_COLOR,
        fontSize: 42,
        textColor: BLUE_COLOR
    },

    betController: {
        textColor: YELLOW_COLOR,
        fontSize: 24,
    },

    betButton: {
        width: 35,
        height: 35,
        radius: 10,
        color: YELLOW_COLOR,
        fontSize: 18,
        textColor: BLUE_COLOR,
        deltaX: 45
    },

    balance: {
        fontSize: 24,
        textColor: YELLOW_COLOR,
        x: 137.5
    },

    apiResponse: {
        uid: 100,
        balance: 970,
        last_bet: 10,
        bets: [10, 20, 50, 100],
        rolls: [[8, 3, 9], [9, 9, 4], [5, 6, 3]]
    },

    symbolsQuantity: 10,

    blindZoneAboveRolls: {
        y: -90,
        height: 170,
        width: 640
    },

    blindZoneUnderRolls: {
        y: 600,
        height: 175,
        width: 640
    },

    timeMovingSymbolToNextPosition: 100,

    intermediateSymbolsQuantityForSpinByRoll: [10, 20, 30],
}
