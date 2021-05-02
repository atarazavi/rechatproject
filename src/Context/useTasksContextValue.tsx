import { useState, useCallback } from "react";
import { TasksContextData, TaskType, LogsType } from "../Context/TasksContext";
import axios from "axios";

export default function useTasksContextValue(): TasksContextData {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [logs, setLogs] = useState<LogsType[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toBEditedTaskID, setToBEditedTaskID] = useState<number | null>(null);

  const fetchTasks = useCallback(() => {
    setIsLoading(true);
    axios
      .get<TaskType[]>("https://6086d852a3b9c200173b705c.mockapi.io/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      })
      .then((response) => {
        setTasks(response.data);
        setIsLoading(false);
      })
      .catch((ex) => {
        let error = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Resource Not Found"
          : "An unexpected error has occurred";

        setApiError(error);
        setIsLoading(false);
      });
  }, [setTasks]);

  const editTask = useCallback(
    (taskId: number, name: string, description: string, status: string) => {
      const beforeChange = JSON.stringify(
        tasks?.filter((e) => +e.id === +taskId)[0]
      );      
      setIsLoading(true);
      axios
        .put(`https://6086d852a3b9c200173b705c.mockapi.io/tasks/${taskId}`, {
          id: taskId,
          createdAt: new Date(),
          name,
          description,
          status,
        })
        .then(() => {
          const newTasks = [...tasks];
          const toBEditedTaskIndex = newTasks.findIndex(
            (task) => +task.id === taskId
          );
          if (toBEditedTaskIndex > -1) {
            newTasks[toBEditedTaskIndex] = {
              id: taskId,
              createdAt: new Date(),
              name,
              description,
              status,
            };
          }
          setTasks(newTasks);
          setIsLoading(false);
          setToBEditedTaskID(null);
          addLog(
            taskId,
            "edit",
            beforeChange,
            JSON.stringify({
              id: taskId,
              createdAt: new Date(),
              name,
              description,
              status,
            })
          );
        })
        .catch((ex) => {
          let error = axios.isCancel(ex)
            ? "Request Cancelled"
            : ex.code === "ECONNABORTED"
            ? "A timeout has occurred"
            : ex.response.status === 404
            ? "Resource Not Found"
            : `An unexpected error has occurred with this code: ${ex.response.status}`;
          setApiError(error);
          setIsLoading(false);
        });
    },
    [setTasks, tasks]
  );

  const addTask = useCallback(
    (name: string, description: string) => {
      setIsLoading(true);
      const lastID = tasks[tasks.length - 1]?.id ?? 0;
      axios
        .post(`https://6086d852a3b9c200173b705c.mockapi.io/tasks`, {
          id: lastID + 1,
          createdAt: new Date(),
          name,
          description,
          status: "ToDo",
        })
        .then(() => {
          const newTasks = [
            ...tasks,
            {
              id: +lastID + 1,
              createdAt: new Date(),
              name,
              description,
              status: "ToDo",
            },
          ];
          setTasks(newTasks);
          setIsLoading(false);
          addLog(
            +lastID + 1,
            "add",
            "None",
            JSON.stringify({
              id: +lastID + 1,
              createdAt: new Date(),
              name,
              description,
              status: "ToDo",
            })
          );
        })
        .catch((ex) => {
          let error = axios.isCancel(ex)
            ? "Request Cancelled"
            : ex.code === "ECONNABORTED"
            ? "A timeout has occurred"
            : ex.response.status === 404
            ? "Resource Not Found"
            : `An unexpected error has occurred with this code: ${ex.response.status}`;
          setApiError(error);
          setIsLoading(false);
        });
    },
    [setTasks, tasks]
  );

  const fetchLogs = useCallback(() => {
    setIsLoading(true);
    axios
      .get<LogsType[]>("https://6086d852a3b9c200173b705c.mockapi.io/logs", {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      })
      .then((response) => {
        setLogs(response.data);
        setIsLoading(false);
      })
      .catch((ex) => {
        let error = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Resource Not Found"
          : "An unexpected error has occurred";

        setApiError(error);
        setIsLoading(false);
      });
  }, [setLogs]);

  const addLog = (
    id: number,
    type: string,
    beforeChange: string,
    afterChange: string
  ) => {
    axios
      .post(`https://6086d852a3b9c200173b705c.mockapi.io/logs`, {
        createdAt: new Date(),
        relatedTaskID: id,
        type: type,
        before: beforeChange,
        after: afterChange,
      })
      .catch((ex) => {
        let error = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Resource Not Found"
          : `An unexpected error has occurred with this code: ${ex.response.status}`;
          console.log(error);
      });
  };

  const editThisID = (taskID: number | null) => setToBEditedTaskID(taskID);

  return {
    tasks,
    logs,
    isLoading,
    apiError,
    fetchLogs,
    toBEditedTaskID,
    editThisID,
    fetchTasks,
    editTask,
    addTask,
  };
}
