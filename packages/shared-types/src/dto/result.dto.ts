import type { ExamType } from "../enums";

export interface ResultDto {
  id: string;
  studentId: string;
  classId: string;
  examType: ExamType;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade?: string;
  examDate: string;
}

export interface CreateResultDto {
  studentId: string;
  classId: string;
  examType: ExamType;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  examDate: string;
}
