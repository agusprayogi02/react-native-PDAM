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

// const updatePos = data => {
//   db().transaction(tx => {
//     tx.executeSql(
//       'UPDATE ' +
//         data.name +
//         " SET position = '" +
//         data.pos +
//         "' WHERE id = " +
//         data.id,
//     );
//   });
// };

const createTable = name => {
  db().transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        name +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(50),Tname TEXT(50))',
      [],
    );
  });
};

const createData = (data, name) => {
  db().transaction(tx => {
    tx.executeSql(
      'INSERT INTO ' + name + ' (name, Tname) VALUES (:name, :Tname)',
      [data.name, data.Tname],
    );
  });
};

const deleteTable = name => {
  db().transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS ' + name, []);
  });
};

const CTableMap = name => {
  db().transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        name +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT, latitude TEXT(50),longitude TEXT(50),color TEXT(50))',
      [],
    );
  });
};

const CMap = (data, name) => {
  db().transaction(tx => {
    tx.executeSql(
      'INSERT INTO ' +
        name +
        ' (latitude, longitude, color) VALUES (:latitude,:longitude, :color)',
      [data.coordinate.latitude, data.coordinate.longitude, data.color],
    );
  });
};

const UMap = (data, name) => {
  db().transaction(tx => {
    tx.executeSql(
      'UPDATE ' +
        name +
        " SET latitude = '" +
        data.coordinate.latitude +
        "', longitude = '" +
        data.coordinate.longitude +
        "', color = '" +
        data.color +
        "' WHERE id = " +
        data.id,
      [],
    );
  });
};

const DMap = (id, name) => {
  database.transaction(tx => {
    tx.executeSql('DELETE FROM ' + name + ' WHERE id=' + id, [], () => {
      console.log('Berhasil dihapus');
    });
  });
};

export {CMap, UMap, DMap};
export {createTable, showAll, createData, deleteTable, deleteData, CTableMap};
