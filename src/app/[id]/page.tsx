'use client'
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../config';
import { BiPlus } from 'react-icons/bi';

const TaskViewPage = ({ params: { id } }: {
  params: Array<string>;
}): JSX.Element => {
  const [lists, setLists] = useState<{ id: string; name: string; status: boolean }[]>([]);
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState<string>('')
  const [color, setColor] = useState<string>('')

  useEffect(() => {
    // Fetch Firebase data
    const listsRef = db.ref(`lists/${id}/`);
    listsRef.on('value', (snapshot) => {
      const listsVal = snapshot.val();
      const { color, name, tasks }: { color: string; name: string; tasks: { [key: string]: { name: string; status: boolean } } } = listsVal;
      setColor(color);
      setTitle(name);
      const listsArray = Object.entries(tasks).map(([key, task]) => ({ id: key, ...task }));
      setLists(listsArray);
    });
  
    // Unsubscribe from Firebase when the component unmounts
    return () => {
      listsRef.off('value');
    };
  }, []);

  const firebaseAdd = (name: string) => {
    try {
      db.ref(`lists/${id}/tasks/`).push({
        name: input,
        status: false
      });
    } catch (error) {
      console.error('Error adding:', error);
    }
    setLists([...lists, { id: (lists.length + 1).toString(), name: input, status: false }]);
    setInput('')
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setInput(e.currentTarget.value);
    console.log("Input = " + input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      if (input !== '') {
        firebaseAdd(input);
      }
      e.currentTarget.value = '';
      e.currentTarget.blur();
    }
  };

  const handleStatus = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
    
  }

  return (
    <div className='p-10'>
      <div className='pb-10'>
        <h1 className='text-4xl font-bold tracking-wider'>{title}</h1>
      </div>
      <div className=' overflow-y-auto'>
        <ul>
          {lists.map((list) => (
            <li className='w-full mb-2 rounded-md p-3 text-lg bg-zinc-800' key={list.id}>
              <input type="checkbox" onClick={handleStatus}/>
              <p>{list.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='sticky bottom-10 left-10 right-10 bg-zinc-800 p-3 rounded-md shadow-sm z-10'>
        <div className="flex">
          <BiPlus className='text-2xl mr-2 text-white/50' />
          <input placeholder="Add new task" type="text" className='bg-transparent w-full focus:outline-none' onInput={handleInput} onKeyDown={handleKeyPress}  ref={inputRef}/>
        </div>
      </div>
    </div>
  );
};

export default TaskViewPage;
