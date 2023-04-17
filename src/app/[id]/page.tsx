'use client'

const TaskViewPage = ({ params }: {
    params: Array<string>;
}) => {
  return <div>TaskViewPage {params.id}</div>;
};

export default TaskViewPage;
