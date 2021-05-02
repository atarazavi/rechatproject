// const Status = ["ToDo", "InProgress", "Blocked", "InQA", "Done", "Deployed"];
interface TypePossibleStatus {
  [key: string]: string[];
}

export const possibleStatus: TypePossibleStatus = {
  ToDo: ["ToDo", "InProgress"],
  InProgress: ["InProgress", "Blocked", "InQA"],
  Blocked: ["Blocked", "ToDo"],
  InQA: ["InQA", "ToDo", "Done"],
  Done: ["Done", "Deployed"],
  Deployed: ["Deployed"],
};
