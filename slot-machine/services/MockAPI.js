class MockAPI {
    constructor() {
        this.data = {
            /*100: {
                balance: 970,
                last_bet: 10,
                bets: [10, 20, 50, 100],
                rolls: [[8, 3, 9], [9, 9, 4], [5, 6, 3]]
            }*/
        };
    }

    async init(uid) {
        return new Promise(resolve => {
            const user = this.data[uid] || {
                uid,
                balance: 1000,
                last_bet: 0,
                bets: [10, 20, 50, 100],
                rolls: this.generateRolls()
            };
            this.data[uid] = user;
            resolve(user);
        });
    }

    async spin(uid, bet) {
        return new Promise(resolve => {
            const user = this.data[uid];
            const isWin = Math.random() > 0.7;
            const winAmount = isWin ? bet * 2 : 0;
            user.balance = user.balance - bet + winAmount;
            user.last_bet = bet;
            user.rolls = this.generateRolls();
            const result = {...user};
            if (isWin) {
                result.win = winAmount;
            }
            resolve(result);
        });
    }

    generateRolls() {
        return [
            [Utilities.getRandomSymbolNumber(), Utilities.getRandomSymbolNumber(), Utilities.getRandomSymbolNumber()],
            [Utilities.getRandomSymbolNumber(), Utilities.getRandomSymbolNumber(), Utilities.getRandomSymbolNumber()],
            [Utilities.getRandomSymbolNumber(), Utilities.getRandomSymbolNumber(), Utilities.getRandomSymbolNumber()]
        ];
    }
}
