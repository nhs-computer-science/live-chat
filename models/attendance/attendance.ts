import AttendanceSchema from '../../schema/Attendance';
import queries from '../../helpers/queries/queries';

const authenticateToken = async (t: string) =>
  await queries.findOne({
    schema: AttendanceSchema,
    filterProperty: 'token',
    filterValue: t,
  });

const updateAttendance = async (t: string, m: number) =>
  await queries.updateOne(
    { schema: AttendanceSchema, filterProperty: 'token', filterValue: t },
    'fall2021MeetingsAttended',
    m + 1
  );

export default {
  authenticateToken,
  updateAttendance,
};
