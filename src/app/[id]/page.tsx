'use client'

import { useRouter, useSearchParams } from 'next/navigation';

const TaskViewPage = () => {
  const router = useRouter();
  const id = useSearchParams();

  console.log('router', router);
    console.log('id', id);
  return <div>TaskViewPage {id}</div>;
};

export default TaskViewPage;
