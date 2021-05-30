import AttendanceSchema from '../../schema/Attendance';

const authenticateToken = async (t: string) =>
  await AttendanceSchema.findOne({ token: t });

const updateAttendance = async (t: string, m: number) =>
  await AttendanceSchema.updateOne(
    { token: t },
    { fall2021MeetingsAttended: m + 1 }
  );

export default {
  authenticateToken,
  updateAttendance,
};
