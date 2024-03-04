export default class PlayerData {
    //玩家存档
    static GetPlayerData() {
        let data;
        data = Laya.LocalStorage.getJSON('PlayerData');
        if (data) {
            return data;
        } else {
            data = {
                'ver': 1,
                'grade': 1,
                'coin': 0,
                'nowPeople': 0,
                'peopleActive': [true, false, false, false, false,
                    false, false, false, false],
                'lockAxis': 0,
            }
            Laya.LocalStorage.setJSON('PlayerData', data);
            return data;
        }
    }
    static SavePlayerData(data) {
        Laya.LocalStorage.setJSON('PlayerData', data);
    }
    static clearPlayerData() {
        Laya.LocalStorage.clear();
    }
    static CheckPlayerData() {
        let data;
        data = Laya.LocalStorage.getJSON('PlayerData');
        if (!data.ver||data.ver != 1) {
            data = {
                'ver': 1,
                'grade': 1,
                'coin': 0,
                'nowPeople': 0,
                'peopleActive': [true, false, false, false, false,
                    false, false, false, false],
                'lockAxis': 0,
            }
            Laya.LocalStorage.setJSON('PlayerData', data);
        }
    }
}

