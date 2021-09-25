import queries from '../../helpers/queries/queries';
import AttendanceSchema from '../../schema/Attendance';

const retrieveAllAttendances = async () => {
  const members = await queries.findAll(AttendanceSchema);

  return members;
};

export default {
  retrieveAllAttendances,
};
