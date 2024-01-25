export interface FilterMember {
  discipline: string;
  fullName: string;
  jobTitle: string;
  userHours: number;
  userId: number;
}

export interface IProjectResult {
  completedDate: string;
  difficulty: string;
  filterMembers: FilterMember[];
  floorAreas: number;
  listLeader: string;
  listManager: string;
  listmember: string;
  location: string;
  projectId: string;
  projectName: string;
  size: string;
  startDate: string;
  targetDate: string;
  tasks: number;
  totalHours: number;
  usedHours: number;
}
