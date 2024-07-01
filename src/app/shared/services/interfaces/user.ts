export interface User {
  _id: String;
  firstname: String;
  lastname: String;
  username: String;
  email: String;
  password: String;
  personalInfo: String;
  education: [];
  workExperience: [];
  skills: [];
  languages: [];
  otherSkills: [];
  profilePicture: String;
}
