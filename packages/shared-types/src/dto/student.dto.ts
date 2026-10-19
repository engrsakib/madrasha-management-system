import type { Gender } from "../enums";

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  classId: string;
  guardianName: string;
  guardianPhone: string;
  address?: string;
}

export interface StudentDto extends CreateStudentDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}
