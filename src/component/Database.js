import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);

const database = SQLite.openDatabase({name: 'Layer.db', location: 'Documents'});

export const db = () => {
  return SQLite.openDatabase({name: 'Layer.db', location: 'Documents'});
};

const showAll = async () => {
  db().transaction(tx => {
    tx.executeSql('SELECT * FROM layer', [], (rest, data) => {
      return data;
    });
  });
};

const deleteData = data => {
  database.transaction(tx => {
    tx.executeSql(
      'DELETE FROM ' + data.name + ' WHERE id=' + data.id,
      [],
      () => {
        console.log('Berhasil dihapus');
      },
    );
  });
};

const updatePos = data => {
  db().transaction(tx => {
    tx.executeSql(
      'UPDATE ' +
        data.name +
        " SET position = '" +
        data.pos +
        "' WHERE id = " +
        data.id,
    );
  });
};

const createTable = name => {
  db().transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        name +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT,key INTEGER, name TEXT(50),position TEXT(225))',
      [],
    );
  });
};

const createData = (data, name) => {
  db().transaction(tx => {
    tx.executeSql(
      'INSERT INTO ' +
        name +
        ' (key, name, position) VALUES (:id ,:name, :position)',
      [data.id, data.name, data.position],
    );
  });
};

const deleteTable = name => {
  db().transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS ' + name, []);
  });
};

export {createTable, showAll, createData, deleteTable, updatePos, deleteData};
