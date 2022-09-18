import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Result, Button } from "antd";
import { reflect } from "@effector/reflect";

import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import styles from "./styles.module.scss";
import { useParams } from "react-router";

type RouteProps = {
    taskId: string;
};

type LoadingProps = {
    isLoading: boolean;
}

const View = ({isLoading}: LoadingProps) => {
    const params = useParams<RouteProps>()
    const taskId = Number(params?.taskId);
    const task = taskModel.selectors.useTask(taskId);

    useEffect(() => {
        taskModel.effects.getTaskByIdFx({ taskId });
    }, [taskId]);

    if (!task && !isLoading) {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Task was not found"
                extra={<Link to="/"><Button type="primary">Back to tasks list {taskId}</Button></Link>}
            />
        )
    }

    return (
        <Layout className={styles.root}>
            <Layout.Content className={styles.content}>
                <TaskCard
                    data={task}
                    size="default"
                    className={styles.card}
                    bodyStyle={{ height: 400 }}
                    loading={isLoading}
                    extra={<Link to="/">Back to TasksList</Link>}
                    actions={[
                        <ToggleTask key="toggle" taskId={taskId} />
                    ]}
                />
            </Layout.Content>
        </Layout>
    )
};

const TaskDetailsPage = reflect({
    view: View,
    bind: {
        isLoading: taskModel.$taskDetailsLoading,
    }
});

export default TaskDetailsPage;