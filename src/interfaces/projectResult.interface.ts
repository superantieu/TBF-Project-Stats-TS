export interface FilterMember {
  Discipline: string;
  FullName: string;
  JobTitle: string;
  UserHours: number;
  UserId: number;
}

export interface IProjectResult {
  CompletedDate: string;
  Difficulty: string;
  FilterMembers: FilterMember[];
  FloorAreas: number;
  ListLeader: string;
  ListManager: string;
  Listmember: string;
  Location: string;
  ProjectId: string;
  ProjectName: string;
  Size: string;
  StartDate: string;
  TargetDate: string;
  Tasks: number;
  TotalHours: number;
  UsedHours: number;
}
