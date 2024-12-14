const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
  _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
  testBase.resetDatabase(knex_db);
};

const readTeachers = async () => {
  const sql = `SELECT * FROM teacher`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const readTeacherInfo = async (id) => {
  const sql = `SELECT * FROM teacher WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const addTeacher = async (id, name, age) => {
  const sql = `INSERT INTO teacher (id, name, age) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id, name, age])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateTeacher = async (name, age, id) => {
  const sql = `UPDATE teacher SET name = ?, age = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [name, age, id])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteTeacher = async (id) => {
  const sql = `DELETE FROM teacher WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  readTeachers,
  readTeacherInfo,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};

const readStudents = async () => {
  const sql = `SELECT * FROM students`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const readStudentInfo = async (id) => {
  const sql = `SELECT * FROM students WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const addStudent = async (id, name, age, religion) => {
  const sql = `INSERT INTO students (id, name, age, religion) VALUES (?, ?, ?, ?)`; // Query to add a new student
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id, name, age, religion])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateStudent = async (name, age, religion, id) => {
  const sql = `UPDATE students SET name = ?, age = ?, religion = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [name, age, religion, id])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteStudent = async (id) => {
  const sql = `DELETE FROM students WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  readTeachers,
  readStudents,
  addStudent,
  addTeacher,
  deleteTeacher,
  deleteStudent,
  readStudentInfo,
  readTeacherInfo,
  updateStudent,
  updateTeacher,
};
