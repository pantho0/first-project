import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // data validation with zod

  //   const zodParsedData = studentValidationSchema.parse(studentData);

  // if (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: 'Something Went Wrong',
  //     error: error.details,
  //   });
  // }

  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
