import { useContext, useEffect } from "react";
import { TasksContext } from "Context/TasksContext";

export default function useTasksLoading() {
  const { fetchTasks, fetchLogs } = useContext(TasksContext);
  
  useEffect(() => {
    fetchTasks();
    fetchLogs();
  }, [fetchTasks, fetchLogs]);
}
