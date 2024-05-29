import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name can not be longer than 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First Name is not in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name is not valid',
  }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'Father Name is required' }),
  fatherOccupation: z.string({
    required_error: 'Father Occupation is required',
  }),
  fatherContactNo: z.string({
    required_error: 'Father Contact Number is required',
  }),
  motherName: z.string({ required_error: 'Mother Name is required' }),
  motherOccupation: z.string({
    required_error: 'Mother Occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother Contact Number is required',
  }),
});

const localGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Local Guardian Name is required' }),
  occupation: z.string({
    required_error: 'Local Guardian Occupation is required',
  }),
  contactNo: z.string({
    required_error: 'Local Guardian Contact Number is required',
  }),
  address: z.string({ required_error: 'Local Guardian Address is required' }),
});

const studentValidationSchema = z.object({
  id: z.string({ required_error: 'Student ID is required' }),
  password: z.string({ required_error: 'Password is required' }).max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: '{VALUE} is not valid',
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email is not a valid email' }),
  contactNo: z.string({ required_error: 'Contact Number is required' }),
  emergencyContactNo: z.string({
    required_error: 'Emergency Contact Number is required',
  }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string({ required_error: 'Present Address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string({ required_error: 'Profile Image is required' }),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
