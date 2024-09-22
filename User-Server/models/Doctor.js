const pool = require("../dbConfig/dbConfig");
const verifyPassword = require("../utils/verifyPassword");
class Doctor {
  static async loginDoctor(doctorCredentials) {
    try {
      const result = await pool.query(
        "SELECT doctor_id FROM Doctors WHERE email=$1",
        [doctorCredentials.email]
      );
console.log(result.rows[0]);
      if (result.rows[0]) {
        const isVerified = verifyPassword({
          hashedPassword: result.rows[0].password,
          password: doctorCredentials.password,
        });
        console.log(isVerified);
        if (isVerified) {
          return {
            isReturned: true,
            user: result.rows[0],
            message: "User returned successfully",
            role: "Doctor",
          };
        } else return { message: "Invalid Credentials", isReturned: false };
      } else return { message: "invalid Credentials", isReturned: false };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = Doctor;
