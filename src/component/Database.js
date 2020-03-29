import SQLite from 'react-native-sqlite-storage'

SQLite.DEBUG(true)

export const db = () => {
    return SQLite.openDatabase({ name: 'Layer.db', location: "Documents" })
}

const showAll = () => {
    db().transaction((tx) => {
        tx.executeSql('SELECT * FROM layer', [])
    })
}

const createTable = (name) => {
    db().transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + name + '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(50),position TEXT(225))', [])
    })
}

const createData = (data, name) => {
    db().transaction((tx) => {
        tx.executeSql('INSERT INTO ' + name + ' (name, position) VALUES (:name, :position)', [data.name, data.position])
    })
}

const deleteTable = () => {
    db().transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS layer', [])
    })
}

export {
    createTable,
    showAll,
    createData,
    deleteTable
}